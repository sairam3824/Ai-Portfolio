import Layout from "@/shared/components/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/shared/ui/button";

const NotFound = () => {
  return (
    <Layout>
      <div className="relative flex min-h-[80vh] items-center justify-center overflow-hidden">
        {/* Large 404 background text with blur */}
        <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none">
          <h1 
            className="text-[280px] md:text-[400px] lg:text-[500px] font-extrabold leading-none"
            style={{
              color: 'rgba(128, 128, 128, 0.15)',
              filter: 'blur(3px)',
              WebkitTextStroke: '2px rgba(128, 128, 128, 0.1)'
            }}
          >
            404
          </h1>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4">
          <h2 className="mb-4 text-2xl md:text-3xl font-semibold text-foreground">
            Looking for something? 🔍
          </h2>
          <p className="mb-8 text-base md:text-lg text-muted-foreground">
            We couldn't find the page that you're looking for!
          </p>
          <Button 
            asChild 
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground font-medium"
          >
            <Link to="/">
              Head back
            </Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
