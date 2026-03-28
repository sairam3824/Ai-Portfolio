import { Component, type ErrorInfo, type ReactNode } from "react";

type AppErrorBoundaryProps = {
    children: ReactNode;
};

type AppErrorBoundaryState = {
    error: Error | null;
};

const formatErrorStack = (error: Error | null) => {
    if (!error?.stack) {
        return "No stack trace available.";
    }

    return error.stack;
};

export class AppErrorBoundary extends Component<AppErrorBoundaryProps, AppErrorBoundaryState> {
    state: AppErrorBoundaryState = {
        error: null,
    };

    static getDerivedStateFromError(error: Error): AppErrorBoundaryState {
        return { error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Version3 render error:", error, errorInfo);
    }

    render() {
        if (!this.state.error) {
            return this.props.children;
        }

        return (
            <div className="min-h-screen bg-[#f7f4ee] px-6 py-10 text-[#17140f] sm:px-10">
                <div className="mx-auto max-w-3xl rounded-[2rem] border border-[#e3ded2] bg-white p-6 shadow-[0_24px_80px_rgba(36,32,20,0.08)] sm:p-8">
                    <p className="text-[0.78rem] font-semibold uppercase tracking-[0.24em] text-[#8b8578]">
                        Version3 Startup Error
                    </p>
                    <h1 className="mt-4 text-[clamp(2rem,5vw,3rem)] font-semibold tracking-[-0.05em] text-[#11100c]">
                        The page crashed while rendering.
                    </h1>
                    <p className="mt-4 max-w-[55ch] text-[1rem] leading-7 text-[#6f695c]">
                        The app is now showing the error instead of a blank screen so we can fix it quickly.
                    </p>
                    <div className="mt-6 rounded-2xl border border-[#eadfcd] bg-[#fcfaf5] p-4">
                        <p className="font-semibold text-[#1b2433]">
                            {this.state.error.message || "Unknown render error"}
                        </p>
                    </div>
                    <pre className="mt-6 overflow-x-auto rounded-2xl bg-[#1b2433] p-4 text-sm leading-6 text-[#f8f7f3]">
                        {formatErrorStack(this.state.error)}
                    </pre>
                </div>
            </div>
        );
    }
}
