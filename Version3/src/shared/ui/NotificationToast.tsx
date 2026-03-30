import { useEffect } from "react";
import { AlertCircle, CheckCircle2, X } from "lucide-react";

export interface NotificationToastProps {
    title: string;
    description: string;
    type: "success" | "error";
    onClose: () => void;
    autoDismissMs?: number;
}

export const NotificationToast = ({
    title,
    description,
    type,
    onClose,
    autoDismissMs = 4000,
}: NotificationToastProps) => {
    useEffect(() => {
        const timeoutId = window.setTimeout(onClose, autoDismissMs);
        return () => window.clearTimeout(timeoutId);
    }, [autoDismissMs, onClose]);

    const isSuccess = type === "success";

    return (
        <div className="fixed right-4 top-4 z-[140] w-[calc(100vw-2rem)] max-w-sm animate-fade-in">
            <div
                className={`overflow-hidden rounded-[1.6rem] border bg-[#fffdf8] shadow-[0_22px_70px_rgba(35,31,24,0.16)] ${
                    isSuccess ? "border-emerald-200" : "border-rose-200"
                }`}
            >
                <div className={`h-1 w-full ${isSuccess ? "bg-emerald-500/80" : "bg-rose-500/80"}`} />
                <div className="flex items-start gap-3 p-4">
                    <div
                        className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ${
                            isSuccess ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
                        }`}
                    >
                        {isSuccess ? <CheckCircle2 className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
                    </div>
                    <div className="min-w-0 flex-1">
                        <p className="text-sm font-black tracking-tight text-[#17140f]">{title}</p>
                        <p className="mt-1 text-sm leading-6 text-[#7b7467]">{description}</p>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close notification"
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-[#ece6d9] bg-[#fbfaf6] text-[#9a9388] transition-colors hover:border-[#d7d0c3] hover:text-[#17140f]"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};
