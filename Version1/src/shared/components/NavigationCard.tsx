import { LucideIcon } from "lucide-react";
import { Card } from "@/shared/ui/card";

interface NavigationCardProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  isActive?: boolean;
  "aria-label"?: string;
}

export const NavigationCard = ({ icon: Icon, label, onClick, isActive, "aria-label": ariaLabel }: NavigationCardProps) => {
  return (
    <Card
      onClick={onClick}
      className={`p-6 flex flex-col items-center gap-2 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg border-2 ${
        isActive ? "border-accent bg-accent/5" : "border-border bg-card"
      }`}
      role="button"
      tabIndex={0}
      aria-label={ariaLabel || `Navigate to ${label}`}
      aria-pressed={isActive}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <Icon className={`w-6 h-6 ${isActive ? "text-accent" : "text-muted-foreground"}`} aria-hidden="true" />
      <span className={`text-sm font-medium ${isActive ? "text-accent" : "text-foreground"}`}>
        {label}
      </span>
    </Card>
  );
};
