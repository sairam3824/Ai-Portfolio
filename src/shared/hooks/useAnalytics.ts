import { useEffect } from 'react';
import { track } from '@vercel/analytics';

export const useAnalytics = () => {
  const trackEvent = (eventName: string, properties?: Record<string, any>) => {
    track(eventName, properties);
  };

  const trackPageView = (pageName: string, additionalData?: Record<string, any>) => {
    track('page_view', {
      page: pageName,
      timestamp: new Date().toISOString(),
      ...additionalData
    });
  };

  const trackBlogSectionView = (section?: string) => {
    track('blog_section_view', {
      section: section || 'main',
      timestamp: new Date().toISOString(),
      user_agent: navigator.userAgent,
      referrer: document.referrer || 'direct'
    });
  };

  const trackBlogPostView = (postId: string, postTitle: string) => {
    track('blog_post_view', {
      post_id: postId,
      post_title: postTitle,
      timestamp: new Date().toISOString(),
      user_agent: navigator.userAgent,
      referrer: document.referrer || 'direct'
    });
  };

  const trackBlogSearch = (query: string, resultsCount: number) => {
    track('blog_search', {
      query,
      results_count: resultsCount,
      timestamp: new Date().toISOString()
    });
  };

  return {
    trackEvent,
    trackPageView,
    trackBlogSectionView,
    trackBlogPostView,
    trackBlogSearch
  };
};

// Hook for automatic page view tracking
export const usePageViewTracking = (pageName: string, additionalData?: Record<string, any>) => {
  const { trackPageView } = useAnalytics();

  useEffect(() => {
    trackPageView(pageName, additionalData);
  }, [pageName, trackPageView]);
};