import { useRef, useState } from "react";
import type { SupabaseClient } from "@supabase/supabase-js";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type BlogSubscriptionNotification =
    | { title: string; description: string; type: "success" | "error" }
    | null;

export const useBlogSubscription = () => {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [notification, setNotification] = useState<BlogSubscriptionNotification>(null);
    const supabaseRef = useRef<SupabaseClient | null | undefined>(undefined);

    const showNotification = (title: string, description: string, type: "success" | "error") => {
        setNotification({ title, description, type });
    };

    const closeNotification = () => {
        setNotification(null);
    };

    const handleSubscribe = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const normalizedEmail = email.trim().toLowerCase();
        const browserUserAgent = typeof window !== "undefined" ? window.navigator.userAgent : null;
        const unsubscribeToken = crypto.randomUUID();

        if (!normalizedEmail) {
            showNotification("Missing email", "Enter your email address to subscribe.", "error");
            return;
        }

        if (!EMAIL_PATTERN.test(normalizedEmail)) {
            showNotification("Invalid email", "Please use a valid email address.", "error");
            return;
        }

        setIsLoading(true);

        try {
            if (supabaseRef.current === undefined) {
                const { supabase } = await import("../../lib/supabase");
                supabaseRef.current = supabase;
            }

            if (!supabaseRef.current) {
                throw new Error("Supabase is not configured for this environment yet.");
            }

            const { data: existingSubscriber, error: lookupError } = await supabaseRef.current
                .from("blog_subscribers")
                .select("email, is_active")
                .eq("email", normalizedEmail)
                .maybeSingle();

            if (lookupError) {
                throw lookupError;
            }

            if (existingSubscriber?.is_active) {
                setEmail("");
                showNotification("Already subscribed", "This email is already on the blog updates list.", "success");
                return;
            }

            if (existingSubscriber) {
                const { error: updateError } = await supabaseRef.current
                    .from("blog_subscribers")
                    .update({
                        is_active: true,
                        unsubscribed_at: null,
                        unsubscribe_token: unsubscribeToken,
                        source: "blogs_page",
                        user_agent: browserUserAgent,
                        subscribed_at: new Date().toISOString(),
                    })
                    .eq("email", normalizedEmail);

                if (updateError) {
                    throw updateError;
                }

                setEmail("");
                showNotification("Welcome back", "Your subscription has been reactivated for future blog updates.", "success");
                return;
            }

            const { error } = await supabaseRef.current
                .from("blog_subscribers")
                .insert([{
                    email: normalizedEmail,
                    is_active: true,
                    unsubscribe_token: unsubscribeToken,
                    source: "blogs_page",
                    user_agent: browserUserAgent,
                }]);

            if (error) {
                if (error.code === "23505") {
                    setEmail("");
                    showNotification("Already subscribed", "This email is already on the blog updates list.", "success");
                    return;
                }

                throw error;
            }

            setEmail("");
            showNotification("Subscribed", "You’ll get future blog updates in your inbox.", "success");
        } catch (error: any) {
            console.error("Error subscribing to blog updates:", error);

            const message = typeof error?.message === "string" ? error.message : "";
            if (message.includes("blog_subscribers") || message.includes("relation")) {
                showNotification(
                    "Subscriber table issue",
                    "Supabase could not access the blog_subscribers table. Check the table schema and policies, then try again.",
                    "error"
                );
            } else {
                showNotification("Subscription failed", message || "Please try again in a moment.", "error");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return {
        email,
        setEmail,
        isLoading,
        notification,
        closeNotification,
        handleSubscribe,
    };
};
