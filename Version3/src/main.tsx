import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import reportWebVitals, { sendToAnalytics } from "./shared/reportWebVitals";
import { AppErrorBoundary } from "./shared/AppErrorBoundary";

const rootElement = document.getElementById("root");

if (!rootElement) {
    throw new Error("Version3 root element '#root' was not found.");
}

const root = createRoot(rootElement);

const formatBootError = (error: unknown) => {
    if (error instanceof Error) {
        return {
            message: error.message,
            stack: error.stack ?? "No stack trace available.",
        };
    }

    if (typeof error === "string") {
        return {
            message: error,
            stack: "No stack trace available.",
        };
    }

    return {
        message: "Unknown startup error",
        stack: "No stack trace available.",
    };
};

const renderBootError = (error: unknown) => {
    const details = formatBootError(error);

    root.render(
        <div className="min-h-screen bg-[#f7f4ee] px-6 py-10 text-[#17140f] sm:px-10">
            <div className="mx-auto max-w-3xl rounded-[2rem] border border-[#e3ded2] bg-white p-6 shadow-[0_24px_80px_rgba(36,32,20,0.08)] sm:p-8">
                <p className="text-[0.78rem] font-semibold uppercase tracking-[0.24em] text-[#8b8578]">
                    Version3 Boot Error
                </p>
                <h1 className="mt-4 text-[clamp(2rem,5vw,3rem)] font-semibold tracking-[-0.05em] text-[#11100c]">
                    The app crashed before the first screen loaded.
                </h1>
                <div className="mt-6 rounded-2xl border border-[#eadfcd] bg-[#fcfaf5] p-4">
                    <p className="font-semibold text-[#1b2433]">{details.message}</p>
                </div>
                <pre className="mt-6 overflow-x-auto rounded-2xl bg-[#1b2433] p-4 text-sm leading-6 text-[#f8f7f3]">
                    {details.stack}
                </pre>
            </div>
        </div>,
    );
};

if (import.meta.env.DEV && typeof window !== "undefined") {
    window.addEventListener("error", (event) => {
        console.error("Version3 startup error:", event.error ?? event.message);
        renderBootError(event.error ?? event.message);
    });

    window.addEventListener("unhandledrejection", (event) => {
        console.error("Version3 unhandled rejection:", event.reason);
        renderBootError(event.reason);
    });
}

root.render(
    <StrictMode>
        <AppErrorBoundary>
            <App />
        </AppErrorBoundary>
    </StrictMode>,
);

if (typeof window !== "undefined") {
    const startWebVitals = () => {
        reportWebVitals(sendToAnalytics);
    };
    const idleWindow = window as Window & {
        requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number;
    };

    if (idleWindow.requestIdleCallback) {
        idleWindow.requestIdleCallback(startWebVitals, { timeout: 3000 });
    } else {
        window.setTimeout(startWebVitals, 1500);
    }
}
