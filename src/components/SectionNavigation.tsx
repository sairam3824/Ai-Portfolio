import { Link, useLocation } from "react-router-dom";
import { User, FileText, FolderKanban, Layers, GraduationCap, BookOpen, Sparkles, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    <nav className="flex items-center gap-2 overflow-x-auto">
      {navigationItems.map((item) => {
        const isActive = location.pathname === item.path;
        const Icon = item.icon;

        // Special handling for Resume to open in new tab
        if (item.path === "/resume") {
          return (
            <Button
              key={item.path}
              variant={isActive ? "default" : "outline"}
              size="sm"
              asChild
              className="whitespace-nowrap"
            >
              <Link
                to={item.path}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            </Button>
          );
        }

        return (
          <Button
            key={item.path}
            variant={isActive ? "default" : "outline"}
            size="sm"
            asChild
            className="whitespace-nowrap"
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