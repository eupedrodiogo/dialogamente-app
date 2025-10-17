import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Send, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface ReviewFormProps {
  resultType: "visual" | "auditivo" | "cinestesico";
}

export const ReviewForm = ({ resultType }: ReviewFormProps) => {
  const [rating, setRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (rating === 0) {
      toast({
        title: "Avaliação necessária",
        description: "Por favor, selecione uma avaliação de 1 a 5 estrelas.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("reviews").insert({
        rating,
        comment: comment.trim() || null,
        result_type: resultType,
      });

      if (error) throw error;

      toast({
        title: "Avaliação enviada!",
        description: "Muito obrigado pelo seu feedback. Sua opinião é muito importante para nós!",
      });

      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting review:", error);
      toast({
        title: "Erro ao enviar avaliação",
        description: "Ocorreu um erro ao enviar sua avaliação. Por favor, tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <Card className="backdrop-blur-xl bg-gradient-to-br from-white/80 to-green-50/80 dark:from-gray-900/80 dark:to-green-950/80 border-green-200/50 dark:border-green-800/50 shadow-[0_20px_60px_-15px_rgba(34,197,94,0.3)] animate-scale-in">
        <CardContent className="pt-8 pb-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-green-500/30 rounded-full blur-xl"></div>
              <div className="relative bg-green-500/20 p-4 rounded-full">
                <CheckCircle2 className="w-16 h-16 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </div>
          <h3 className="text-2xl font-display font-bold text-foreground mb-2">
            Avaliação Recebida!
          </h3>
          <p className="text-muted-foreground">
            Obrigado por compartilhar sua experiência conosco.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="backdrop-blur-xl bg-gradient-to-br from-white/80 to-purple-50/80 dark:from-gray-900/80 dark:to-purple-950/80 border-purple-200/50 dark:border-purple-800/50 shadow-[0_20px_60px_-15px_rgba(168,85,247,0.3)] animate-scale-in">
      <CardHeader>
        <CardTitle className="text-2xl font-display font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
          Avalie Sua Experiência
        </CardTitle>
        <CardDescription className="text-base">
          Sua opinião é muito importante para continuarmos melhorando a plataforma
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Rating Stars */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">
            Como você avalia sua experiência?
          </label>
          <div className="flex gap-2 justify-center py-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="transition-all duration-200 hover:scale-125 focus:outline-none focus:scale-125"
                aria-label={`Avaliar ${star} estrela${star > 1 ? "s" : ""}`}
              >
                <Star
                  className={`w-10 h-10 md:w-12 md:h-12 transition-all duration-200 ${
                    star <= (hoveredRating || rating)
                      ? "fill-yellow-400 text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.6)]"
                      : "fill-gray-200 text-gray-200 dark:fill-gray-700 dark:text-gray-700"
                  }`}
                />
              </button>
            ))}
          </div>
          {rating > 0 && (
            <p className="text-center text-sm text-muted-foreground animate-fade-in">
              {rating === 5 && "Excelente! Ficamos muito felizes! 🎉"}
              {rating === 4 && "Muito bom! Obrigado! 😊"}
              {rating === 3 && "Bom! Vamos melhorar ainda mais! 👍"}
              {rating === 2 && "Sentimos muito. Como podemos melhorar? 🤔"}
              {rating === 1 && "Lamentamos sua experiência. Por favor, nos conte mais. 😔"}
            </p>
          )}
        </div>

        {/* Comment Field */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">
            Comentários (opcional)
          </label>
          <Textarea
            placeholder="Compartilhe sua experiência, sugestões ou comentários..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            maxLength={1000}
            className="resize-none border-purple-200/50 dark:border-purple-800/50 focus:border-purple-500 dark:focus:border-purple-500"
          />
          <p className="text-xs text-muted-foreground text-right">
            {comment.length}/1000 caracteres
          </p>
        </div>

        {/* Submit Button */}
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting || rating === 0}
          className="w-full text-lg py-6 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-[0_10px_30px_-10px_rgba(168,85,247,0.5)] hover:shadow-[0_15px_40px_-10px_rgba(168,85,247,0.6)] transition-all duration-500 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
              Enviando...
            </>
          ) : (
            <>
              <Send className="w-5 h-5 mr-2" />
              Enviar Avaliação
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};
