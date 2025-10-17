import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const sections = [
  { id: "visao-geral", title: "1. Visão Geral do Produto" },
  { id: "jornada", title: "2. Jornada do Usuário" },
  { id: "funcionalidades", title: "3. Funcionalidades Principais" },
  { id: "arquitetura", title: "4. Arquitetura Tecnológica" },
];

export const TableOfContents = () => {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <Card className="sticky top-6 p-6 backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border-purple-200/50 dark:border-purple-800/50 shadow-[0_20px_60px_-15px_rgba(168,85,247,0.3)] animate-scale-in">
      <h3 className="text-xl font-display font-bold mb-6 text-foreground">Índice</h3>
      <nav className="space-y-2">
        {sections.map(({ id, title }) => (
          <button
            key={id}
            onClick={() => scrollToSection(id)}
            className={cn(
              "block w-full text-left px-5 py-3 rounded-xl transition-all duration-300 font-medium",
              activeSection === id
                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold shadow-[0_10px_30px_-10px_rgba(168,85,247,0.5)] scale-105"
                : "text-muted-foreground hover:bg-purple-50 dark:hover:bg-purple-950/20 hover:text-foreground hover:scale-102"
            )}
          >
            {title}
          </button>
        ))}
      </nav>
    </Card>
  );
};
