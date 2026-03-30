import { lazy, Suspense, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const SharedChatWidget = lazy(() => import('../../../../shared-components/ChatWidget'));

const useDeferredWidgetMount = () => {
    const [shouldRender, setShouldRender] = useState(false);

    useEffect(() => {
        if (shouldRender) return;

        const browserWindow = window as Window & typeof globalThis & {
            requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number;
            cancelIdleCallback?: (handle: number) => void;
        };
        const activate = () => setShouldRender(true);
        const events: Array<keyof WindowEventMap> = ['pointerdown', 'keydown', 'focusin', 'touchstart'];

        let timeoutId: number | null = null;
        let idleId: number | null = null;

        const cleanup = () => {
            events.forEach((eventName) => window.removeEventListener(eventName, activate));
            if (timeoutId !== null) window.clearTimeout(timeoutId);
            if (idleId !== null && browserWindow.cancelIdleCallback) {
                browserWindow.cancelIdleCallback(idleId);
            }
        };

        events.forEach((eventName) => window.addEventListener(eventName, activate, { passive: true, once: true }));

        if (browserWindow.requestIdleCallback) {
            idleId = browserWindow.requestIdleCallback(activate, { timeout: 2500 });
        } else {
            timeoutId = window.setTimeout(activate, 1800);
        }

        return cleanup;
    }, [shouldRender]);

    return shouldRender;
};

export default function ChatWidget() {
    const shouldRender = useDeferredWidgetMount();

    if (!shouldRender) {
        return null;
    }

    return (
        <Suspense fallback={null}>
            <SharedChatWidget
                renderLink={({ to, className, children }) => (
                    <Link to={to} className={className}>{children}</Link>
                )}
            />
        </Suspense>
    );
}
