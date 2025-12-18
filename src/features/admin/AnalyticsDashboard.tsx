import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { Users, FileText, Eye, TrendingUp, Search } from "lucide-react";
import { blogPosts } from "@/features/blog";
import { useViewTracking } from "@/shared/hooks/useViewTracking";

interface AnalyticsData {
  totalPosts: number;
  totalSubscribers: number;
  blogSectionViews: number;
  uniqueBlogVisitors: number;
  totalPostViews: number;
  totalSearches: number;
}

const AnalyticsDashboard = () => {
  const { getTotalViews, getPopularPosts, viewCounts } = useViewTracking();
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalPosts: 0,
    totalSubscribers: 0,
    blogSectionViews: 0,
    uniqueBlogVisitors: 0,
    totalPostViews: 0,
    totalSearches: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      // Get static blog posts count
      const totalPosts = blogPosts.length;

      // Get subscribers from localStorage
      const subscribers = JSON.parse(localStorage.getItem("blog_subscribers") || "[]");
      const totalSubscribers = subscribers.length;

      // Try to fetch Vercel analytics data
      let vercelAnalytics = {
        blogSectionViews: 0,
        uniqueBlogVisitors: 0,
        totalPostViews: 0,
        totalSearches: 0,
      };

      try {
        const response = await fetch('/api/analytics');
        if (response.ok) {
          const data = await response.json();
          vercelAnalytics = {
            blogSectionViews: data.blog_section_views?.total || 0,
            uniqueBlogVisitors: data.blog_section_views?.unique_users || 0,
            totalPostViews: data.blog_post_views?.total || 0,
            totalSearches: data.search_queries?.total || 0,
          };
        }
      } catch (apiError) {
        console.log("Vercel analytics not available, using local data only");
      }

      // Get local view tracking data
      const localTotalViews = getTotalViews();

      setAnalytics({
        totalPosts,
        totalSubscribers,
        ...vercelAnalytics,
        totalPostViews: vercelAnalytics.totalPostViews || localTotalViews, // Use local data if Vercel data not available
      });
    } catch (error) {
      console.error("Error fetching analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-lg">Loading analytics...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Analytics Dashboard</h2>
        <p className="text-gray-600">Overview of your static blog</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Blog Section Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.blogSectionViews}</div>
            <p className="text-xs text-muted-foreground">
              Total visits to blog section
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unique Blog Visitors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.uniqueBlogVisitors}</div>
            <p className="text-xs text-muted-foreground">
              Unique users who visited blog
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Post Views</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalPostViews}</div>
            <p className="text-xs text-muted-foreground">
              Individual blog post clicks
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Blog Posts</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalPosts}</div>
            <p className="text-xs text-muted-foreground">
              Static blog posts published
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Search Queries</CardTitle>
            <Search className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalSearches}</div>
            <p className="text-xs text-muted-foreground">
              Blog searches performed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Email Subscribers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalSubscribers}</div>
            <p className="text-xs text-muted-foreground">
              Stored in browser localStorage
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Blog Posts List with View Counts */}
      <Card>
        <CardHeader>
          <CardTitle>Published Blog Posts</CardTitle>
          <CardDescription>All static blog posts with view counts</CardDescription>
        </CardHeader>
        <CardContent>
          {blogPosts.length > 0 ? (
            <div className="space-y-3">
              {blogPosts.map((post, index) => {
                const views = viewCounts[post.id] || 0;
                return (
                  <div
                    key={post.id}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full font-semibold text-sm">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-gray-100">{post.title}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{post.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-300">
                        <Eye className="w-4 h-4" />
                        <span className="font-medium">{views}</span>
                        <span className="text-xs">views</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {post.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-1 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>No blog posts found.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Popular Posts */}
      {getPopularPosts().length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Most Popular Posts</CardTitle>
            <CardDescription>Posts with the highest view counts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {getPopularPosts().map((item, index) => {
                const post = blogPosts.find(p => p.id === item.postId);
                return (
                  <div key={item.postId} className="flex justify-between items-center p-2 rounded">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">#{index + 1}</span>
                      <span className="text-sm">{post?.title || item.postId}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm font-medium text-blue-600 dark:text-blue-400">
                      <Eye className="w-4 h-4" />
                      {item.views}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Analytics Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-green-50 border-green-200">
          <CardHeader>
            <CardTitle className="text-green-900">Vercel Analytics Enabled</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-green-800 text-sm mb-3">
              Your blog now tracks user interactions with Vercel Analytics. The following events are being tracked:
            </p>
            <ul className="text-green-800 text-sm space-y-1">
              <li>• <strong>blog_section_view</strong> - When users visit the blog section</li>
              <li>• <strong>blog_post_view</strong> - When users click on blog posts</li>
              <li>• <strong>blog_search</strong> - When users search through blogs</li>
              <li>• <strong>page_view</strong> - General page navigation tracking</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-900">How to View Real Data</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-blue-800 text-sm space-y-2">
              <p><strong>1. Vercel Dashboard:</strong></p>
              <p>Go to your Vercel project → Analytics tab to see:</p>
              <ul className="ml-4 space-y-1">
                <li>• Page views and unique visitors</li>
                <li>• Custom events (blog interactions)</li>
                <li>• Geographic data and referrers</li>
              </ul>
              
              <p className="mt-3"><strong>2. Real-time Tracking:</strong></p>
              <p>Analytics data will populate as users interact with your blog. The tracking is already active!</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Static Blog Info */}
      <Card className="bg-gray-50 border-gray-200">
        <CardHeader>
          <CardTitle className="text-gray-900">Static Blog Mode</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-800 text-sm">
            Your blog is running in static mode. Blog posts are defined in code files and subscribers are stored locally in the browser. 
            To add new blog posts, create new files in <code className="bg-gray-100 px-1 py-0.5 rounded">src/features/blog/</code> and import them in the index file.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsDashboard;
