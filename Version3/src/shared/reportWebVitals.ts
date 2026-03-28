import type { Metric } from 'web-vitals';

const reportWebVitals = (onPerfEntry?: (metric: Metric) => void) => {
    if (onPerfEntry && typeof onPerfEntry === 'function') {
        import('web-vitals').then(({ onCLS, onFCP, onINP, onLCP, onTTFB }) => {
            onCLS(onPerfEntry);
            onFCP(onPerfEntry);
            onINP(onPerfEntry);
            onLCP(onPerfEntry);
            onTTFB(onPerfEntry);
        });
    }
};

export const sendToAnalytics = (metric: Metric) => {
    if (typeof window !== 'undefined' && 'gtag' in window) {
        const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
        if (gtag) {
            gtag('event', metric.name, {
                value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
                event_category: 'Web Vitals',
                event_label: metric.id,
                non_interaction: true,
            });
        }
    }
};

export default reportWebVitals;
