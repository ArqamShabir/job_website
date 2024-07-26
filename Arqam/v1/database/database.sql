CREATE DATABASE job_seeking;
USE job_seeking;
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    gender ENUM('Male', 'Female'),
    email VARCHAR(100) UNIQUE,
    country_code VARCHAR(10),
    phone_number VARCHAR(15),
    password VARCHAR(100)
);

CREATE TABLE companies (
    name VARCHAR(100) NOT NULL,
    registrationNumber int(15) PRIMARY KEY,
    phoneNumber VARCHAR(20) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    register_date date DEFAULT CURRENT_DATE, 
    password VARCHAR(50) NOT NULL,
    c_status BOOLEAN NOT NULL DEFAULT FALSE,
    logo VARCHAR(255) NOT NULL
);

INSERT INTO companies(companies.name,companies.registrationNumber,companies.phoneNumber,companies.email,companies.password)
VALUES ("Coke",123,"123","123","123") , ("Apple",124,"124","124","124");

CREATE TABLE admin(
	username varchar(25) PRIMARY KEY,
    password varchar(25) NOT NULL,
    noOfRows int(1) DEFAULT 1 UNIQUE
);

INSERT INTO admin(admin.username,admin.password) 
VALUES("admin","admin");
