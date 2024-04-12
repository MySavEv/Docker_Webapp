USE `store_db`;

CREATE TABLE IF NOT EXISTS `Menu` (
  `menuID` integer PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` varchar(255),
  `description` varchar(255),
  `category` varchar(255),
  `price` float,
  `pic` varchar(255),
  `status` varchar(255)
);

CREATE TABLE IF NOT EXISTS `OrderDetail` (
  `detailID` integer PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `menuID` integer,
  `orderID` integer,
  `amount` integer,
  `subPrice` float
);

CREATE TABLE IF NOT EXISTS `Ingredient` (
  `ingredientID` integer PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` varchar(255),
  `unit` varchar(255),
  `quantity` integer,
  `pic` varchar(255)
);

CREATE TABLE IF NOT EXISTS `Stock_Ingredient` (
  `stockID` integer PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `ingredientID` integer,
  `stock_quantity` integer,
  `status` varchar(255),
  `date` date,
  `expire_date` date
);

CREATE TABLE IF NOT EXISTS `Withdraw_History` (
  `employeeID` integer,
  `ingredientID` integer,
  `stockID` integer,
  `comment` varchar(255),
  `datetime` timestamp
);

CREATE TABLE IF NOT EXISTS `Order` (
  `orderID` integer PRIMARY KEY AUTO_INCREMENT,
  `customerID` integer,
  `employeeID` integer NOT NULL,
  `couponID` integer,
  `datetime` timestamp,
  `discount` integer,
  `subtotal` float,
  `total_price` float,
  `status` varchar(255)
);



CREATE TABLE IF NOT EXISTS `Employee` (
  `employeeID` integer PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `email` varchar(255),
  `join_date` date,
  `name` varchar(255),
  `tel` varchar(255),
  `salary` integer,
  `birthDay` date,
  `street` varchar(255),
  `subdistrict` varchar(255),
  `district` varchar(255),
  `city` varchar(255),
  `zipcode` varchar(255),
  `baristaflag` bit,
  `cashierflag` bit,
  `managerflag` bit
);

CREATE TABLE IF NOT EXISTS `Coupon` (
  `couponID` integer PRIMARY KEY AUTO_INCREMENT,
  `reqpoints` integer,
  `type` integer,
  `discount` integer,
  `description` varchar(255),
  `expire_date` date
);

CREATE TABLE IF NOT EXISTS `Customer` (
  `customerID` integer PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `memberID` integer,
  `type` varchar(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS `Member` (
  `memberID` integer PRIMARY KEY AUTO_INCREMENT,
  `gender` varchar(255),
  `name` varchar(255),
  `email` varchar(255),
  `tel` varchar(255),
  `join_date` date,
  `birthday` date,
  `points` integer,
  `street` varchar(255),
  `subdistrict` varchar(255),
  `district` varchar(255),
  `city` varchar(255),
  `zipcode` varchar(255)
);

CREATE TABLE IF NOT EXISTS `Payment` (
  `paymentID` integer PRIMARY KEY AUTO_INCREMENT,
  `orderID` integer,
  `method` varchar(255),
  `amount` float,
  `status` varchar(255),
  `datetime` timestamp,
  `successdatetime` timestamp
);

CREATE TABLE IF NOT EXISTS `Menu_Ingredeint` (
  `menuID` integer,
  `ingredientID` integer,
  `quantity_usage` integer
);

CREATE TABLE IF NOT EXISTS `Stock_Management` (
  `employeeID` integer ,
  `stockID` integer,
  `type` varchar(255),
  `quantity` integer,
  `comment` varchar(255),
  `datetime` timestamp
);

CREATE TABLE IF NOT EXISTS `AuthEmployee` (
  `username` varchar(255) PRIMARY KEY NOT NULL,
  `employeeID` integer,
  `password` varchar(255)
);

CREATE TABLE IF NOT EXISTS `AuthMember` (
  `username` varchar(255) PRIMARY KEY NOT NULL,
  `memberID` integer,
  `password` varchar(255)
);

CREATE TABLE IF NOT EXISTS `MemPon` (
  `memberID` integer,
  `couponID` integer,
  `datetime` timestamp
);

ALTER TABLE `OrderDetail` ADD FOREIGN KEY (`menuID`) REFERENCES `Menu` (`menuID`);

ALTER TABLE `Menu_Ingredeint` ADD FOREIGN KEY (`menuID`) REFERENCES `Menu` (`menuID`);

ALTER TABLE `Stock_Ingredient` ADD FOREIGN KEY (`ingredientID`) REFERENCES `Ingredient` (`ingredientID`);

ALTER TABLE `Menu_Ingredeint` ADD FOREIGN KEY (`ingredientID`) REFERENCES `Ingredient` (`ingredientID`);

ALTER TABLE `Withdraw_History` ADD FOREIGN KEY (`employeeID`) REFERENCES `Employee` (`employeeID`);

ALTER TABLE `Withdraw_History` ADD FOREIGN KEY (`ingredientID`) REFERENCES `Ingredient` (`ingredientID`);

ALTER TABLE `Withdraw_History` ADD FOREIGN KEY (`stockID`) REFERENCES `Stock_Ingredient` (`stockID`);

ALTER TABLE `OrderDetail` ADD FOREIGN KEY (`orderID`) REFERENCES `Order` (`orderID`);

ALTER TABLE `Payment` ADD FOREIGN KEY (`orderID`) REFERENCES `order` (`orderID`);

ALTER TABLE `Order` ADD FOREIGN KEY (`employeeID`) REFERENCES `Employee` (`employeeID`);

ALTER TABLE `AuthEmployee` ADD FOREIGN KEY (`employeeID`) REFERENCES `Employee` (`employeeID`);

ALTER TABLE `Order` ADD FOREIGN KEY (`couponID`) REFERENCES `Coupon` (`couponID`);

ALTER TABLE `Order` ADD FOREIGN KEY (`customerID`) REFERENCES `Customer` (`customerID`);

ALTER TABLE `Customer` ADD FOREIGN KEY (`memberID`) REFERENCES `Member` (`memberID`);

ALTER TABLE `AuthMember` ADD FOREIGN KEY (`memberID`) REFERENCES `Member` (`memberID`);

ALTER TABLE `Stock_Management` ADD FOREIGN KEY (`employeeID`) REFERENCES `Employee` (`employeeID`);

ALTER TABLE `Stock_Management` ADD FOREIGN KEY (`stockID`) REFERENCES `Stock_Ingredient` (`stockID`);

ALTER TABLE `MemPon` ADD FOREIGN KEY (`memberID`) REFERENCES `Member` (`memberID`);

ALTER TABLE `MemPon` ADD FOREIGN KEY (`couponID`) REFERENCES `Coupon` (`couponID`);
