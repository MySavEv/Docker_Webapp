USE `store_db`;

-- Insert data into the Menu table
INSERT INTO `Menu` (`name`, `description`, `category`, `price`, `pic`, `status`) 
VALUES 
('Macha green tea', 'Premium tea from japan with milk', 'tea', 89, 'https://cdn.discordapp.com/attachments/1114226503970979852/1234980354792751145/cup.png?ex=6634aed5&is=66335d55&hm=9a842f5e67fb259b4c35013f4997a91f83f286d3cfed8b6638dd1f234fcda028&', 'Available'),
('Fresh Milk', 'Fresh Milk', 'milk', 59, 'https://cdn.discordapp.com/attachments/1114226503970979852/1234980354792751145/cup.png?ex=6634aed5&is=66335d55&hm=9a842f5e67fb259b4c35013f4997a91f83f286d3cfed8b6638dd1f234fcda028&', 'Available'),
('Latte', 'Premium coffee add milk', 'coffee', 69, 'https://cdn.discordapp.com/attachments/1114226503970979852/1234980354792751145/cup.png?ex=6634aed5&is=66335d55&hm=9a842f5e67fb259b4c35013f4997a91f83f286d3cfed8b6638dd1f234fcda028&', 'Available'),
('Mocca', 'Premium coffee add milk and chocolate', 'coffee', 69, 'https://cdn.discordapp.com/attachments/1114226503970979852/1234980354792751145/cup.png?ex=6634aed5&is=66335d55&hm=9a842f5e67fb259b4c35013f4997a91f83f286d3cfed8b6638dd1f234fcda028&', 'Available');

-- Insert data into the Ingredient table
INSERT INTO `Ingredient` (`ingredientID`,`name`, `unit`, `quantity`, `pic`) 
VALUES 
(1,'Tea leaves', 'g', 10000, ''),
(2,'Milk', 'g', 5000, ''),
(3,'Chocolate', 'g', 5000, ''),
(4,'Coffee seed', 'g', 5000, '');

-- Insert data into the Stock_Ingredient table
INSERT INTO `Stock_Ingredient` (`ingredientID`, `stock_quantity`, `status`, `date`, `expire_date`) 
VALUES 
(1, 10000, 'Available', '2022-04-10', '2022-06-10'),
(2, 5000, 'Available', '2022-04-10', '2022-06-10'),
(3, 5000, 'Available', '2022-04-10', '2022-06-10'),
(4, 5000, 'Available', '2022-04-10', '2022-06-10');

-- Insert data into the Employee table
INSERT INTO `Employee` (`email`, `join_date`, `name`, `tel`, `salary`, `birthDay`, `street`, `subdistrict`, `district`, `city`, `zipcode`, `baristaflag`, `cashierflag`, `managerflag`) 
VALUES 
('john@example.com', '2022-01-01', 'John Doe', '1234567890', 15000, '1990-01-01', '123 Main St', 'Downtown', 'Central', 'New York', '10001', 1, 0, 0),
('jane@example.com', '2022-01-02', 'Jane Doe', '0987654321', 15000, '1990-01-02', '456 Oak St', 'Uptown', 'Central', 'New York', '10002', 0, 1, 0),
('bob@example.com', '2022-01-03', 'Bob Smith', '9876543210', 20000, '1990-01-03', '789 Elm St', 'Midtown', 'Central', 'New York', '10003', 0, 0, 1);

-- Insert data into the Coupon table
INSERT INTO `Coupon` (`reqpoints`, `type`, `discount`, `description`, `expire_date`) 
VALUES 
(100, 1, 10, '10 baht discount ', '2022-12-31'),
(200, 2, 20, '20% of order', '2022-12-31'),
(300, 1, 30, '30 Bath discount', '2022-12-31');


-- Insert data into the Member table
INSERT INTO `Member` (`gender`, `name`, `email`, `tel`, `join_date`, `birthday`, `points`, `street`, `subdistrict`, `district`, `city`, `zipcode`) 
VALUES 
('Male', 'John Doe', 'john@example.com', '1234567890', '2022-01-01', '1990-01-01', 50, '123 Main St', 'Downtown', 'Central', 'New York', '10001'),
('Female', 'Jane Doe', 'jane@example.com', '0987654321', '2022-01-02', '1990-01-02', 100, '456 Oak St', 'Uptown', 'Central', 'New York', '10002');

-- Insert data into the Customer table
INSERT INTO `Customer` (`memberID`, `type`) 
VALUES 
(null, 'guest'),
(1, 'member'),
(2, 'member');

-- Insert data into the MemPon table
INSERT INTO `MemPon` (`memberID`, `couponID`, `datetime`) 
VALUES 
(1, 3, '2022-04-10 10:00:00'),
(2, 2, '2022-04-10 11:00:00'); 

-- Insert data into the Menu_Ingredeint table
INSERT INTO `Menu_Ingredeint` (`menuID`, `ingredientID`, `quantity_usage`) 
VALUES 
(1, 1, 200),
(1, 2, 100),
(1, 3, 2),
(1, 4, 50),
(2, 1, 200),
(2, 2, 200),
(2, 3, 100),
(3, 4, 100),
(3, 1, 50);

-- Insert data into the Stock_Management table
INSERT INTO `Stock_Management` (`employeeID`, `stockID`, `type`, `quantity`, `comment`, `datetime`) 
VALUES 
(1, 1, 'In', 500, 'Received new stock of spaghetti', '2022-04-10 08:00:00'),
(2, 2, 'Out', 200, 'Used stock for production', '2022-04-10 09:00:00');

-- Insert data into the AuthEmployee table
INSERT INTO `AuthEmployee` (`username`, `employeeID`, `password`) 
VALUES 
('employee1', 1, '123456'),
('employee2', 2, '123456');

-- Insert data into the AuthMember table
INSERT INTO `AuthMember` (`username`, `memberID`, `password`) 
VALUES 
('member1', 1, '123456'),
('member2', 2, '123456');

-- Insert data into the Orders table
INSERT INTO `Order` (`customerID`, `employeeID`, `couponID`, `datetime`, `discount`, `subtotal`, `total_price`, `status`) 
VALUES 
(1, 1, 1, '2022-04-10 08:00:00', 0, 158, 158, 'Success'),
(2, 2, 2, '2022-04-10 09:00:00', 0, 138, 138, 'Pending'),
(2, 1, 2, '2022-04-10 10:00:00', 0, 148, 148, 'Pending');

-- Insert data into the Payment table
INSERT INTO `Payment` (`orderID`, `method`, `amount`, `status`, `datetime`, `successdatetime`) 
VALUES 
(1, 'Credit Card', 158, 'Success', '2022-04-10 08:00:00', '2022-04-10 08:01:00'),
(2, 'Cash', 138, 'Pending', '2022-04-10 09:00:00', NULL),
(3, 'Credit Card', 148, 'Pending', '2022-04-10 10:00:00', NULL);

-- Insert data into the OrderDetail table
INSERT INTO `OrderDetail`(`detailID`,`orderID`,`menuID`,`amount`,`subPrice`)
VALUES
(1,1,1,158,89),
(2,1,3,158,69),
(3,2,3,138,69),
(4,2,4,138,69);