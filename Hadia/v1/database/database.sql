
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
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone_number VARCHAR(255) NOT NULL,
    country_code VARCHAR(10) NOT NULL,
    password VARCHAR(255) NOT NULL,
    registration_number VARCHAR(255) NOT NULL,
    logo VARCHAR(255) NOT NULL
);
