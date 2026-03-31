import { useState } from "react";
import { API_PATHS } from "@/data/siteRoutes";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type BlogSubscriptionNotification =
    | { title: string; description: string; type: "success" | "error" }
    | null;

export const useBlogSubscription = () => {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [notification, setNotification] = useState<BlogSubscriptionNotification>(null);

    const showNotification = (title: string, description: string, type: "success" | "error") => {
        setNotification({ title, description, type });
    };

    const closeNotification = () => {
        setNotification(null);
    };

    const handleSubscribe = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const normalizedEmail = email.trim().toLowerCase();
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
            const response = await fetch(API_PATHS.writingSubscribe, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: normalizedEmail }),
            });

            const payload = await response.json().catch(() => ({}));
            if (!response.ok) {
                throw new Error(typeof payload?.error === "string" ? payload.error : "Please try again in a moment.");
            }

            if (payload?.status === "already_subscribed") {
                setEmail("");
                showNotification("Already subscribed", "This email is already on the writing updates list.", "success");
                return;
            }

            if (payload?.status === "reactivated") {
                setEmail("");
                showNotification("Welcome back", "Your subscription has been reactivated for future writing updates.", "success");
                return;
            }

            setEmail("");
            showNotification(
                "Subscribed",
                payload?.welcomeEmailSent
                    ? "You’ll get future writing updates in your inbox. A welcome email is on the way."
                    : "You’ll get future writing updates in your inbox.",
                "success",
            );
        } catch (error: unknown) {
            console.error("Error subscribing to writing updates:", error);

            const message = error instanceof Error ? error.message : "";
            if (message.includes("configuration") || message.includes("blog_subscribers") || message.includes("relation")) {
                showNotification(
                    "Subscriber table issue",
                    "The subscription service is not fully configured yet. Check the server settings and Supabase schema, then try again.",
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
