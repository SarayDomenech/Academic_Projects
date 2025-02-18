# EXERCISE 2_1 

SELECT `country`, `status`, COUNT('order_id') AS total_orders, ROUND(AVG(`amount`),2) AS promedio_amount  
FROM prestamos_2015.orders
WHERE
	`created_at` > 01-07-2015 
    	AND`country`IN ('Espana', 'Portugal', 'Francia')
    	AND `amount` > 100 AND `amount` < 1500
GROUP BY `country`, `status`
ORDER BY promedio_amount DESC;

# EXERCISE 2_2

SELECT `country`, COUNT(`order_id`) AS total_orders, MAX(`amount`) AS max_amount, MIN(`amount`) AS min_amount
FROM prestamos_2015.orders
WHERE
	`status` IN ('ACTIVE', 'CLOSED')
    	AND `amount`> 100
GROUP BY `country`
ORDER BY total_orders DESC LIMIT 3;

# EXERCISE 3_1

SELECT `country`, o.merchant_id, m.name AS nombre_merchant,
COUNT(o.order_id) AS total_orders, ROUND(AVG (o.amount), 2) AS promedio_amount, 
COUNT(DISTINCT r.order_id) AS total_refunds, 
CASE 
	WHEN COUNT(DISTINCT r.order_id) > 0 THEN 'SI' 
	ELSE 'NO' 
END AS acepta_devoluciones
FROM prestamos_2015.orders AS o 
INNER JOIN prestamos_2015.merchants AS m ON o.merchant_id = m.merchant_id
LEFT JOIN prestamos_2015.refunds AS r ON o.order_id = r.order_id
WHERE `country` IN ('Marruecos', 'Italia', 'Espana', 'Portugal')
GROUP BY `country`, o.merchant_id, m.name
HAVING COUNT(o.order_id) > 10
ORDER BY total_orders ASC;

# EXERCISE 3_2 CASE 1

USE prestamos_2015;
CREATE VIEW tarea_ucm AS
SELECT m.name, o.merchant_id, o.country, o.created_at, o.order_id, o.status, o.amount,   
COUNT(r.order_id) AS total_refunds, SUM(r.amount) AS total_sum_refunds
FROM prestamos_2015.orders AS o
INNER JOIN prestamos_2015.merchants AS m ON o.merchant_id = m.merchant_id
INNER JOIN prestamos_2015.refunds AS r ON o.order_id = r.order_id
GROUP BY m.name, o.merchant_id, o.country, o.created_at, o.order_id, o.status, o.amount;

# EXERCISE 4

SELECT o.merchant_id, m.name, COUNT(o.order_id) AS total_order_delinquent
FROM prestamos_2015.orders AS o
INNER JOIN prestamos_2015.merchants AS m ON o.merchant_id = m.merchant_id
WHERE o.status = 'DELINQUENT'
GROUP BY o.merchant_id, m.name
ORDER BY total_order_delinquent DESC;

SELECT MONTH(o.created_at) AS month, YEAR(o.created_at) AS year, o.country, COUNT(o.order_id) AS total_delinquent, ROUND(sum(o.amount), 2) AS total_amount
FROM prestamos_2015.orders AS o
INNER JOIN prestamos_2015.merchants AS m ON o.merchant_id = m.merchant_id
WHERE o.status = 'DELINQUENT'
GROUP BY year, month, o.country
ORDER BY year, month, o.country;
