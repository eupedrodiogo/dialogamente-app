-- Allow deleting test reviews
CREATE POLICY "Allow deleting reviews"
ON public.reviews
FOR DELETE
TO public
USING (true);