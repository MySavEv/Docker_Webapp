USE `store_db`;

-- Insert data into the Menu table
INSERT INTO `Menu` (`name`, `description`, `category`, `price`, `pic`, `status`) 
VALUES 
('Spaghetti Carbonara', 'Classic spaghetti dish with creamy sauce', 'Pasta', 9.99, 'spaghetti_carbonara.jpg', 'Available'),
('Margherita Pizza', 'Traditional Italian pizza with tomato and cheese', 'Pizza', 8.99, 'margherita_pizza.jpg', 'Available'),
('Caesar Salad', 'Fresh salad with Caesar dressing', 'Salad', 6.99, 'caesar_salad.jpg', 'Available');

-- Insert data into the Ingredient table
INSERT INTO `Ingredient` (`name`, `unit`, `quantity`, `pic`) 
VALUES 
('Spaghetti', 'g', 1000, 'spaghetti.jpg'),
('Bacon', 'g', 500, 'bacon.jpg'),
('Egg', 'pcs', 20, 'egg.jpg'),
('Parmesan Cheese', 'g', 300, 'parmesan_cheese.jpg'),
('Tomato Sauce', 'ml', 1000, 'tomato_sauce.jpg'),
('Pizza Dough', 'g', 1000, 'pizza_dough.jpg'),
('Mozzarella Cheese', 'g', 500, 'mozzarella_cheese.jpg'),
('Romaine Lettuce', 'g', 500, 'romaine_lettuce.jpg'),
('Caesar Dressing', 'ml', 500, 'caesar_dressing.jpg');

-- Insert data into the Stock_Ingredient table
INSERT INTO `Stock_Ingredient` (`ingredientID`, `stock_quantity`, `status`, `date`, `expire_date`) 
VALUES 
(1, 800, 'Available', '2022-04-10', '2022-06-10'),
(2, 300, 'Available', '2022-04-10', '2022-06-10'),
(3, 15, 'Available', '2022-04-10', '2022-06-10'),
(4, 250, 'Available', '2022-04-10', '2022-06-10'),
(5, 800, 'Available', '2022-04-10', '2022-06-10'),
(6, 800, 'Available', '2022-04-10', '2022-06-10'),
(7, 400, 'Available', '2022-04-10', '2022-06-10'),
(8, 200, 'Available', '2022-04-10', '2022-06-10'),
(9, 200, 'Available', '2022-04-10', '2022-06-10');

-- Insert data into the Employee table
INSERT INTO `Employee` (`email`, `join_date`, `name`, `tel`, `salary`, `birthDay`, `street`, `subdistrict`, `district`, `city`, `zipcode`, `baristaflag`, `cashierflag`, `managerflag`) 
VALUES 
('john@example.com', '2022-01-01', 'John Doe', '1234567890', 15000, '1990-01-01', '123 Main St', 'Downtown', 'Central', 'New York', '10001', 1, 0, 0),
('jane@example.com', '2022-01-02', 'Jane Doe', '0987654321', 15000, '1990-01-02', '456 Oak St', 'Uptown', 'Central', 'New York', '10002', 0, 1, 0),
('bob@example.com', '2022-01-03', 'Bob Smith', '9876543210', 20000, '1990-01-03', '789 Elm St', 'Midtown', 'Central', 'New York', '10003', 0, 0, 1);

-- Insert data into the Coupon table
INSERT INTO `Coupon` (`reqpoints`, `type`, `discount`, `description`, `expire_date`) 
VALUES 
(100, 1, 10, '10% off for orders over 100 points', '2022-12-31'),
(200, 2, 20, '20% off for orders over 200 points', '2022-12-31'),
(300, 3, 30, '30% off for orders over 300 points', '2022-12-31');


-- Insert data into the Member table
INSERT INTO `Member` (`gender`, `name`, `email`, `tel`, `join_date`, `birthday`, `points`, `street`, `subdistrict`, `district`, `city`, `zipcode`) 
VALUES 
('Male', 'John Doe', 'john@example.com', '1234567890', '2022-01-01', '1990-01-01', 50, '123 Main St', 'Downtown', 'Central', 'New York', '10001'),
('Female', 'Jane Doe', 'jane@example.com', '0987654321', '2022-01-02', '1990-01-02', 100, '456 Oak St', 'Uptown', 'Central', 'New York', '10002');

-- Insert data into the Customer table
INSERT INTO `Customer` (`memberID`, `type`) 
VALUES 
(1, 'Regular'),
(2, 'VIP');

-- Insert data into the MemPon table
INSERT INTO `MemPon` (`memberID`, `couponID`, `datetime`) 
VALUES 
(1, 1, '2022-04-10 10:00:00'),
(2, 2, '2022-04-10 11:00:00');

-- Insert data into the Menu_Ingredeint table
INSERT INTO `Menu_Ingredeint` (`menuID`, `ingredientID`, `quantity_usage`) 
VALUES 
(1, 1, 200),
(1, 2, 100),
(1, 3, 2),
(1, 4, 50),
(2, 5, 200),
(2, 6, 200),
(2, 7, 100),
(3, 8, 100),
(3, 9, 50);

-- Insert data into the Stock_Management table
INSERT INTO `Stock_Management` (`employeeID`, `stockID`, `type`, `quantity`, `comment`, `datetime`) 
VALUES 
(1, 1, 'Incoming', 500, 'Received new stock of spaghetti', '2022-04-10 08:00:00'),
(2, 2, 'Outgoing', 200, 'Used stock for production', '2022-04-10 09:00:00');

-- Insert data into the AuthEmployee table
INSERT INTO `AuthEmployee` (`username`, `employeeID`, `password`) 
VALUES 
('john_doe', 1, 'password123'),
('jane_doe', 2, 'password456');

-- Insert data into the AuthMember table
INSERT INTO `AuthMember` (`username`, `memberID`, `password`) 
VALUES 
('john_member', 1, 'password789'),
('jane_member', 2, 'password101112');

-- Insert data into the Orders table
INSERT INTO `Order` (`customerID`, `employeeID`, `couponID`, `datetime`, `discount`, `subtotal`, `total_price`, `status`) 
VALUES 
(1, 1, 1, '2022-04-10 08:00:00', 0, 20.99, 20.99, 'Success'),
(2, 2, 2, '2022-04-10 09:00:00', 0, 15.50, 15.50, 'Pending');

-- Insert data into the Payment table
INSERT INTO `Payment` (`orderID`, `method`, `amount`, `status`, `datetime`, `successdatetime`) 
VALUES 
(1, 'Credit Card', 20.99, 'Success', '2022-04-10 08:00:00', '2022-04-10 08:01:00'),
(2, 'Cash', 15.50, 'Pending', '2022-04-10 09:00:00', NULL);