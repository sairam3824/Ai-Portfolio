import { Link, useLocation } from "react-router-dom";
import { User, FileText, FolderKanban, Layers, GraduationCap, BookOpen, Sparkles, Mail } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { profileDetails } from "@/data/siteMetadata";

const navigationItems = [
  { path: "/about", icon: User, label: "About" },
  { path: "/resume", icon: FileText, label: "Resume" },
  { path: "/projects", icon: FolderKanban, label: "Projects" },
  { path: "/skills", icon: Layers, label: "Skills" },
  { path: "/education", icon: GraduationCap, label: "Education" },
  { path: "/blogs", icon: BookOpen, label: "Blogs" },
  { path: "/certifications", icon: Sparkles, label: "Certifications" },
  { path: "/contact", icon: Mail, label: "Contact" },
];

const SectionNavigation = () => {
  const location = useLocation();

  return (
    <nav className="-mx-1 flex items-center gap-2 overflow-x-auto overflow-y-hidden px-1 pb-1 [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {navigationItems.map((item) => {
        const isActive = location.pathname === item.path;
        const Icon = item.icon;

        if (item.path === "/resume") {
          return (
            <Button
              key={item.path}
              variant="outline"
              size="sm"
              asChild
              className="whitespace-nowrap flex-shrink-0"
            >
              <a
                href={profileDetails.resumeHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </a>
            </Button>
          );
        }

        return (
          <Button
            key={item.path}
            variant={isActive ? "secondary" : "outline"}
            size="sm"
            asChild
            className={`whitespace-nowrap flex-shrink-0 ${isActive
              ? "bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-600 dark:hover:bg-blue-700 border-blue-600 dark:border-blue-600"
              : ""
              }`}
          >
            <Link to={item.path} className="flex items-center gap-2">
              <Icon className="w-4 h-4" />
              {item.label}
            </Link>
          </Button>
        );
      })}
    </nav>
  );
};

export default SectionNavigation;
