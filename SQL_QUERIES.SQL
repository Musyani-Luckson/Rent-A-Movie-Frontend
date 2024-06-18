SELECT 
m.Movie_ID AS ID,
m.Movie_Title AS Movie,
COUNT(m.Movie_ID) AS Total_Transactions,
mp.Movie_Price AS Price,
SUM(mp.Movie_Price) AS Total,
ROUND(et.Tax_Value*SUM(mp.Movie_Price),2) AS Tax,
ROUND((et.Tax_Value*SUM(mp.Movie_Price))+SUM(mp.Movie_Price),2) AS Earnings
FROM
transaction t
INNER JOIN transaction_details td
ON t.Transaction_ID = td.Transaction_ID
INNER JOIN movie m
ON td.Movie_ID = m.Movie_ID
INNER JOIN movie_price mp
ON m.Movie_Price_ID = mp.Movie_Price_ID
INNER  JOIN entertainment_tax et
ON mp.Tax_ID = et.Tax_ID
GROUP BY 
m.Movie_ID,
m.Movie_Title
ORDER BY 
Total_Transactions DESC;
-- 
-- 
-- 
SELECT
(SELECT COUNT(*)
FROM movie m
WHERE m.Movie_ID 
IN (
SELECT DISTINCT 
Movie_ID
FROM transaction_details
)
) AS Rented,

(SELECT COUNT(*)
FROM movie m
WHERE m.Movie_ID 
NOT IN (
SELECT DISTINCT 
Movie_ID
FROM transaction_details
)
) AS Unrented,

(SELECT COUNT(*)
FROM customer c
WHERE c.Customer_ID
IN (
SELECT DISTINCT Customer_ID 
FROM transaction
)
) AS Renting,

(SELECT COUNT(*)
FROM customer c
WHERE c.Customer_ID
NOT IN (
SELECT DISTINCT Customer_ID 
FROM transaction
)
) AS Unrenting








