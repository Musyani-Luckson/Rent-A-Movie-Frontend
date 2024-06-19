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
-- 
-- 
-- 
SELECT 
            t.Transaction_ID,
    CONCAT(c.First_Name, ' ', IFNULL(c.Middle_Name, ''), ' ', c.Last_Name) AS Customer_Name,
    COUNT(td.Movie_ID) AS Movies,
    ROUND(SUM(mp.Movie_Price), 2) AS Movie_Total,
    ROUND(SUM(mp.Movie_Price) * 0.10, 2) AS Total_Tax,
    ROUND(SUM(mp.Movie_Price) * 1.10, 2) AS Total_With_Tax,
    t.Transaction_Date
FROM 
    Transaction t
JOIN 
    Customer c ON t.Customer_ID = c.Customer_ID
JOIN 
    Transaction_Details td ON t.Transaction_ID = td.Transaction_ID
JOIN 
    Movie m ON td.Movie_ID = m.Movie_ID
JOIN 
    Movie_Price mp ON m.Movie_Price_ID = mp.Movie_Price_ID
GROUP BY 
    t.Transaction_ID, Customer_Name, t.Transaction_Date
ORDER BY 
    t.Transaction_Date DESC;
    