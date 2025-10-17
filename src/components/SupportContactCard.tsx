import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

interface SupportContactCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  badge?: string;
  badgeVariant?: "default" | "secondary" | "destructive" | "outline";
  children?: ReactNode;
  isDisabled?: boolean;
  className?: string;
}

export const SupportContactCard = ({
  icon: Icon,
  title,
  description,
  badge,
  badgeVariant = "default",
  children,
  isDisabled = false,
  className = "",
}: SupportContactCardProps) => {
  return (
    <Card
      className={`relative overflow-hidden group transition-all duration-500 backdrop-blur-sm bg-white/60 dark:bg-gray-900/60 ${
        isDisabled
          ? "opacity-60 cursor-not-allowed"
          : "hover:shadow-[0_30px_90px_-20px_rgba(168,85,247,0.3)]"
      } ${className}`}
    >
      {/* Gradient Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>

      <div className="relative z-10 p-8 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 p-0.5 group-hover:scale-110 transition-transform duration-500">
            <div className="w-full h-full rounded-2xl bg-white dark:bg-gray-900 flex items-center justify-center">
              <Icon className="w-7 h-7 text-purple-600" />
            </div>
          </div>
          {badge && (
            <Badge variant={badgeVariant} className="text-xs">
              {badge}
            </Badge>
          )}
        </div>

        {/* Content */}
        <div className="space-y-2">
          <h3 className="text-xl font-display font-semibold text-foreground/90">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>

        {/* Action Area */}
        {children}
      </div>
    </Card>
  );
};
