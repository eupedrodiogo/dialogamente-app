import { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface ScopeSectionProps {
  title: string;
  icon: LucideIcon;
  children: ReactNode;
  id?: string;
}

export const ScopeSection = ({ title, icon: Icon, children, id }: ScopeSectionProps) => {
  return (
    <section id={id} className="scroll-mt-20 animate-fade-up">
      <Card className="p-8 md:p-10 backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border-purple-200/50 dark:border-purple-800/50 hover:shadow-[0_30px_90px_-20px_rgba(168,85,247,0.4)] transition-all duration-500 hover:scale-[1.01]">
        <div className="flex items-start gap-5 mb-8">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-all duration-500"></div>
            <div className="relative p-4 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl shadow-[0_10px_30px_-10px_rgba(168,85,247,0.5)]">
              <Icon className="w-7 h-7 text-white" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground flex-1">{title}</h2>
        </div>
        <div className="prose prose-lg max-w-none text-foreground/80 leading-relaxed">
          {children}
        </div>
      </Card>
    </section>
  );
};
