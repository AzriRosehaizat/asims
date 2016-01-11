DROP DATABASE IF EXISTS asims;
CREATE DATABASE IF NOT EXISTS asims;
USE asims;

CREATE TABLE AcademicStaff(
	staffID INT NOT NULL AUTO_INCREMENT,
	firstName VARCHAR(50) NOT NULL,
	lastName VARCHAR(50) NOT NULL,
	PRIMARY KEY(staffID)
);

CREATE TABLE AcademicStaff_Department(
	departmentID INT NOT NULL,
	staffID INT NOT NULL,
	startDate DATE NOT NULL,
	endDate DATE,
	PRIMARY KEY(departmentID, staffID, startDate)
);

CREATE TABLE AcademicStaff_Section(
	staffID INT NOT NULL,
	sectionID INT NOT NULL,
	role VARCHAR(50),
	weight FLOAT NOT NULL,
	PRIMARY KEY(staffID, sectionID)
);

CREATE TABLE Chair(
	regularStaffID INT NOT NULL,
	departmentID INT NOT NULL,
	startDate DATE NOT NULL,
	endDate DATE,
	PRIMARY KEY (regularStaffID, departmentID, startDate)
);

CREATE TABLE ContractStaff(
	contractStaffID INT NOT NULL,
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
	startDate DATE NOT NULL,
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
    PRIMARY KEY(departmentID, courseID)
);

CREATE TABlE Employment(
	employmentID INT NOT NULL AUTO_INCREMENT,
	staffID INT NOT NULL,
	hireDate DATE NOT NULL,
	terminationDate DATE,
	PRIMARY KEY(employmentID)
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
	dateIssued DATE,
	FCECreditType VARCHAR(50),
	PRIMARY KEY(FCECreditID)
);

CREATE TABLE FCEDebit(
	FCEDebitID INT NOT NULL AUTO_INCREMENT,
	regularStaffID INT NOT NULL,
	amount FLOAT NOT NULL,
	description TEXT,
	dateIssued DATE,
	FCEDebitType VARCHAR(50),
	PRIMARY KEY(FCEDebitID)
);

CREATE TABlE ResearchGrant(
	grantID INT NOT NULL AUTO_INCREMENT,
	researchID INT NOT NULL,
	grantingAgency VARCHAR(50) NOT NULL,
	yearAwarded YEAR,
	duration FLOAT(10,2),
	amount FLOAT(10,2),
	PRIMARY KEY(grantID)
);


CREATE TABLE StaffLeave(
	leaveID INT NOT NULL AUTO_INCREMENT,
	regularStaffID INT NOT NULL,
	leaveDebitID INT NOT NULL,
	description TEXT, #NOT NULL,
	startDate DATE NOT NULL,
	endDate DATE NOT NULL,
	leavePercentage FLOAT, #NOT NULL
	wagePercentage FLOAT, #NOT NULL
	PRIMARY KEY(leaveID)
);

CREATE TABLE LeaveCredit(
	leaveCreditID INT NOT NULL AUTO_INCREMENT,
	regularStaffID INT NOT NULL,
	amount FLOAT NOT NULL,
	description TEXT,
	dateIssued DATE,
	leaveCreditType VARCHAR(50) NOT NULL,
	PRIMARY KEY(leaveCreditID)
);

CREATE TABLE LeaveDebit(
	leaveDebitID INT NOT NULL AUTO_INCREMENT,
	regularStaffID INT NOT NULL,
	amount FLOAT NOT NULL,
	description TEXT,
	dateIssued DATE,
	leaveDebitType VARCHAR(50) NOT NULL,
	PRIMARY KEY(leaveDebitID)
);

CREATE TABLE LoadIncrease(
	loadIncreaseID INT NOT NULL AUTO_INCREMENT,
	regularStaffID INT NOT NULl,
	startDate DATE NOT NULL,
	endDate DATE NOT NULL,
	FCEValue FLOAT NOT NULL,
    PRIMARY KEY(loadIncreaseID)
);

CREATE TABLE LoadReduction(
	loadReductionID INT NOT NULL AUTO_INCREMENT,
	regularStaffID INT NOT NULl,
	startDate DATE NOT NULL,
	endDate DATE NOT NULL,
	FCEValue FLOAT NOT NULL,
    PRIMARY KEY(loadReductionID)
);

CREATE TABLE Rank(
	rankID INT NOT NULL AUTO_INCREMENT,
	title VARCHAR(50) NOT NULL,
	description TEXT,
	PRIMARY KEY(rankID)
);

CREATE TABLE RegularStaff(
	regularStaffID INT NOT NULL,
	tenureDate DATE,
	PRIMARY KEY(regularStaffID)
);

CREATE TABLE RegularStaff_Rank(
	rankID INT NOT NULL,
	regularStaffID INT NOT NULL,
	startDate DATE NOT NULL,
	endDate DATE,
	PRIMARY KEY(rankID, regularStaffID, startDate)
);

CREATE TABLE RegularStaff_Research(
	researchID INT NOT NULL,
	regularStaffID INT NOT NULL,
	loadReductionID INT,
	startDate DATE NOT NULL,
	endDate DATE,
	PRIMARY KEY(researchID, regularStaffID, startDate)
);

CREATE TABLE Research(
	researchID INT NOT NULL AUTO_INCREMENT,
	title VARCHAR(50) NOT NULL,
	abstract TEXT,
	startDate DATE NOT NULL,
	endDate DATE, #NOT NULL
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
ALTER TABLE AcademicStaff_Department ADD CONSTRAINT FOREIGN KEY(departmentID) REFERENCES Department(departmentID);
ALTER TABLE AcademicStaff_Department ADD CONSTRAINT FOREIGN KEY(staffID) REFERENCES AcademicStaff(staffID);
ALTER TABLE AcademicStaff_Section ADD CONSTRAINT FOREIGN KEY(sectionID) REFERENCES Section(sectionID);
ALTER TABLE AcademicStaff_Section ADD CONSTRAINT FOREIGN KEY(staffID) REFERENCES AcademicStaff(staffID);
ALTER TABLE Chair ADD CONSTRAINT FOREIGN KEY(departmentID) REFERENCES Department(departmentID);
ALTER TABLE Chair ADD CONSTRAINT FOREIGN KEY(regularStaffID) REFERENCES AcademicStaff(staffID);
ALTER TABLE ContractStaff ADD CONSTRAINT FOREIGN KEY(contractStaffID) REFERENCES AcademicStaff(staffID);
ALTER TABLE DefaultNormalLoad ADD CONSTRAINT FOREIGN KEY(rankID) REFERENCES Rank(rankID);
ALTER TABLE DefaultNormalLoad ADD CONSTRAINT FOREIGN KEY(departmentID) REFERENCES Department(departmentID);
ALTER TABLE Department ADD CONSTRAINT FOREIGN KEY(facultyID) REFERENCES Faculty(facultyID);
ALTER TABLE Department_Course ADD CONSTRAINT FOREIGN KEY(departmentID) REFERENCES Department(departmentID);
ALTER TABLE Department_Course ADD CONSTRAINT FOREIGN KEY(courseID) REFERENCES Course(courseID);
ALTER TABLE Employment ADD CONSTRAINT FOREIGN KEY(staffID) REFERENCES AcademicStaff (staffID);
ALTER TABLE FCECredit ADD CONSTRAINT FOREIGN KEY(regularStaffID) REFERENCES RegularStaff(regularStaffID);
ALTER TABLE FCEDebit ADD CONSTRAINT FOREIGN KEY(regularStaffID) REFERENCES RegularStaff(regularStaffID);
ALTER TABLE ResearchGrant ADD CONSTRAINT FOREIGN KEY(researchID) REFERENCES Research(researchID);
ALTER TABLE StaffLeave ADD CONSTRAINT FOREIGN KEY(regularStaffID) REFERENCES RegularStaff(regularStaffID);
ALTER TABLE StaffLeave ADD CONSTRAINT FOREIGN KEY(leaveDebitID) REFERENCES LeaveDebit(leaveDebitID);
ALTER TABLE LeaveCredit ADD CONSTRAINT FOREIGN KEY(regularStaffID) REFERENCES RegularStaff(regularStaffID);
ALTER TABLE LeaveDebit ADD CONSTRAINT FOREIGN KEY(regularStaffID) REFERENCES RegularStaff(regularStaffID);
ALTER TABLE LoadIncrease ADD CONSTRAINT FOREIGN KEY(regularStaffID) REFERENCES RegularStaff(regularStaffID);
ALTER TABLE LoadReduction ADD CONSTRAINT FOREIGN KEY(regularStaffID) REFERENCES RegularStaff(regularStaffID);
ALTER TABLE RegularStaff ADD CONSTRAINT FOREIGN KEY(regularStaffID) REFERENCES AcademicStaff(staffID);
ALTER TABLE RegularStaff_Rank ADD CONSTRAINT FOREIGN KEY(rankID) REFERENCES Rank(rankID);
ALTER TABLE RegularStaff_Rank ADD CONSTRAINT FOREIGN KEY(regularStaffID) REFERENCES RegularStaff(regularStaffID);
ALTER TABLE RegularStaff_Research ADD CONSTRAINT FOREIGN KEY(regularStaffID) REFERENCES RegularStaff(regularStaffID);
ALTER TABLE RegularStaff_Research ADD CONSTRAINT FOREIGN KEY(researchID) REFERENCES Research(researchID);
ALTER TABLE RegularStaff_Research ADD CONSTRAINT FOREIGN KEY(loadReductionID) REFERENCES LoadReduction(loadReductionID);
ALTER TABLE Section ADD CONSTRAINT FOREIGN KEY(courseID) REFERENCES Course(courseID);

#BEGIN INSERT INTO TABLE
INSERT INTO AcademicStaff (staffID,firstName,lastName) VALUES (1,"Nasim","Slater"),(2,"Justin","Merritt"),(3,"Hadassah","Irwin"),(4,"Nicole","Brock"),(5,"Simone","Stephenson"),(6,"Aubrey","Farley"),(7,"Lance","Benton"),(8,"Macy","Davidson"),(9,"Athena","Buchanan"),(10,"Phoebe","Greene"),(11,"Arsenio","Chen"),(12,"Brennan","Thompson"),(13,"Ignacia","Faulkner"),(14,"Aquila","Kane"),(15,"Lydia","Zamora"),(16,"Regina","Montoya"),(17,"Malik","West"),(18,"Briar","Roach"),(19,"Daria","Davenport"),(20,"Hermione","Holman"),(21,"Nina","Valenzuela"),(22,"Autumn","Daniels"),(23,"Alisa","Park"),(24,"Brianna","Duke"),(25,"Tanner","Wong"),(26,"Cailin","Boone"),(27,"Aquila","Rowe"),(28,"Yolanda","Terry"),(29,"Elijah","Ratliff"),(30,"Leo","Diaz"),(31,"Mara","Hunter"),(32,"Vaughan","Benton"),(33,"Baxter","Schmidt"),(34,"Gage","Stanley"),(35,"Mufutau","Levy"),(36,"Randall","Brown"),(37,"Sonia","Cunningham"),(38,"Driscoll","Hatfield"),(39,"Thane","Oneil"),(40,"Ariana","Monroe"),(41,"Holmes","Hudson"),(42,"Ishmael","Kennedy"),(43,"Tara","Barry"),(44,"Noelle","Hoffman"),(45,"Plato","Sullivan"),(46,"Rina","Mcgowan"),(47,"Nolan","Petersen"),(48,"Benjamin","Klein"),(49,"Hadassah","Galloway"),(50,"Reed","Richmond");
INSERT INTO AcademicStaff (staffID,firstName,lastName) VALUES (51,"Meghan","Kline"),(52,"Desirae","Finley"),(53,"Vernon","Sanchez"),(54,"Genevieve","Mcconnell"),(55,"Hedley","Klein"),(56,"Stone","Barrett"),(57,"Damon","Shelton"),(58,"Daquan","Stephens"),(59,"Kasper","Oneil"),(60,"Giselle","Diaz"),(61,"Roary","Baird"),(62,"Ishmael","Pena"),(63,"Hoyt","Marshall"),(64,"Wade","Trevino"),(65,"Malik","Mccullough"),(66,"Malik","Willis"),(67,"Avye","Fox"),(68,"Lenore","Espinoza"),(69,"Shad","Mcgowan"),(70,"Harriet","Carney"),(71,"Melyssa","Townsend"),(72,"Brock","Sandoval"),(73,"Michelle","Duke"),(74,"Garrett","Whitaker"),(75,"Cyrus","Silva"),(76,"August","Richardson"),(77,"Erin","Franks"),(78,"Emmanuel","Reeves"),(79,"Ursula","Little"),(80,"Wesley","Gonzales"),(81,"Isaac","Wells"),(82,"Rafael","Hodges"),(83,"Jared","Fox"),(84,"Ruth","Delaney"),(85,"Uma","Bray"),(86,"Regan","Castaneda"),(87,"Steel","Reid"),(88,"Zephania","Salinas"),(89,"Hu","Goff"),(90,"Natalie","Graves"),(91,"Hu","Davis"),(92,"James","Ford"),(93,"Hayley","Carr"),(94,"Yoshio","Curry"),(95,"Dalton","Norris"),(96,"Reese","Cantu"),(97,"Jayme","Sharp"),(98,"Lani","Nixon"),(99,"Griffith","Mcmahon"),(100,"Ariel","Cummings");
INSERT INTO AcademicStaff (staffID,firstName,lastName) VALUES (101,"Jonas","Carpenter"),(102,"Moses","David"),(103,"Iola","Melton"),(104,"Olga","Mckenzie"),(105,"Reuben","Steele"),(106,"Brennan","Holder"),(107,"Ferris","Gould"),(108,"Medge","Maddox"),(109,"Marcia","Tran"),(110,"Kirby","Stafford"),(111,"Kathleen","Roach"),(112,"Mason","Hebert"),(113,"Jane","Armstrong"),(114,"Briar","Sherman"),(115,"Ciara","Bean"),(116,"Xanthus","Rutledge"),(117,"Aurelia","Pugh"),(118,"Davis","Oneil"),(119,"Paula","Franco"),(120,"Arden","Bailey"),(121,"Upton","Reeves"),(122,"Ivan","Vargas"),(123,"Jesse","Graves"),(124,"Shoshana","Floyd"),(125,"Hamish","Good"),(126,"Chastity","Parrish"),(127,"Athena","Downs"),(128,"Rafael","Guerrero"),(129,"Jada","Hoover"),(130,"Xerxes","Brown"),(131,"Quentin","Cardenas"),(132,"Stephen","Shelton"),(133,"Moana","Shelton"),(134,"Yoko","Mccormick"),(135,"Carolyn","Lester"),(136,"Arsenio","Wooten"),(137,"Venus","Dean"),(138,"Willow","Kline"),(139,"Tamara","Rojas"),(140,"Carl","Combs"),(141,"Wyatt","Riley"),(142,"Lawrence","Washington"),(143,"Reese","Lester"),(144,"Lee","Graham"),(145,"Urielle","Campos"),(146,"Ariel","Kelly"),(147,"Cheyenne","Avery"),(148,"Geraldine","Spencer"),(149,"Audrey","Brock"),(150,"Fitzgerald","Harvey");
INSERT INTO AcademicStaff (staffID,firstName,lastName) VALUES (151,"Sybill","Talley"),(152,"Lars","Brown"),(153,"Leslie","Mayer"),(154,"Byron","Walker"),(155,"Wallace","Barber"),(156,"Jessica","Hunt"),(157,"Zenaida","Brewer"),(158,"Nathaniel","Nichols"),(159,"Charissa","Tate"),(160,"Jessica","Tucker"),(161,"Ulysses","Todd"),(162,"Axel","Flores"),(163,"Aiko","Calderon"),(164,"Josiah","Norris"),(165,"Kevyn","Morris"),(166,"Jamalia","Hurley"),(167,"Claudia","Davenport"),(168,"Jarrod","Hudson"),(169,"Nathan","Hurley"),(170,"Gabriel","Summers"),(171,"Carl","Sanchez"),(172,"Flavia","Coffey"),(173,"Kylie","Atkins"),(174,"Marcia","Spence"),(175,"Logan","Richards"),(176,"Tarik","Vinson"),(177,"Cherokee","Lambert"),(178,"Christian","Miles"),(179,"Fletcher","Roberson"),(180,"Blake","Dawson"),(181,"Tamara","Owens"),(182,"Gemma","Love"),(183,"Hyacinth","Mccarty"),(184,"Alika","Gray"),(185,"Kylynn","Daniels"),(186,"Adara","Moody"),(187,"Montana","Dunn"),(188,"Patrick","Tyson"),(189,"Dane","Barnett"),(190,"Charlotte","Cohen"),(191,"Kelly","Parks"),(192,"Eric","Cross"),(193,"Dieter","Ayala"),(194,"Igor","Burt"),(195,"Joel","Whitney"),(196,"Elvis","Fischer"),(197,"Althea","Joyner"),(198,"Xander","Delacruz"),(199,"Mari","Rodriquez"),(200,"Ivana","Swanson");
INSERT INTO Faculty (facultyID,title) VALUES (1, "Arts"),(2, "Business and Economics"),(3, "Education"),(4,"Graduate Studies"),(5, "Kinesiology and Applied Health"),(6, "Science");
INSERT INTO Department (departmentID,facultyID,title) VALUES (1,1,"Classics"),(2,1,"Criminal Justice"),(3,1,"English"),(4,1,"History"),(5,1,"Indigenous Studies"),(6,1,"Modern Languages and Literatures"),(7,1,"Philosophy"),(8,1,"Political Science"),(9,1,"Psychology"),(10,1,"Religion and Culture"),(11,1,"Rhetoric, Writing, and Communications"),(12,1,"Sociology"),(13,1,"Theatre and Film"),(14,1,"Urban and Inner-City Studies"),(15,1,"Women and Gender Studies");
INSERT INTO Department (departmentID,facultyID,title) VALUES (16,2,"Economics"),(17,2,"Business and Administration");
INSERT INTO Department (departmentID,facultyID,title) VALUES (18,5,"Athletics"),(19,5,"Kinesiology and Applied Health");
INSERT INTO Department (departmentID,facultyID,title) VALUES (20,6,"Anthropology"),(21,6,"Applied Computer Science"),(22,6,"BioAnthropology"),(23,6,"BioChemistry"),(24,6,"Biology"),(25,6,"Biopsychology"),(26,6,"Chemistry"),(27,6,"Engineering"),(28,6,"Environmental Studies and Sciences"),(29,6,"Geography"),(30,6,"Mathematics and Statistics"),(31,6,"Physics");
INSERT INTO Rank (rankID,title) VALUES (1, "Instructor I"),(2, "Instructor II"),(3, "Instructor III"),(4, "Lecturer"),(5, "Assistant Professor"),(6, "Associate Professor"),(7,"Professor");
