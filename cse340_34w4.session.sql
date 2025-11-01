-- Select make and model from inventory and clasification name joining both tables
SELECT inv_make, inv_model, classification_name
FROM public.inventory AS i
JOIN public.classification AS c
ON i.classification_id = c.classification_id
WHERE c.classification_name = 'Sport';