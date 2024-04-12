CREATE TABLE `Menu` (
  `menuID` INT PRIMARY KEY AUTO_INCREMENT,
  `price` INT,
  `category` varchar(255),
  `name` varchar(255)
);

CREATE TABLE `Ingredient` (
  `ingredientID` INT PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255),
  `unit` varchar(255),
  `stock_quantity` FLOAT
);

CREATE TABLE `Coupon` (
  `couponID` INT PRIMARY KEY AUTO_INCREMENT,
  `discount` INT,
  `expire_date` date
);

CREATE TABLE `Employee` (
  `employeeID` INT PRIMARY KEY AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `join_date` date NOT NULL,
  `name` varchar(255) NOT NULL,
  `tel` varchar(255) NOT NULL,
  `salary` INT NOT NULL,
  `birthDay` date,
  `baristaflag` BIT,
  `cashierflag` BIT,
  `mamagerflag` BIT
);

CREATE TABLE `Member` (
  `memberID` INT PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255),
  `email` varchar(255),
  `tel` varchar(255),
  `join_date` date,
  `birthday` date,
  `address` varchar(255)
);

CREATE TABLE `Customers` (
  `customerID` INT PRIMARY KEY AUTO_INCREMENT,
  `memberID` INT,
  `type` varchar(255) NOT NULL,
  FOREIGN KEY (`memberID`) REFERENCES `Member` (`memberID`)
);

CREATE TABLE `Ingredient_Usage` (
  `usageID` INT PRIMARY KEY AUTO_INCREMENT,
  `ingredientID` INT,
  `quantity_usage` INT,
  FOREIGN KEY (`ingredientID`) REFERENCES `Ingredient` (`ingredientID`)
);

CREATE TABLE `Orders` (
  `orderID` INT PRIMARY KEY AUTO_INCREMENT,
  `customerID` INT NOT NULL,
  `employeeID` INT NOT NULL,
  `couponID` INT,
  `datetime` timestamp NOT NULL,
  `discount` INT,
  `total_price` INT NOT NULL,
  FOREIGN KEY (`customerID`) REFERENCES `Customers` (`customerID`),
  FOREIGN KEY (`employeeID`) REFERENCES `Employee` (`employeeID`),
  FOREIGN KEY (`couponID`) REFERENCES `Coupon` (`couponID`)
);

CREATE TABLE `OrderDetail` (
  `detailID` INT PRIMARY KEY AUTO_INCREMENT,
  `menuID` INT NOT NULL,
  `orderID` INT,
  `usageID` INT,
  `amount` INT,
  `subPrice` INT,
  FOREIGN KEY (`orderID`) REFERENCES `Orders` (`orderID`),
  FOREIGN KEY (`menuID`) REFERENCES `Menu` (`menuID`),
  FOREIGN KEY (`usageID`) REFERENCES `Ingredient_Usage` (`usageID`)
);

CREATE TABLE `Payment` (
  `paymentID` INT PRIMARY KEY AUTO_INCREMENT,
  `customerID` INT,
  `orderID` INT,
  `datetime` timestamp,
  `method` varchar(255),
  `amount` FLOAT,
  `status` char,
  FOREIGN KEY (`customerID`) REFERENCES `Customers` (`customerID`),
  FOREIGN KEY (`orderID`) REFERENCES `Orders` (`orderID`)
);

CREATE TABLE `Menu_Ingredeint` (
  `menuID` INT NOT NULL,
  `ingredientID` INT NOT NULL,
  `quantity_usage` FLOAT,
  FOREIGN KEY (`menuID`) REFERENCES `Menu` (`menuID`),
  FOREIGN KEY (`ingredientID`) REFERENCES `Ingredient` (`ingredientID`)
);

CREATE TABLE `Ingredient_Mtransaction` (
  `transactionID` INT PRIMARY KEY AUTO_INCREMENT,
  `employeeID` INT,
  `ingredientID` INT,
  `datetime` timestamp,
  `type` varchar(255),
  `quantity` FLOAT,
  `comment` varchar(255),
  FOREIGN KEY (`employeeID`) REFERENCES `Employee` (`employeeID`),
  FOREIGN KEY (`ingredientID`) REFERENCES `Ingredient` (`ingredientID`)
);

CREATE TABLE `AuthEmployee` (
  `username` varchar(255) PRIMARY KEY,
  `employeeID` INT,
  `password` varchar(255),
  FOREIGN KEY (`employeeID`) REFERENCES `Employee` (`employeeID`)
);

CREATE TABLE `AuthMember` (
  `username` varchar(255) PRIMARY KEY,
  `memberID` INT,
  `password` varchar(255),
  FOREIGN KEY (`memberID`) REFERENCES `Member` (`memberID`)
);