-- Add start_time column to test_progress table
ALTER TABLE public.test_progress 
ADD COLUMN start_time TIMESTAMP WITH TIME ZONE DEFAULT now();