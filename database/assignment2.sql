
-- Data for table 'account'
INSERT INTO public.account (account_firstname, account_lastname, account_email, account_password) VALUES
    ('Tony', 'Stark', 'tony@starkent.com', 'Iam1ronM@n');


-- Make first account an admin
UPDATE public.account
SET account_type = 'Admin'
WHERE account_id = 1;

-- Delete default account
DELETE FROM public.account
WHERE account_id = 1;

-- Update GM Hummer in  inventory
UPDATE public.inventory
SET  inv_description = REPLACE(inv_description, 'small interiors', 'a huge interior')
WHERE inv_id = 10;


-- Select make and model from inventory and clasification name joining both tables
SELECT inv_make, inv_model, classification_name
FROM public.inventory AS i
JOIN public.classification AS c
ON i.classification_id = c.classification_id
WHERE c.classification_name = 'Sport';

-- Update all records in the inventory table to add /vehicles/ to the image and thumbnail paths
UPDATE public.inventory
SET inv_image = REPLACE(inv_image, '/images/', '/images/vehicles/'),
    inv_thumbnail = REPLACE(inv_thumbnail, '/images/', '/images/vehicles/');
