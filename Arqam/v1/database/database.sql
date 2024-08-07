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


-- Jobs Table
CREATE TABLE IF NOT EXISTS jobs (
    j_id INT AUTO_INCREMENT PRIMARY KEY,
    job_title VARCHAR(100) NOT NULL,
    vacancies INT NOT NULL,
    min_salary DECIMAL(10, 2) NOT NULL,
    max_salary DECIMAL(10, 2) NOT NULL,
    job_hours INT NOT NULL,
    preferred_gender ENUM('Male', 'Female', 'Any'),
    job_description TEXT NOT NULL,
    age INT NOT NULL,
    job_city VARCHAR(100) NOT NULL,
    education VARCHAR(100) NOT NULL,
    c_registrationNo INT(15),
    category VARCHAR(100) NOT NULL,
    experience VARCHAR(100) NOT NULL,
    j_status BOOLEAN NOT NULL DEFAULT TRUE,
    j_date DATE DEFAULT CURRENT_DATE,
    FOREIGN KEY (c_registrationNo) REFERENCES companies(registrationNumber)
);

-- Job Days Table
CREATE TABLE IF NOT EXISTS job_days (
    j_id INT AUTO_INCREMENT,
    day VARCHAR(20) NOT NULL,
    PRIMARY KEY (j_id, day),
    FOREIGN KEY (j_id) REFERENCES jobs(j_id)
);


CREATE TABLE IF NOT EXISTS job_skills (
    j_id INT AUTO_INCREMENT,
    skill VARCHAR(100) NOT NULL,
    PRIMARY KEY (j_id, skill),
    FOREIGN KEY (j_id) REFERENCES jobs(j_id)
);


-- Create the applicant table
CREATE TABLE applicant (
    app_id INT(9) AUTO_INCREMENT PRIMARY KEY,
    app_gender ENUM('Male', 'Female') NOT NULL,
    app_resume VARCHAR(255) NOT NULL,  -- Resume column added
    app_name VARCHAR(50) NOT NULL,
    app_email VARCHAR(100) NOT NULL,
    app_age INT(2) NOT NULL,
    app_education VARCHAR(200) NOT NULL,
    app_status BOOLEAN NOT NULL DEFAULT false,
    app_experience VARCHAR(150) NOT NULL,
    app_phoneNo VARCHAR(15) NOT NULL,
    ats_score INT(2) NOT NULL DEFAULT 0,
    notification VARCHAR(200) NOT NULL DEFAULT "",
    j_id INT(11),
    c_registrationNo INT(15),
    CONSTRAINT FOREIGN KEY (j_id) REFERENCES jobs(j_id),
    CONSTRAINT FOREIGN KEY (c_registrationNo) REFERENCES companies(registrationNumber)
);

-- Create the proofs table
CREATE TABLE proofs (
    app_id INT(9),
    proof VARCHAR(255) NOT NULL,  -- Proof column
    PRIMARY KEY (app_id, proof),  -- Composite primary key
    CONSTRAINT FOREIGN KEY (app_id) REFERENCES applicant(app_id)
);

CREATE TABLE apply(
    js_id INT ,
    j_id INT,
    PRIMARY KEY(js_id, j_id),
    FOREIGN KEY (j_id) REFERENCES jobs(j_id),
    FOREIGN KEY (js_id) REFERENCES users(js_id)
);



