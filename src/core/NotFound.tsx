import Layout from "@/shared/components/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/shared/ui/button";

const NotFound = () => {
  return (
    <Layout>
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center px-4">
          <h1 className="mb-4 text-8xl font-bold text-foreground">404</h1>
          <p className="mb-2 text-2xl font-semibold text-foreground">Page Not Found</p>
          <p className="mb-8 text-lg text-muted-foreground">
            Looks like you've ventured into uncharted territory. Let's get you back on track!
          </p>
          <Button asChild size="lg">
            <Link to="/">
              Return to Home
            </Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
