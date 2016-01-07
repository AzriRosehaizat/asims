DROP SCHEMA IF EXISTS asims2;
CREATE SCHEMA asims2;
Use asims2;

CREATE TABLE AcademicStaff(
	staffID INT NOT NULL AUTO_INCREMENT,
	firstName VARCHAR(50) NOT NULL,
	lastName VARCHAR(50) NOT NULL,
	PRIMARY KEY(staffID)
);

CREATE TABLE AcademicStaff_Department(
	departmentID INT NOT NULL,
	staffID INT NOT NULL,
	startDate DATETIME NOT NULL,
	endDate DATETIME,
	PRIMARY KEY(departmentID, staffID, startDate)
);

CREATE TABLE AcademicStaff_Section(
	staffID INT NOT NULL,
	sectionID INT NOT NULL,
	role VARCHAR(50),
	weight INT NOT NULL,
	PRIMARY KEY(staffID, sectionID)
);

CREATE TABLE Chair(
	regularStaffID INT NOT NULL,
	departmentID INT NOT NULL,
	startDate DATETIME NOT NULL,
	endDate DATETIME,
	PRIMARY KEY (regularStaffID, departmentID, startDate)
);

CREATE TABLE ContractStaff(
	contractStaffID INT NOT NULL AUTO_INCREMENT,
	PRIMARY KEY(contractStaffID)
);

CREATE TABLE Courses(
	courseID INT NOT NULL AUTO_INCREMENT,
	title VARCHAR(50) NOT NUll,
	description VARCHAR(255)
	PRIMARY KEY(courseID)
);

CREATE TABLE DefaultNormalLoad(
	rankID INT NOT NULL,
	departmentID INT NOT NULL,
	startDate DATETIME NOT NULL,
	FCEValue INT NOT NUll,
	PRIMARY KEY(rankID, departmentID)
);

CREATE TABLE Department(
	departmentID
);
