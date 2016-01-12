DROP DATABASE IF EXISTS asims;
CREATE DATABASE IF NOT EXISTS asims;
USE asims;

CREATE TABLE AcademicStaff(
	staffID INT NOT NULL AUTO_INCREMENT,
	firstName VARCHAR(50) NOT NULL,
	lastName VARCHAR(50) NOT NULL,
	employeeNo VARCHAR(50),
	PRIMARY KEY(staffID)
);

CREATE TABLE AcademicStaff_Department(
	academicStaffDepartmentID INT NOT NULL AUTO_INCREMENT,
	departmentID INT NOT NULL,
	staffID INT NOT NULL,
	startDate DATE NOT NULL, #DEFAULT 20100101,
	endDate DATE,
	PRIMARY KEY(academicStaffDepartmentID)
);

CREATE TABLE AcademicStaff_Section(
	academicStaffSectionID INT NOT NULL AUTO_INCREMENT,
	staffID INT NOT NULL,
	courseSectionID INT NOT NULL,
	role VARCHAR(50),
	weight FLOAT NOT NULL,
	PRIMARY KEY(academicStaffSectionID)
);

CREATE TABLE Chair(
	chairID INT NOT NULL AUTO_INCREMENT,
	regularStaffID INT NOT NULL,
	departmentID INT NOT NULL,
	startDate DATE NOT NULL, #DEFAULT 20100101,
	endDate DATE,
	PRIMARY KEY (chairID)
);

CREATE TABLE ContractStaff(
	contractStaffID INT NOT NULL AUTO_INCREMENT,
	academicStaffID INT NOT NULL,
	startDate DATE NOT NULL, #DEFAULT 20100101,
	endDate DATE,
	PRIMARY KEY(contractStaffID)
);

CREATE TABLE Course(
	courseID INT NOT NULL AUTO_INCREMENT,
	courseNo VARCHAR(10) NOT NULL,
	UNIQUE(courseNo),
	PRIMARY KEY(courseID)
);

CREATE TABLE Course_Section(
	courseSectionID INT NOT NULL AUTO_INCREMENT,
	departmentCourseID INT NOT NULL,
	sectionID INT NOT NULL,
	startDate DATE NOT NULL, #DEFAULT 20150901,
	endDate DATE NOT NULL, #DEFAULT 20160501,
	FCEValue FLOAT NOT NULL,
	PRIMARY KEY(courseSectionID)
);

CREATE TABLE DefaultNormalLoad(
	defaultNormalLoadID INT NOT NULL AUTO_INCREMENT,
	rankID INT NOT NULL,
	departmentID INT NOT NULL,
	startDate DATE NOT NULL, #DEFAULT 20100101,
	FCEValue FLOAT NOT NULL,
	PRIMARY KEY(defaultNormalLoadID)
);

CREATE TABLE Department(
	departmentID INT NOT NULL AUTO_INCREMENT,
	facultyID INT NOT NULL,
	departmentCode VARCHAR(10),
	title VARCHAR(50) NOT NULL,
	description TEXT,
	UNIQUE(departmentCode),
	PRIMARY KEY(departmentID)
);

CREATE TABLE Department_Course(
	departmentCourseID INT NOT NULL AUTO_INCREMENT,
	departmentID INT NOT NULL,
	courseID INT NOT NULL,
	title VARCHAR(50),
	description TEXT,
    PRIMARY KEY(departmentCourseID)
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
	academicStaffID INT NOT NULL,
	regularStaffID INT NOT NULL AUTO_INCREMENT,
	startDate DATE NOT NULL, #DEFAULT 20100101,
	endDate DATE,
	contApptDate DATE,
	tenureDate DATE,
	PRIMARY KEY(regularStaffID)
);

CREATE TABLE RegularStaff_Rank(
	regularStaffRankID INT NOT NULL AUTO_INCREMENT,
	rankID INT NOT NULL,
	regularStaffID INT NOT NULL,
	startDate DATE NOT NULL, #DEFAULT 20100101,
	endDate DATE,
	PRIMARY KEY(regularStaffRankID)
);

CREATE TABLE RegularStaff_Research(
	regularStaffResearchID INT NOT NULL AUTO_INCREMENT,
	researchID INT NOT NULL,
	regularStaffID INT NOT NULL,
	loadReductionID INT,
	startDate DATE NOT NULL,
	endDate DATE,
	PRIMARY KEY(regularStaffResearchID)
);

CREATE TABLE Research(
	researchID INT NOT NULL AUTO_INCREMENT,
	title VARCHAR(50) NOT NULL,
	abstract TEXT,
	startDate DATE NOT NULL,
	endDate DATE, #NOT NULL
	PRIMARY KEY(researchID)
);

CREATE TABlE ResearchGrant(
	grantID INT NOT NULL AUTO_INCREMENT,
	researchID INT NOT NULL,
	grantingAgency VARCHAR(50) NOT NULL,
	dateAwarded DATE,
	duration FLOAT(10,2),
	amount FLOAT(10,2),
	PRIMARY KEY(grantID)
);


CREATE TABLE Section(
	sectionID INT NOT NULL AUTO_INCREMENT,
	sectionNo VARCHAR(10) NOT NULL,
	title VARCHAR(50),
	UNIQUE(sectionNo),
	PRIMARY KEY(sectionID)
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


#BEGIN ALTER TABLE AND FK CONSTRAINTS
ALTER TABLE AcademicStaff_Department ADD CONSTRAINT FOREIGN KEY(departmentID) REFERENCES Department(departmentID);
ALTER TABLE AcademicStaff_Department ADD CONSTRAINT FOREIGN KEY(staffID) REFERENCES AcademicStaff(staffID);
ALTER TABLE AcademicStaff_Section ADD CONSTRAINT FOREIGN KEY(courseSectionID) REFERENCES Course_Section(courseSectionID);
ALTER TABLE AcademicStaff_Section ADD CONSTRAINT FOREIGN KEY(staffID) REFERENCES AcademicStaff(staffID);
ALTER TABLE Chair ADD CONSTRAINT FOREIGN KEY(departmentID) REFERENCES Department(departmentID);
ALTER TABLE Chair ADD CONSTRAINT FOREIGN KEY(regularStaffID) REFERENCES RegularStaff(regularStaffID);
ALTER TABLE Course_Section ADD CONSTRAINT FOREIGN KEY(departmentCourseID) REFERENCES Department_Course(departmentCourseID);
ALTER TABLE Course_Section ADD CONSTRAINT FOREIGN KEY(sectionID) REFERENCES Section(sectionID);
ALTER TABLE ContractStaff ADD CONSTRAINT FOREIGN KEY(academicStaffID) REFERENCES AcademicStaff(staffID);
ALTER TABLE DefaultNormalLoad ADD CONSTRAINT FOREIGN KEY(rankID) REFERENCES Rank(rankID);
ALTER TABLE DefaultNormalLoad ADD CONSTRAINT FOREIGN KEY(departmentID) REFERENCES Department(departmentID);
ALTER TABLE Department ADD CONSTRAINT FOREIGN KEY(facultyID) REFERENCES Faculty(facultyID);
ALTER TABLE Department_Course ADD CONSTRAINT FOREIGN KEY(departmentID) REFERENCES Department(departmentID);
ALTER TABLE Department_Course ADD CONSTRAINT FOREIGN KEY(courseID) REFERENCES Course(courseID);
ALTER TABLE FCECredit ADD CONSTRAINT FOREIGN KEY(regularStaffID) REFERENCES RegularStaff(regularStaffID);
ALTER TABLE FCEDebit ADD CONSTRAINT FOREIGN KEY(regularStaffID) REFERENCES RegularStaff(regularStaffID);
ALTER TABLE ResearchGrant ADD CONSTRAINT FOREIGN KEY(researchID) REFERENCES Research(researchID);
ALTER TABLE StaffLeave ADD CONSTRAINT FOREIGN KEY(regularStaffID) REFERENCES RegularStaff(regularStaffID);
ALTER TABLE StaffLeave ADD CONSTRAINT FOREIGN KEY(leaveDebitID) REFERENCES LeaveDebit(leaveDebitID);
ALTER TABLE LeaveCredit ADD CONSTRAINT FOREIGN KEY(regularStaffID) REFERENCES RegularStaff(regularStaffID);
ALTER TABLE LeaveDebit ADD CONSTRAINT FOREIGN KEY(regularStaffID) REFERENCES RegularStaff(regularStaffID);
ALTER TABLE LoadIncrease ADD CONSTRAINT FOREIGN KEY(regularStaffID) REFERENCES RegularStaff(regularStaffID);
ALTER TABLE LoadReduction ADD CONSTRAINT FOREIGN KEY(regularStaffID) REFERENCES RegularStaff(regularStaffID);
ALTER TABLE RegularStaff ADD CONSTRAINT FOREIGN KEY(academicStaffID) REFERENCES AcademicStaff(staffID);
ALTER TABLE RegularStaff_Rank ADD CONSTRAINT FOREIGN KEY(rankID) REFERENCES Rank(rankID);
ALTER TABLE RegularStaff_Rank ADD CONSTRAINT FOREIGN KEY(regularStaffID) REFERENCES RegularStaff(regularStaffID);
ALTER TABLE RegularStaff_Research ADD CONSTRAINT FOREIGN KEY(regularStaffID) REFERENCES RegularStaff(regularStaffID);
ALTER TABLE RegularStaff_Research ADD CONSTRAINT FOREIGN KEY(researchID) REFERENCES Research(researchID);
ALTER TABLE RegularStaff_Research ADD CONSTRAINT FOREIGN KEY(loadReductionID) REFERENCES LoadReduction(loadReductionID);

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
INSERT INTO AcademicStaff_Department (academicStaffDepartmentID,departmentID,staffID) VALUES (1,23,1),(2,22,2),(3,26,3),(4,21,4),(5,25,5),(6,28,6),(7,24,7),(8,23,8),(9,25,9),(10,22,10),(11,25,11),(12,20,12),(13,25,13),(14,22,14),(15,21,15),(16,31,16),(17,25,17),(18,25,18),(19,23,19),(20,31,20),(21,21,21),(22,23,22),(23,29,23),(24,31,24),(25,27,25),(26,22,26),(27,31,27),(28,27,28),(29,27,29),(30,25,30),(31,27,31),(32,27,32),(33,25,33),(34,26,34),(35,21,35),(36,24,36),(37,23,37),(38,30,38),(39,26,39),(40,27,40),(41,20,41),(42,31,42),(43,25,43),(44,24,44),(45,23,45),(46,24,46),(47,23,47),(48,23,48),(49,31,49),(50,26,50);
INSERT INTO AcademicStaff_Department (academicStaffDepartmentID,departmentID,staffID) VALUES (51,25,51),(52,30,52),(53,26,53),(54,24,54),(55,28,55),(56,22,56),(57,25,57),(58,21,58),(59,27,59),(60,20,60),(61,27,61),(62,31,62),(63,20,63),(64,30,64),(65,21,65),(66,27,66),(67,22,67),(68,20,68),(69,30,69),(70,24,70),(71,20,71),(72,20,72),(73,29,73),(74,31,74),(75,20,75),(76,23,76),(77,28,77),(78,31,78),(79,23,79),(80,30,80),(81,28,81),(82,23,82),(83,22,83),(84,26,84),(85,22,85),(86,31,86),(87,20,87),(88,23,88),(89,26,89),(90,21,90),(91,31,91),(92,27,92),(93,21,93),(94,25,94),(95,27,95),(96,23,96),(97,24,97),(98,31,98),(99,31,99),(100,20,100);
INSERT INTO AcademicStaff_Department (academicStaffDepartmentID,departmentID,staffID) VALUES (101,25,101),(102,31,102),(103,28,103),(104,27,104),(105,26,105),(106,20,106),(107,21,107),(108,25,108),(109,21,109),(110,22,110),(111,26,111),(112,20,112),(113,31,113),(114,23,114),(115,28,115),(116,22,116),(117,22,117),(118,22,118),(119,22,119),(120,22,120),(121,23,121),(122,22,122),(123,27,123),(124,27,124),(125,22,125),(126,24,126),(127,27,127),(128,23,128),(129,27,129),(130,24,130),(131,24,131),(132,26,132),(133,31,133),(134,28,134),(135,27,135),(136,22,136),(137,25,137),(138,23,138),(139,22,139),(140,27,140),(141,27,141),(142,23,142),(143,28,143),(144,29,144),(145,24,145),(146,30,146),(147,26,147),(148,26,148),(149,22,149),(150,25,150);
INSERT INTO AcademicStaff_Department (academicStaffDepartmentID,departmentID,staffID) VALUES (151,28,151),(152,27,152),(153,21,153),(154,20,154),(155,29,155),(156,24,156),(157,27,157),(158,30,158),(159,26,159),(160,24,160),(161,29,161),(162,27,162),(163,27,163),(164,24,164),(165,21,165),(166,21,166),(167,22,167),(168,28,168),(169,27,169),(170,27,170),(171,21,171),(172,29,172),(173,31,173),(174,20,174),(175,31,175),(176,24,176),(177,30,177),(178,26,178),(179,27,179),(180,30,180),(181,28,181),(182,23,182),(183,26,183),(184,30,184),(185,26,185),(186,20,186),(187,25,187),(188,26,188),(189,29,189),(190,20,190),(191,24,191),(192,20,192),(193,20,193),(194,24,194),(195,21,195),(196,22,196),(197,28,197),(198,20,198),(199,21,199),(200,21,200);

#All Start dates set to 2010-01-01.
INSERT INTO RegularStaff (regularStaffID,academicStaffID) VALUES (1,1),(2,2),(3,3),(4,4),(5,5),(6,6),(7,7),(8,8),(9,9),(10,10),(11,11),(12,12),(13,13),(14,14),(15,15),(16,16),(17,17),(18,18),(19,19),(20,20),(21,21),(22,22),(23,23),(24,24),(25,25),(26,26),(27,27),(28,28),(29,29),(30,30),(31,31),(32,32),(33,33),(34,34),(35,35),(36,36),(37,37),(38,38),(39,39),(40,40),(41,41),(42,42),(43,43),(44,44),(45,45),(46,46),(47,47),(48,48),(49,49),(50,50);
INSERT INTO RegularStaff (regularStaffID,academicStaffID) VALUES (51,51),(52,52),(53,53),(54,54),(55,55),(56,56),(57,57),(58,58),(59,59),(60,60),(61,61),(62,62),(63,63),(64,64),(65,65),(66,66),(67,67),(68,68),(69,69),(70,70),(71,71),(72,72),(73,73),(74,74),(75,75),(76,76),(77,77),(78,78),(79,79),(80,80),(81,81),(82,82),(83,83),(84,84),(85,85),(86,86),(87,87),(88,88),(89,89),(90,90),(91,91),(92,92),(93,93),(94,94),(95,95),(96,96),(97,97),(98,98),(99,99),(100,100);
INSERT INTO RegularStaff (regularStaffID,academicStaffID) VALUES (101,101),(102,102),(103,103),(104,104),(105,105),(106,106),(107,107),(108,108),(109,109),(110,110),(111,111),(112,112),(113,113),(114,114),(115,115),(116,116),(117,117),(118,118),(119,119),(120,120),(121,121),(122,122),(123,123),(124,124),(125,125),(126,126),(127,127),(128,128),(129,129),(130,130),(131,131),(132,132),(133,133),(134,134),(135,135),(136,136),(137,137),(138,138),(139,139),(140,140),(141,141),(142,142),(143,143),(144,144),(145,145),(146,146),(147,147),(148,148),(149,149),(150,150);
INSERT INTO ContractStaff (contractStaffID,academicStaffID) VALUES (1,151),(2,152),(3,153),(4,154),(5,155),(6,156),(7,157),(8,158),(9,159),(10,160),(11,161),(12,162),(13,163),(14,164),(15,165),(16,166),(17,167),(18,168),(19,169),(20,170),(21,171),(22,172),(23,173),(24,174),(25,175),(26,176),(27,177),(28,178),(29,179),(30,180),(31,181),(32,182),(33,183),(34,184),(35,185),(36,186),(37,187),(38,188),(39,189),(40,190),(41,191),(42,192),(43,193),(44,194),(45,195),(46,196),(47,197),(48,198),(49,199),(50,200);
INSERT INTO RegularStaff_Rank (regularStaffRankID,rankID,regularStaffID) VALUES (1,2,1),(2,5,2),(3,7,3),(4,5,4),(5,4,5),(6,3,6),(7,3,7),(8,6,8),(9,5,9),(10,5,10),(11,2,11),(12,6,12),(13,1,13),(14,1,14),(15,7,15),(16,6,16),(17,3,17),(18,6,18),(19,6,19),(20,4,20),(21,7,21),(22,6,22),(23,5,23),(24,4,24),(25,2,25),(26,7,26),(27,3,27),(28,4,28),(29,2,29),(30,1,30),(31,4,31),(32,7,32),(33,5,33),(34,5,34),(35,2,35),(36,5,36),(37,1,37),(38,6,38),(39,3,39),(40,2,40),(41,5,41),(42,7,42),(43,2,43),(44,7,44),(45,2,45),(46,1,46),(47,7,47),(48,2,48),(49,7,49),(50,7,50);
INSERT INTO RegularStaff_Rank (regularStaffRankID,rankID,regularStaffID) VALUES (51,2,51),(52,4,52),(53,5,53),(54,6,54),(55,6,55),(56,5,56),(57,3,57),(58,4,58),(59,2,59),(60,5,60),(61,5,61),(62,3,62),(63,4,63),(64,5,64),(65,3,65),(66,4,66),(67,3,67),(68,1,68),(69,5,69),(70,7,70),(71,1,71),(72,6,72),(73,4,73),(74,1,74),(75,3,75),(76,2,76),(77,4,77),(78,1,78),(79,7,79),(80,1,80),(81,2,81),(82,2,82),(83,7,83),(84,6,84),(85,5,85),(86,4,86),(87,1,87),(88,6,88),(89,6,89),(90,6,90),(91,3,91),(92,4,92),(93,7,93),(94,3,94),(95,2,95),(96,6,96),(97,3,97),(98,5,98),(99,2,99),(100,4,100);
INSERT INTO RegularStaff_Rank (regularStaffRankID,rankID,regularStaffID) VALUES (101,6,101),(102,1,102),(103,4,103),(104,6,104),(105,2,105),(106,7,106),(107,2,107),(108,3,108),(109,3,109),(110,1,110),(111,7,111),(112,3,112),(113,6,113),(114,2,114),(115,4,115),(116,1,116),(117,6,117),(118,4,118),(119,2,119),(120,2,120),(121,2,121),(122,3,122),(123,4,123),(124,3,124),(125,4,125),(126,2,126),(127,1,127),(128,2,128),(129,3,129),(130,3,130),(131,4,131),(132,4,132),(133,4,133),(134,7,134),(135,3,135),(136,4,136),(137,2,137),(138,7,138),(139,3,139),(140,1,140),(141,5,141),(142,5,142),(143,4,143),(144,2,144),(145,3,145),(146,3,146),(147,6,147),(148,2,148),(149,4,149),(150,1,150);
INSERT INTO Chair (chairID,regularStaffID,departmentID) VALUES (1,37,23),(2,85,26),(3,67,30),(4,99,20),(5,113,27),(6,58,29),(7,103,24),(8,79,31),(9,74,21),(10,141,22),(11,45,25),(12,107,28)


