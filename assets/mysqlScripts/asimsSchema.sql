DROP DATABASE IF EXISTS asims2;
CREATE DATABASE IF NOT EXISTS asims2;
USE asims2;

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
	FCEValue FLOAT NOT NULL,
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
	terminationDate DATETIME,
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
	amount FLOAT NOT NULL,
	description TEXT,
	dateIssued DATETIME,
	type VARCHAR(50),
	PRIMARY KEY(FCECreditID)
);

CREATE TABLE FCEDebit(
	FCEDebitID INT NOT NULL AUTO_INCREMENT,
	regularStaffID INT NOT NULL,
	amount FLOAT NOT NULL,
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


CREATE TABLE Leave(
	leaveID INT NOT NULL AUTO_INCREMENT,
	regularStaffID INT NOT NULL,
	leaveDebitID INT NOT NULL,
	description TEXT, #NOT NULL, 
	startDate DATETIME NOT NULL,
	endDate DATETIME NOT NULL,
	leavePercentage FLOAT, #NOT NULL
	wagePercentage FLOAT, #NOT NULL
	PRIMARY KEY(leaveID)
);

CREATE TABLE LeaveCredit(
	leaveCreditID INT NOT NULL AUTO_INCREMENT,
	regularStaffID INt NOT NULL,
	amount FLOAT NOT NULL,
	description TEXT,
	dateIssued DATETIME,
	type VARCHAR(50) NOT NULL,
	PRIMARY KEY(leaveCreditID)
);

CREATE TABLE LeaveDebit(
	leaveDebitID INT NOT NULL AUTO_INCREMENT,
	regularStaffID INt NOT NULL,
	amount FLOAT NOT NULL,
	description TEXT,
	dateIssued DATETIME,
	type VARCHAR(50) NOT NULL,
	PRIMARY KEY(leaveDebitID)
);

CREATE TABLE LoadIncrease(
	loadIncreaseID INT NOT NULL AUTO_INCREMENT,
	regularStaffID INT NOT NULl,
	startDate DATETIME NOT NULL,
	endDate DATETIME NOT NULL,
	FCEValue FLOAT NOT NULL
);

CREATE TABLE LoadReduction(
	loadReductionID INT NOT NULL AUTO_INCREMENT,
	regularStaffID INT NOT NULl,
	startDate DATETIME NOT NULL,
	endDate DATETIME NOT NULL,
	FCEValue FLOAT NOT NULL
);

CREATE TABLE Rank(
	rankID INT NOT NULL AUTO_INCREMENT,
	title VARCHAR(50) NOT NULL,
	description TEXT,
	PRIMARY KEY(rankID)
);

CREATE TABLE RegularStaff(
	regularStaffID INT NOT NULL AUTO_INCREMENT,
	tenureDate DATETIME,
	PRIMARY KEY(regularStaffID)
);

CREATE TABLE RegularStaff_Rank(
	rankID INT NOT NULL,
	regularStaffID INT NOT NULL,
	startDate DATETIME NOT NULL,
	endDate DATETIME,
	PRIMARY KEY(rankID, regularStaffID, startDate)
);

CREATE TABLE RegularStaff_Research(
	researchID INT NOT NULL,
	regularStaffID INT NOT NULL
	loadReductionID INT,
	startDate DATETIME NOT NULL,
	endDate DATETIME,
	PRIMARY KEY(researchID, regularStaffID, startDate)
);

CREATE TABLE Research(
	researchID INT NOT NULL AUTO_INCREMENT,
	title VARCHAR(50) NOT NULL,
	abstract TEXT,
	startDate DATETIME NOT NULL,
	endDate, #NOT NULL
	PRIMARY KEY(researchID)
);

CREATE TABLE Section(
	sectionID INT NOT NULL AUTO_INCREMENT,
	courseID INT NOT NULL,
	identifier VARCHAR(20) NOT NULL,
	startTerm VARCHAR(25) NOT NULL,
	endTerm VARCHAR(25) NOT NULL,
	FCEValue FLOAT NOT NULL,
	PRIMARY KEY(sectionID, courseID)
);


#BEGIN ALTER TABLE AND FK CONSTRAINTS
