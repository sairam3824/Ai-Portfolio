import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { Users, FileText } from "lucide-react";
import { blogPosts } from "@/features/blog";

interface AnalyticsData {
  totalPosts: number;
  totalSubscribers: number;
}

const AnalyticsDashboard = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalPosts: 0,
    totalSubscribers: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = () => {
    try {
      // Get static blog posts count
      const totalPosts = blogPosts.length;

      // Get subscribers from localStorage
      const subscribers = JSON.parse(localStorage.getItem("blog_subscribers") || "[]");
      const totalSubscribers = subscribers.length;

      setAnalytics({
        totalPosts,
        totalSubscribers,
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

      {/* Blog Posts List */}
      <Card>
        <CardHeader>
          <CardTitle>Published Blog Posts</CardTitle>
          <CardDescription>All static blog posts</CardDescription>
        </CardHeader>
        <CardContent>
          {blogPosts.length > 0 ? (
            <div className="space-y-3">
              {blogPosts.map((post, index) => (
                <div
                  key={post.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full font-semibold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{post.title}</p>
                      <p className="text-sm text-gray-500">{post.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>No blog posts found.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Info Card */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-900">Static Blog Mode</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-blue-800 text-sm">
            Your blog is running in static mode. Blog posts are defined in code files and subscribers are stored locally in the browser. 
            To add new blog posts, create new files in <code className="bg-blue-100 px-1 py-0.5 rounded">src/features/blog/</code> and import them in the index file.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsDashboard;
