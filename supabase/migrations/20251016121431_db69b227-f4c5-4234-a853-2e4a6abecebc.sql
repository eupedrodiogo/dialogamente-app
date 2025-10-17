-- Create table for storing test progress
CREATE TABLE public.test_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL UNIQUE,
  current_question INTEGER NOT NULL DEFAULT 0,
  answers JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.test_progress ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (no authentication required)
CREATE POLICY "Anyone can insert their progress" 
ON public.test_progress 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can view their progress" 
ON public.test_progress 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can update their progress" 
ON public.test_progress 
FOR UPDATE 
USING (true);

CREATE POLICY "Anyone can delete their progress" 
ON public.test_progress 
FOR DELETE 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_test_progress_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_test_progress_timestamp
BEFORE UPDATE ON public.test_progress
FOR EACH ROW
EXECUTE FUNCTION public.update_test_progress_updated_at();