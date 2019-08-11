CREATE DATABASE bamazon;

USE bamazon;

DROP TABLE IF EXISTS products;

CREATE TABLE products (
	item_id INT AUTO_INCREMENT,
    product_name VARCHAR(255) NOT NULl,
    department_name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock_quantity INT(11) NOT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Gibson SG Guitar", "Instruments", 999.99, 11),
("Xbox One X", "Gaming", 329.99, 69),
("Nintendo Switch", "Gaming", 299.98, 47),
("The Very Hungry Caterpillar", "Books", 5.89, 1412),
("Victorinox Rosewood Handle Chef Knives", "Kitchen", 42.17, 120),
("Sharpie Fine Point Permanent Markers", "Office Supplies", 5.88, 82412),
("Lodge Skillet", "Kitchen", 9.99, 778),
("Office Desk Gaming Chair", "Furniture", 69.98, 5),
("Rocket League", "Gaming", 24.99, 420),
("Pie Tin", "Kitchen", 3.14, 159);

SELECT * FROM products;