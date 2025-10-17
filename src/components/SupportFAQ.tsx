import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Search } from "lucide-react";
import { FAQ_DATA } from "@/lib/constants";

export const SupportFAQ = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFAQ = FAQ_DATA.map((category) => ({
    ...category,
    questions: category.questions.filter(
      (item) =>
        item.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.a.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  })).filter((category) => category.questions.length > 0);

  return (
    <div className="space-y-8">
      {/* Search */}
      <div className="relative max-w-2xl mx-auto">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Buscar perguntas frequentes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-12 h-14 text-lg rounded-2xl border-2 focus:border-purple-400"
        />
      </div>

      {/* FAQ Accordion */}
      <div className="grid md:grid-cols-2 gap-8">
        {filteredFAQ.map((category) => (
          <div key={category.category} className="space-y-4">
            <h3 className="text-xl font-display font-semibold text-purple-600">
              {category.category}
            </h3>
            <Accordion type="single" collapsible className="space-y-3">
              {category.questions.map((item, idx) => (
                <AccordionItem
                  key={idx}
                  value={`${category.category}-${idx}`}
                  className="border-2 border-purple-100 dark:border-purple-900 rounded-xl px-4 backdrop-blur-sm bg-white/40 dark:bg-gray-900/40"
                >
                  <AccordionTrigger className="text-left hover:text-purple-600 transition-colors">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ))}
      </div>

      {filteredFAQ.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <p>Nenhuma pergunta encontrada para "{searchTerm}"</p>
          <p className="text-sm mt-2">Tente outro termo ou entre em contato conosco</p>
        </div>
      )}
    </div>
  );
};
