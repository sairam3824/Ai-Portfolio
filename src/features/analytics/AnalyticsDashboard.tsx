import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Eye, Users, Search, TrendingUp } from 'lucide-react';

interface AnalyticsData {
  blog_section_views: {
    total: number;
    unique_users: number;
    last_30_days: number;
  };
  blog_post_views: {
    total: number;
    unique_users: number;
    popular_posts: Array<{ title: string; views: number }>;
  };
  search_queries: {
    total: number;
    popular_queries: Array<{ query: string; count: number }>;
  };
}

export const AnalyticsDashboard = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await fetch('/api/analytics');
        if (!response.ok) {
          throw new Error('Failed to fetch analytics');
        }
        const data = await response.json();
        setAnalytics(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Blog Analytics</h2>
        <div className="text-center py-8">Loading analytics...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Blog Analytics</h2>
        <div className="text-center py-8 text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Blog Analytics</h2>
        <div className="text-center py-8">No analytics data available</div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Blog Analytics Dashboard</h2>
      
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Blog Section Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.blog_section_views.total}</div>
            <p className="text-xs text-muted-foreground">
              {analytics.blog_section_views.last_30_days} in last 30 days
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unique Blog Visitors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.blog_section_views.unique_users}</div>
            <p className="text-xs text-muted-foreground">
              Unique users who visited blog section
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Post Views</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.blog_post_views.total}</div>
            <p className="text-xs text-muted-foreground">
              Total individual post views
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Search Queries</CardTitle>
            <Search className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.search_queries.total}</div>
            <p className="text-xs text-muted-foreground">
              Total blog searches performed
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Popular Posts */}
      {analytics.blog_post_views.popular_posts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Popular Blog Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {analytics.blog_post_views.popular_posts.map((post, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm">{post.title}</span>
                  <span className="text-sm font-medium">{post.views} views</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Popular Search Queries */}
      {analytics.search_queries.popular_queries.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Popular Search Queries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {analytics.search_queries.popular_queries.map((query, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm">"{query.query}"</span>
                  <span className="text-sm font-medium">{query.count} searches</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Instructions */}
      <Card className="bg-blue-50 dark:bg-blue-950/30">
        <CardHeader>
          <CardTitle className="text-blue-800 dark:text-blue-200">How to View Real Analytics</CardTitle>
        </CardHeader>
        <CardContent className="text-blue-700 dark:text-blue-300">
          <div className="space-y-2 text-sm">
            <p><strong>Option 1: Vercel Analytics Dashboard</strong></p>
            <p>• Go to your Vercel project dashboard</p>
            <p>• Click on the "Analytics" tab</p>
            <p>• View page views, unique visitors, and custom events</p>
            
            <p className="mt-4"><strong>Option 2: Custom Events in Vercel</strong></p>
            <p>• The tracking code is already implemented</p>
            <p>• Events like "blog_section_view" and "blog_post_view" are being sent</p>
            <p>• View these in Vercel Analytics → Events</p>
            
            <p className="mt-4"><strong>Option 3: Google Analytics (Alternative)</strong></p>
            <p>• Add Google Analytics to get more detailed insights</p>
            <p>• Track user behavior, demographics, and more</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};