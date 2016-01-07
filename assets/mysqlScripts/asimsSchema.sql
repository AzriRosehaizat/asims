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

CREATE TABLE Course(
	courseID INT NOT NULL AUTO_INCREMENT,
	title VARCHAR(100) NOT NULL,
	description TEXT,
	PRIMARY KEY(courseID)
);

CREATE TABLE DefaultNormalLoad(
	rankID INT NOT NULL,
	departmentID INT NOT NULL,
	startDate DATETIME NOT NULL,
	FCEValue INT NOT NULL,
	PRIMARY KEY(rankID, departmentID)
);

CREATE TABLE Department(
	departmentID INT NOT NULL AUTO_INCREMENT,
	facultyID INT NOT NULL,
	title VARCHAR(50) NOT NULL,
	description TEXT,
	PRIMARY KEY(departmentID)
);

CREATE TABLE Department_Course(
	departmentID INT NOT NULL,
	courseID INT NOT NULL,
	identifier VARCHAR(20),
);

CREATE TABlE Employment(
	employmentID INT NOT NULL AUTO_INCREMENT,
	staffID INT NOT NULL,
	hireDate DATETIME NOT NULL,
	fireDate DATETIME,
	PRIMARY KEY(employmentID, staffID)
);

CREATE TABLE Faculty(
	facultyID INT NOT NULL AUTO_INCREMENT,
	title VARCHAR(50) NOT NULL,
	PRIMARY KEY(facultyID)
);


CREATE TABlE FCECredit(
	FCECreditID INT NOT NULL AUTO_INCREMENT,
	regularStaffID INT NOT NULL,
	amount INT NOT NULL,
	description TEXT,
	dateIssued DATETIME,
	type VARCHAR(50),
	PRIMARY KEY(FCECreditID)
);

CREATE TABLE FCEDebit(
	FCEDebitID INT NOT NULL AUTO_INCREMENT,
	regularStaffID INT NOT NULL,
	amount INT NOT NULL,
	description TEXT,
	dateIssued DATETIME,
	type VARCHAR(50),
	PRIMARY KEY(FCEDebitID)
);

CREATE TABlE Grant(
	grantID INT NOT NULL AUTO_INCREMENT,
	researchID INT NOT NULL,
	grantingAgency VARCHAR(50) NOT NULL,
	yearAwarded YEAR,
	duration INT,
	amount FLOAT(10,2),
	PRIMARY KEY(grantID)
);


