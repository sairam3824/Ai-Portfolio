import { useState, useEffect } from 'react';

interface ViewData {
  [postId: string]: number;
}

export const useViewTracking = () => {
  const [viewCounts, setViewCounts] = useState<ViewData>({});

  // Load view counts from localStorage on mount
  useEffect(() => {
    const savedViews = localStorage.getItem('blog_post_views');
    if (savedViews) {
      try {
        setViewCounts(JSON.parse(savedViews));
      } catch (error) {
        console.error('Error loading view counts:', error);
      }
    }
  }, []);

  // Save view counts to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('blog_post_views', JSON.stringify(viewCounts));
  }, [viewCounts]);

  const incrementView = (postId: string) => {
    setViewCounts(prev => ({
      ...prev,
      [postId]: (prev[postId] || 0) + 1
    }));
  };

  const getViewCount = (postId: string): number => {
    return viewCounts[postId] || 0;
  };

  const getTotalViews = (): number => {
    return Object.values(viewCounts).reduce((sum, count) => sum + count, 0);
  };

  const getPopularPosts = (limit: number = 5): Array<{ postId: string; views: number }> => {
    return Object.entries(viewCounts)
      .map(([postId, views]) => ({ postId, views }))
      .sort((a, b) => b.views - a.views)
      .slice(0, limit);
  };

  return {
    viewCounts,
    incrementView,
    getViewCount,
    getTotalViews,
    getPopularPosts
  };
};