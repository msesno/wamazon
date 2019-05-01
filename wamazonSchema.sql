DROP DATABASE IF EXISTS wamazonDB;

CREATE DATABASE wamazonDB;

USE wamazonDB;

CREATE TABLE products (
  item INT NOT NULL AUTO_INCREMENT,
  product VARCHAR(45) NULL,
  origin VARCHAR(45) NULL,
  price DECIMAL(10,2) NULL,
  stock INT NULL,
  PRIMARY KEY (item)
);

INSERT INTO products (product, origin, price, stock)
VALUES ("Gold Bar", "West Indies", 5000.00, 2);
INSERT INTO products (product, origin, price, stock)
VALUES ("Pirates Booty", "Lost Seas", 40.00, 31);
INSERT INTO products (product, origin, price, stock)
VALUES ("Treasure Map", "Ebay Auction", 30.00, 10);
INSERT INTO products (product, origin, price, stock)
VALUES ("Rare Candy", "PokeBank", 82.00, 29);
INSERT INTO products (product, origin, price, stock)
VALUES ("Trump Autograph", "White House", 33.00, 50);
INSERT INTO products (product, origin, price, stock)
VALUES ("Invisibility Cloak", "Azkaban", 150.00, 100);
INSERT INTO products (product, origin, price, stock)
VALUES ("Limitless Pill", "The Future", 10.00, 2000);
INSERT INTO products (product, origin, price, stock)
VALUES ("Jumanji", "The Past", 600.00, 25);
INSERT INTO products (product, origin, price, stock)
VALUES ("Helicopter", "Alkatraz", 12000.00, 100);
INSERT INTO products (product, origin, price, stock)
VALUES ("Magic Neck Cream", "Coney Island", 100.00, 75);


Select * from products