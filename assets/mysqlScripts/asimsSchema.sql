-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema asimsTest
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `asimsTest` ;

-- -----------------------------------------------------
-- Schema asimsTest
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `asimsTest` DEFAULT CHARACTER SET latin1 ;
USE `asimsTest` ;

-- -----------------------------------------------------
-- Table `AcademicStaff`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `AcademicStaff` ;

CREATE TABLE IF NOT EXISTS `AcademicStaff` (
  `academicStaffID` INT(11) NOT NULL AUTO_INCREMENT COMMENT '',
  `firstName` VARCHAR(50) NOT NULL COMMENT '',
  `lastName` VARCHAR(50) NOT NULL COMMENT '',
  `employeeNo` VARCHAR(50) NULL COMMENT '',
  PRIMARY KEY (`academicStaffID`)  COMMENT '')
ENGINE = InnoDB
AUTO_INCREMENT = 201
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `Faculty`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Faculty` ;

CREATE TABLE IF NOT EXISTS `Faculty` (
  `facultyID` INT(11) NOT NULL AUTO_INCREMENT COMMENT '',
  `title` VARCHAR(50) NOT NULL COMMENT '',
  PRIMARY KEY (`facultyID`)  COMMENT '')
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `Department`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Department` ;

CREATE TABLE IF NOT EXISTS `Department` (
  `departmentID` INT(11) NOT NULL AUTO_INCREMENT COMMENT '',
  `facultyID` INT(11) NOT NULL COMMENT '',
  `departmentCode` VARCHAR(10) NULL DEFAULT NULL COMMENT '',
  `title` VARCHAR(50) NOT NULL COMMENT '',
  `description` TEXT NULL DEFAULT NULL COMMENT '',
  PRIMARY KEY (`departmentID`)  COMMENT '',
  UNIQUE INDEX `departmentCode` (`departmentCode` ASC)  COMMENT '',
  INDEX `facultyID` (`facultyID` ASC)  COMMENT '',
  CONSTRAINT `Department_ibfk_1`
    FOREIGN KEY (`facultyID`)
    REFERENCES `Faculty` (`facultyID`))
ENGINE = InnoDB
AUTO_INCREMENT = 32
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `AcademicStaff_Department`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `AcademicStaff_Department` ;

CREATE TABLE IF NOT EXISTS `AcademicStaff_Department` (
  `academicStaffDepartmentID` INT(11) NOT NULL AUTO_INCREMENT COMMENT '',
  `departmentID` INT(11) NOT NULL COMMENT '',
  `academicStaffID` INT(11) NOT NULL COMMENT '',
  `startDate` DATE NOT NULL DEFAULT '2000-01-01' COMMENT '',
  `endDate` DATE NULL COMMENT '',
  PRIMARY KEY (`academicStaffDepartmentID`)  COMMENT '',
  INDEX `departmentID` (`departmentID` ASC)  COMMENT '',
  INDEX `academicStaffID` (`academicStaffID` ASC)  COMMENT '',
  CONSTRAINT `AcademicStaff_Department_ibfk_2`
    FOREIGN KEY (`academicStaffID`)
    REFERENCES `AcademicStaff` (`academicStaffID`),
  CONSTRAINT `AcademicStaff_Department_ibfk_1`
    FOREIGN KEY (`departmentID`)
    REFERENCES `Department` (`departmentID`))
ENGINE = InnoDB
AUTO_INCREMENT = 201
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `Section`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Section` ;

CREATE TABLE IF NOT EXISTS `Section` (
  `sectionID` INT(11) NOT NULL AUTO_INCREMENT COMMENT '',
  `sectionNo` VARCHAR(10) NOT NULL COMMENT '',
  `type` VARCHAR(50) NULL COMMENT '',
  `FCEModifier` FLOAT NOT NULL COMMENT '',
  PRIMARY KEY (`sectionID`)  COMMENT '',
  UNIQUE INDEX `sectionNo` (`sectionNo` ASC)  COMMENT '')
ENGINE = InnoDB
AUTO_INCREMENT = 14
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `Course`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Course` ;

CREATE TABLE IF NOT EXISTS `Course` (
  `courseID` INT(11) NOT NULL AUTO_INCREMENT COMMENT '',
  `departmentID` INT(11) NOT NULL COMMENT '',
  `courseNO` INT(11) NOT NULL COMMENT '',
  `title` VARCHAR(50) NULL DEFAULT NULL COMMENT '',
  `description` TEXT NULL DEFAULT NULL COMMENT '',
  PRIMARY KEY (`courseID`)  COMMENT '',
  UNIQUE INDEX `uc_course` (`departmentID` ASC, `courseNO` ASC)  COMMENT '',
  CONSTRAINT `Course_ibfk_1`
    FOREIGN KEY (`departmentID`)
    REFERENCES `Department` (`departmentID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `Section_Offered`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Section_Offered` ;

CREATE TABLE IF NOT EXISTS `Section_Offered` (
  `sectionOfferedID` INT(11) NOT NULL AUTO_INCREMENT COMMENT '',
  `courseID` INT(11) NOT NULL COMMENT '',
  `sectionID` INT(11) NOT NULL COMMENT '',
  `groupID` INT(11) NOT NULL COMMENT '',
  `startDate` DATE NOT NULL COMMENT '',
  `endDate` DATE NOT NULL COMMENT '',
  PRIMARY KEY (`sectionOfferedID`)  COMMENT '',
  UNIQUE INDEX `uc_Section` (`courseID` ASC, `sectionID` ASC)  COMMENT '',
  INDEX `sectionID` (`sectionID` ASC)  COMMENT '',
  CONSTRAINT `Section_Offered_ibfk_2`
    FOREIGN KEY (`sectionID`)
    REFERENCES `Section` (`sectionID`),
  CONSTRAINT `Section_Offered_ibfk_1`
    FOREIGN KEY (`courseID`)
    REFERENCES `Course` (`courseID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `AcademicStaff_Section`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `AcademicStaff_Section` ;

CREATE TABLE IF NOT EXISTS `AcademicStaff_Section` (
  `academicStaffSectionID` INT(11) NOT NULL AUTO_INCREMENT COMMENT '',
  `academicStaffID` INT(11) NOT NULL COMMENT '',
  `sectionOfferedID` INT(11) NOT NULL COMMENT '',
  `role` VARCHAR(50) NULL COMMENT '',
  `weight` FLOAT NOT NULL COMMENT '',
  PRIMARY KEY (`academicStaffSectionID`)  COMMENT '',
  INDEX `sectionOfferedID` (`sectionOfferedID` ASC)  COMMENT '',
  INDEX `academicStaffID` (`academicStaffID` ASC)  COMMENT '',
  CONSTRAINT `AcademicStaff_Section_ibfk_2`
    FOREIGN KEY (`academicStaffID`)
    REFERENCES `AcademicStaff` (`academicStaffID`),
  CONSTRAINT `AcademicStaff_Section_ibfk_1`
    FOREIGN KEY (`sectionOfferedID`)
    REFERENCES `Section_Offered` (`sectionOfferedID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `RegularStaff`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `RegularStaff` ;

CREATE TABLE IF NOT EXISTS `RegularStaff` (
  `academicStaffID` INT(11) NOT NULL COMMENT '',
  `regularStaffID` INT(11) NOT NULL AUTO_INCREMENT COMMENT '',
  `contApptDate` DATE NULL DEFAULT NULL COMMENT '',
  `tenureDate` DATE NULL DEFAULT NULL COMMENT '',
  PRIMARY KEY (`regularStaffID`)  COMMENT '',
  INDEX `academicStaffID` (`academicStaffID` ASC)  COMMENT '',
  CONSTRAINT `RegularStaff_ibfk_1`
    FOREIGN KEY (`academicStaffID`)
    REFERENCES `AcademicStaff` (`academicStaffID`))
ENGINE = InnoDB
AUTO_INCREMENT = 151
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `Chair`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Chair` ;

CREATE TABLE IF NOT EXISTS `Chair` (
  `chairID` INT(11) NOT NULL AUTO_INCREMENT COMMENT '',
  `regularStaffID` INT(11) NOT NULL COMMENT '',
  `departmentID` INT(11) NOT NULL COMMENT '',
  `startDate` DATE NOT NULL DEFAULT '2010-01-01' COMMENT '',
  `endDate` DATE NULL DEFAULT NULL COMMENT '',
  PRIMARY KEY (`chairID`)  COMMENT '',
  INDEX `departmentID` (`departmentID` ASC)  COMMENT '',
  INDEX `regularStaffID` (`regularStaffID` ASC)  COMMENT '',
  CONSTRAINT `Chair_ibfk_2`
    FOREIGN KEY (`regularStaffID`)
    REFERENCES `RegularStaff` (`regularStaffID`),
  CONSTRAINT `Chair_ibfk_1`
    FOREIGN KEY (`departmentID`)
    REFERENCES `Department` (`departmentID`))
ENGINE = InnoDB
AUTO_INCREMENT = 13
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `ContractStaff`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ContractStaff` ;

CREATE TABLE IF NOT EXISTS `ContractStaff` (
  `contractStaffID` INT(11) NOT NULL AUTO_INCREMENT COMMENT '',
  `academicStaffID` INT(11) NOT NULL COMMENT '',
  PRIMARY KEY (`contractStaffID`)  COMMENT '',
  INDEX `academicStaffID` (`academicStaffID` ASC)  COMMENT '',
  CONSTRAINT `ContractStaff_ibfk_1`
    FOREIGN KEY (`academicStaffID`)
    REFERENCES `AcademicStaff` (`academicStaffID`))
ENGINE = InnoDB
AUTO_INCREMENT = 51
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `ContractStaffEmployment`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ContractStaffEmployment` ;

CREATE TABLE IF NOT EXISTS `ContractStaffEmployment` (
  `contractStaffID` INT(11) NOT NULL COMMENT '',
  `contractEmploymentID` INT(11) NOT NULL AUTO_INCREMENT COMMENT '',
  `startDate` DATE NOT NULL DEFAULT '2010-01-01' COMMENT '',
  `endDate` DATE NULL DEFAULT NULL COMMENT '',
  PRIMARY KEY (`contractEmploymentID`)  COMMENT '',
  INDEX `contractStaffID` (`contractStaffID` ASC)  COMMENT '',
  CONSTRAINT `ContractStaffEmployment_ibfk_1`
    FOREIGN KEY (`contractStaffID`)
    REFERENCES `ContractStaff` (`contractStaffID`))
ENGINE = InnoDB
AUTO_INCREMENT = 51
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `Crosslisting`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Crosslisting` ;

CREATE TABLE IF NOT EXISTS `Crosslisting` (
  `crosslistingID` INT(11) NOT NULL AUTO_INCREMENT COMMENT '',
  `courseID` INT(11) NOT NULL COMMENT '',
  `groupID` INT(11) NOT NULL COMMENT '',
  PRIMARY KEY (`crosslistingID`)  COMMENT '',
  INDEX `courseID` (`courseID` ASC)  COMMENT '',
  CONSTRAINT `Crosslisting_ibfk_1`
    FOREIGN KEY (`courseID`)
    REFERENCES `Course` (`courseID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `Rank`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Rank` ;

CREATE TABLE IF NOT EXISTS `Rank` (
  `rankID` INT(11) NOT NULL AUTO_INCREMENT COMMENT '',
  `title` VARCHAR(50) NOT NULL COMMENT '',
  `description` TEXT NULL DEFAULT NULL COMMENT '',
  PRIMARY KEY (`rankID`)  COMMENT '')
ENGINE = InnoDB
AUTO_INCREMENT = 8
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `DefaultNormalLoad`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `DefaultNormalLoad` ;

CREATE TABLE IF NOT EXISTS `DefaultNormalLoad` (
  `defaultNormalLoadID` INT(11) NOT NULL AUTO_INCREMENT COMMENT '',
  `rankID` INT(11) NOT NULL COMMENT '',
  `departmentID` INT(11) NOT NULL COMMENT '',
  `startDate` DATE NOT NULL DEFAULT '2010-01-01' COMMENT '',
  `FCEValue` FLOAT NOT NULL COMMENT '',
  PRIMARY KEY (`defaultNormalLoadID`)  COMMENT '',
  INDEX `rankID` (`rankID` ASC)  COMMENT '',
  INDEX `departmentID` (`departmentID` ASC)  COMMENT '',
  CONSTRAINT `DefaultNormalLoad_ibfk_2`
    FOREIGN KEY (`departmentID`)
    REFERENCES `Department` (`departmentID`),
  CONSTRAINT `DefaultNormalLoad_ibfk_1`
    FOREIGN KEY (`rankID`)
    REFERENCES `Rank` (`rankID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `FCECredit`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `FCECredit` ;

CREATE TABLE IF NOT EXISTS `FCECredit` (
  `FCECreditID` INT(11) NOT NULL AUTO_INCREMENT COMMENT '',
  `regularStaffID` INT(11) NOT NULL COMMENT '',
  `amount` FLOAT NOT NULL COMMENT '',
  `description` TEXT NULL DEFAULT NULL COMMENT '',
  `dateIssued` DATE NULL DEFAULT NULL COMMENT '',
  `FCECreditType` VARCHAR(50) NULL DEFAULT NULL COMMENT '',
  PRIMARY KEY (`FCECreditID`)  COMMENT '',
  INDEX `regularStaffID` (`regularStaffID` ASC)  COMMENT '',
  CONSTRAINT `FCECredit_ibfk_1`
    FOREIGN KEY (`regularStaffID`)
    REFERENCES `RegularStaff` (`regularStaffID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `FCEDebit`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `FCEDebit` ;

CREATE TABLE IF NOT EXISTS `FCEDebit` (
  `FCEDebitID` INT(11) NOT NULL AUTO_INCREMENT COMMENT '',
  `regularStaffID` INT(11) NOT NULL COMMENT '',
  `amount` FLOAT NOT NULL COMMENT '',
  `description` TEXT NULL DEFAULT NULL COMMENT '',
  `dateIssued` DATE NULL DEFAULT NULL COMMENT '',
  `FCEDebitType` VARCHAR(50) NULL DEFAULT NULL COMMENT '',
  PRIMARY KEY (`FCEDebitID`)  COMMENT '',
  INDEX `regularStaffID` (`regularStaffID` ASC)  COMMENT '',
  CONSTRAINT `FCEDebit_ibfk_1`
    FOREIGN KEY (`regularStaffID`)
    REFERENCES `RegularStaff` (`regularStaffID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `LeaveCredit`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `LeaveCredit` ;

CREATE TABLE IF NOT EXISTS `LeaveCredit` (
  `leaveCreditID` INT(11) NOT NULL AUTO_INCREMENT COMMENT '',
  `regularStaffID` INT(11) NOT NULL COMMENT '',
  `amount` FLOAT NOT NULL COMMENT '',
  `description` TEXT NULL DEFAULT NULL COMMENT '',
  `dateIssued` DATE NULL DEFAULT NULL COMMENT '',
  `leaveCreditType` VARCHAR(50) NOT NULL COMMENT '',
  PRIMARY KEY (`leaveCreditID`)  COMMENT '',
  INDEX `regularStaffID` (`regularStaffID` ASC)  COMMENT '',
  CONSTRAINT `LeaveCredit_ibfk_1`
    FOREIGN KEY (`regularStaffID`)
    REFERENCES `RegularStaff` (`regularStaffID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `LeaveDebit`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `LeaveDebit` ;

CREATE TABLE IF NOT EXISTS `LeaveDebit` (
  `leaveDebitID` INT(11) NOT NULL AUTO_INCREMENT COMMENT '',
  `regularStaffID` INT(11) NOT NULL COMMENT '',
  `amount` FLOAT NOT NULL COMMENT '',
  `description` TEXT NULL DEFAULT NULL COMMENT '',
  `dateIssued` DATE NULL DEFAULT NULL COMMENT '',
  `leaveDebitType` VARCHAR(50) NOT NULL COMMENT '',
  PRIMARY KEY (`leaveDebitID`)  COMMENT '',
  INDEX `regularStaffID` (`regularStaffID` ASC)  COMMENT '',
  CONSTRAINT `LeaveDebit_ibfk_1`
    FOREIGN KEY (`regularStaffID`)
    REFERENCES `RegularStaff` (`regularStaffID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `LoadIncrease`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `LoadIncrease` ;

CREATE TABLE IF NOT EXISTS `LoadIncrease` (
  `loadIncreaseID` INT(11) NOT NULL AUTO_INCREMENT COMMENT '',
  `regularStaffID` INT(11) NOT NULL COMMENT '',
  `description` TEXT NULL DEFAULT NULL COMMENT '',
  `startDate` DATE NOT NULL COMMENT '',
  `endDate` DATE NOT NULL COMMENT '',
  `FCEValue` FLOAT NOT NULL DEFAULT '0.5' COMMENT '',
  PRIMARY KEY (`loadIncreaseID`)  COMMENT '',
  INDEX `regularStaffID` (`regularStaffID` ASC)  COMMENT '',
  CONSTRAINT `LoadIncrease_ibfk_1`
    FOREIGN KEY (`regularStaffID`)
    REFERENCES `RegularStaff` (`regularStaffID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `LoadReduction`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `LoadReduction` ;

CREATE TABLE IF NOT EXISTS `LoadReduction` (
  `loadReductionID` INT(11) NOT NULL AUTO_INCREMENT COMMENT '',
  `regularStaffID` INT(11) NOT NULL COMMENT '',
  `description` TEXT NULL DEFAULT NULL COMMENT '',
  `startDate` DATE NOT NULL COMMENT '',
  `endDate` DATE NOT NULL COMMENT '',
  `FCEValue` FLOAT NOT NULL DEFAULT '0.5' COMMENT '',
  PRIMARY KEY (`loadReductionID`)  COMMENT '',
  INDEX `regularStaffID` (`regularStaffID` ASC)  COMMENT '',
  CONSTRAINT `LoadReduction_ibfk_1`
    FOREIGN KEY (`regularStaffID`)
    REFERENCES `RegularStaff` (`regularStaffID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `RegularStaffEmployment`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `RegularStaffEmployment` ;

CREATE TABLE IF NOT EXISTS `RegularStaffEmployment` (
  `regularStaffID` INT(11) NOT NULL COMMENT '',
  `regularEmploymentID` INT(11) NOT NULL AUTO_INCREMENT COMMENT '',
  `startDate` DATE NOT NULL DEFAULT '2010-01-01' COMMENT '',
  `endDate` DATE NULL DEFAULT NULL COMMENT '',
  PRIMARY KEY (`regularEmploymentID`)  COMMENT '',
  INDEX `regularStaffID` (`regularStaffID` ASC)  COMMENT '',
  CONSTRAINT `RegularStaffEmployment_ibfk_1`
    FOREIGN KEY (`regularStaffID`)
    REFERENCES `RegularStaff` (`regularStaffID`))
ENGINE = InnoDB
AUTO_INCREMENT = 151
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `RegularStaff_Rank`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `RegularStaff_Rank` ;

CREATE TABLE IF NOT EXISTS `RegularStaff_Rank` (
  `regularStaffRankID` INT(11) NOT NULL AUTO_INCREMENT COMMENT '',
  `rankID` INT(11) NOT NULL COMMENT '',
  `regularStaffID` INT(11) NOT NULL COMMENT '',
  `startDate` DATE NOT NULL DEFAULT '2010-01-01' COMMENT '',
  `endDate` DATE NULL DEFAULT NULL COMMENT '',
  PRIMARY KEY (`regularStaffRankID`)  COMMENT '',
  INDEX `rankID` (`rankID` ASC)  COMMENT '',
  INDEX `regularStaffID` (`regularStaffID` ASC)  COMMENT '',
  CONSTRAINT `RegularStaff_Rank_ibfk_2`
    FOREIGN KEY (`regularStaffID`)
    REFERENCES `RegularStaff` (`regularStaffID`),
  CONSTRAINT `RegularStaff_Rank_ibfk_1`
    FOREIGN KEY (`rankID`)
    REFERENCES `Rank` (`rankID`))
ENGINE = InnoDB
AUTO_INCREMENT = 151
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `Research`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Research` ;

CREATE TABLE IF NOT EXISTS `Research` (
  `researchID` INT(11) NOT NULL AUTO_INCREMENT COMMENT '',
  `title` VARCHAR(50) NOT NULL COMMENT '',
  `abstract` TEXT NULL DEFAULT NULL COMMENT '',
  `startDate` DATE NOT NULL COMMENT '',
  `endDate` DATE NOT NULL COMMENT '',
  PRIMARY KEY (`researchID`)  COMMENT '')
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `RegularStaff_Research`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `RegularStaff_Research` ;

CREATE TABLE IF NOT EXISTS `RegularStaff_Research` (
  `regularStaffResearchID` INT(11) NOT NULL AUTO_INCREMENT COMMENT '',
  `researchID` INT(11) NOT NULL COMMENT '',
  `regularStaffID` INT(11) NOT NULL COMMENT '',
  `loadReductionID` INT(11) NULL DEFAULT NULL COMMENT '',
  `startDate` DATE NOT NULL COMMENT '',
  `endDate` DATE NULL DEFAULT NULL COMMENT '',
  PRIMARY KEY (`regularStaffResearchID`)  COMMENT '',
  INDEX `regularStaffID` (`regularStaffID` ASC)  COMMENT '',
  INDEX `researchID` (`researchID` ASC)  COMMENT '',
  INDEX `loadReductionID` (`loadReductionID` ASC)  COMMENT '',
  CONSTRAINT `RegularStaff_Research_ibfk_3`
    FOREIGN KEY (`loadReductionID`)
    REFERENCES `LoadReduction` (`loadReductionID`),
  CONSTRAINT `RegularStaff_Research_ibfk_1`
    FOREIGN KEY (`regularStaffID`)
    REFERENCES `RegularStaff` (`regularStaffID`),
  CONSTRAINT `RegularStaff_Research_ibfk_2`
    FOREIGN KEY (`researchID`)
    REFERENCES `Research` (`researchID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `ResearchGrant`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ResearchGrant` ;

CREATE TABLE IF NOT EXISTS `ResearchGrant` (
  `grantID` INT(11) NOT NULL AUTO_INCREMENT COMMENT '',
  `researchID` INT(11) NOT NULL COMMENT '',
  `grantingAgency` VARCHAR(50) NOT NULL COMMENT '',
  `dateAwarded` DATE NULL DEFAULT NULL COMMENT '',
  `duration` FLOAT(10,2) NULL DEFAULT NULL COMMENT '',
  `amount` FLOAT(10,2) NULL DEFAULT NULL COMMENT '',
  PRIMARY KEY (`grantID`)  COMMENT '',
  INDEX `researchID` (`researchID` ASC)  COMMENT '',
  CONSTRAINT `ResearchGrant_ibfk_1`
    FOREIGN KEY (`researchID`)
    REFERENCES `Research` (`researchID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `RightToRefusal`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `RightToRefusal` ;

CREATE TABLE IF NOT EXISTS `RightToRefusal` (
  `rightToRefusalID` INT(11) NOT NULL AUTO_INCREMENT COMMENT '',
  `sectionOfferedID` INT(11) NOT NULL COMMENT '',
  `contractStaffID` INT(11) NOT NULL COMMENT '',
  `startTerm` VARCHAR(10) NOT NULL COMMENT '',
  `endTerm` VARCHAR(10) NOT NULL COMMENT '',
  PRIMARY KEY (`rightToRefusalID`)  COMMENT '',
  INDEX `contractStaffID` (`contractStaffID` ASC)  COMMENT '',
  INDEX `sectionOfferedID` (`sectionOfferedID` ASC)  COMMENT '',
  CONSTRAINT `RightToRefusal_ibfk_2`
    FOREIGN KEY (`sectionOfferedID`)
    REFERENCES `Section_Offered` (`sectionOfferedID`),
  CONSTRAINT `RightToRefusal_ibfk_1`
    FOREIGN KEY (`contractStaffID`)
    REFERENCES `ContractStaff` (`contractStaffID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `StaffLeave`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `StaffLeave` ;

CREATE TABLE IF NOT EXISTS `StaffLeave` (
  `leaveID` INT(11) NOT NULL AUTO_INCREMENT COMMENT '',
  `regularStaffID` INT(11) NOT NULL COMMENT '',
  `leaveDebitID` INT(11) NOT NULL COMMENT '',
  `description` TEXT NOT NULL COMMENT '',
  `startDate` DATE NOT NULL COMMENT '',
  `endDate` DATE NOT NULL COMMENT '',
  `leavePercentage` FLOAT NOT NULL COMMENT '',
  `wagePercentage` FLOAT NOT NULL COMMENT '',
  PRIMARY KEY (`leaveID`)  COMMENT '',
  INDEX `regularStaffID` (`regularStaffID` ASC)  COMMENT '',
  INDEX `leaveDebitID` (`leaveDebitID` ASC)  COMMENT '',
  CONSTRAINT `StaffLeave_ibfk_2`
    FOREIGN KEY (`leaveDebitID`)
    REFERENCES `LeaveDebit` (`leaveDebitID`),
  CONSTRAINT `StaffLeave_ibfk_1`
    FOREIGN KEY (`regularStaffID`)
    REFERENCES `RegularStaff` (`regularStaffID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `TeachingActivities`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `TeachingActivities` ;

CREATE TABLE IF NOT EXISTS `TeachingActivities` (
  `teachingActivitiesID` INT(11) NOT NULL AUTO_INCREMENT COMMENT '',
  `academicStaffSectionID` INT(11) NOT NULL COMMENT '',
  `academicStaffID` INT(11) NOT NULL COMMENT '',
  `startDate` DATE NOT NULL DEFAULT '2015-09-05' COMMENT '',
  `endDate` DATE NOT NULL DEFAULT '2016-04-25' COMMENT '',
  `FCEValue` FLOAT NOT NULL DEFAULT '0.5' COMMENT '',
  PRIMARY KEY (`teachingActivitiesID`)  COMMENT '',
  INDEX `academicStaffID` (`academicStaffID` ASC)  COMMENT '',
  INDEX `academicStaffSectionID` (`academicStaffSectionID` ASC)  COMMENT '',
  CONSTRAINT `TeachingActivities_ibfk_2`
    FOREIGN KEY (`academicStaffSectionID`)
    REFERENCES `AcademicStaff_Section` (`academicStaffSectionID`),
  CONSTRAINT `TeachingActivities_ibfk_1`
    FOREIGN KEY (`academicStaffID`)
    REFERENCES `AcademicStaff` (`academicStaffID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;


#BEGIN INSERT INTO TABLE
#BEGIN INSERT INTO TABLE
INSERT INTO AcademicStaff (academicStaffID,firstName,lastName) VALUES (1,"Nasim","Slater"),(2,"Justin","Merritt"),(3,"Hadassah","Irwin"),(4,"Nicole","Brock"),(5,"Simone","Stephenson"),(6,"Aubrey","Farley"),(7,"Lance","Benton"),(8,"Macy","Davidson"),(9,"Athena","Buchanan"),(10,"Phoebe","Greene"),(11,"Arsenio","Chen"),(12,"Brennan","Thompson"),(13,"Ignacia","Faulkner"),(14,"Aquila","Kane"),(15,"Lydia","Zamora"),(16,"Regina","Montoya"),(17,"Malik","West"),(18,"Briar","Roach"),(19,"Daria","Davenport"),(20,"Hermione","Holman"),(21,"Nina","Valenzuela"),(22,"Autumn","Daniels"),(23,"Alisa","Park"),(24,"Brianna","Duke"),(25,"Tanner","Wong"),(26,"Cailin","Boone"),(27,"Aquila","Rowe"),(28,"Yolanda","Terry"),(29,"Elijah","Ratliff"),(30,"Leo","Diaz"),(31,"Mara","Hunter"),(32,"Vaughan","Benton"),(33,"Baxter","Schmidt"),(34,"Gage","Stanley"),(35,"Mufutau","Levy"),(36,"Randall","Brown"),(37,"Sonia","Cunningham"),(38,"Driscoll","Hatfield"),(39,"Thane","Oneil"),(40,"Ariana","Monroe"),(41,"Holmes","Hudson"),(42,"Ishmael","Kennedy"),(43,"Tara","Barry"),(44,"Noelle","Hoffman"),(45,"Plato","Sullivan"),(46,"Rina","Mcgowan"),(47,"Nolan","Petersen"),(48,"Benjamin","Klein"),(49,"Hadassah","Galloway"),(50,"Reed","Richmond");
INSERT INTO AcademicStaff (academicStaffID,firstName,lastName) VALUES (51,"Meghan","Kline"),(52,"Desirae","Finley"),(53,"Vernon","Sanchez"),(54,"Genevieve","Mcconnell"),(55,"Hedley","Klein"),(56,"Stone","Barrett"),(57,"Damon","Shelton"),(58,"Daquan","Stephens"),(59,"Kasper","Oneil"),(60,"Giselle","Diaz"),(61,"Roary","Baird"),(62,"Ishmael","Pena"),(63,"Hoyt","Marshall"),(64,"Wade","Trevino"),(65,"Malik","Mccullough"),(66,"Malik","Willis"),(67,"Avye","Fox"),(68,"Lenore","Espinoza"),(69,"Shad","Mcgowan"),(70,"Harriet","Carney"),(71,"Melyssa","Townsend"),(72,"Brock","Sandoval"),(73,"Michelle","Duke"),(74,"Garrett","Whitaker"),(75,"Cyrus","Silva"),(76,"August","Richardson"),(77,"Erin","Franks"),(78,"Emmanuel","Reeves"),(79,"Ursula","Little"),(80,"Wesley","Gonzales"),(81,"Isaac","Wells"),(82,"Rafael","Hodges"),(83,"Jared","Fox"),(84,"Ruth","Delaney"),(85,"Uma","Bray"),(86,"Regan","Castaneda"),(87,"Steel","Reid"),(88,"Zephania","Salinas"),(89,"Hu","Goff"),(90,"Natalie","Graves"),(91,"Hu","Davis"),(92,"James","Ford"),(93,"Hayley","Carr"),(94,"Yoshio","Curry"),(95,"Dalton","Norris"),(96,"Reese","Cantu"),(97,"Jayme","Sharp"),(98,"Lani","Nixon"),(99,"Griffith","Mcmahon"),(100,"Ariel","Cummings");
INSERT INTO AcademicStaff (academicStaffID,firstName,lastName) VALUES (101,"Jonas","Carpenter"),(102,"Moses","David"),(103,"Iola","Melton"),(104,"Olga","Mckenzie"),(105,"Reuben","Steele"),(106,"Brennan","Holder"),(107,"Ferris","Gould"),(108,"Medge","Maddox"),(109,"Marcia","Tran"),(110,"Kirby","Stafford"),(111,"Kathleen","Roach"),(112,"Mason","Hebert"),(113,"Jane","Armstrong"),(114,"Briar","Sherman"),(115,"Ciara","Bean"),(116,"Xanthus","Rutledge"),(117,"Aurelia","Pugh"),(118,"Davis","Oneil"),(119,"Paula","Franco"),(120,"Arden","Bailey"),(121,"Upton","Reeves"),(122,"Ivan","Vargas"),(123,"Jesse","Graves"),(124,"Shoshana","Floyd"),(125,"Hamish","Good"),(126,"Chastity","Parrish"),(127,"Athena","Downs"),(128,"Rafael","Guerrero"),(129,"Jada","Hoover"),(130,"Xerxes","Brown"),(131,"Quentin","Cardenas"),(132,"Stephen","Shelton"),(133,"Moana","Shelton"),(134,"Yoko","Mccormick"),(135,"Carolyn","Lester"),(136,"Arsenio","Wooten"),(137,"Venus","Dean"),(138,"Willow","Kline"),(139,"Tamara","Rojas"),(140,"Carl","Combs"),(141,"Wyatt","Riley"),(142,"Lawrence","Washington"),(143,"Reese","Lester"),(144,"Lee","Graham"),(145,"Urielle","Campos"),(146,"Ariel","Kelly"),(147,"Cheyenne","Avery"),(148,"Geraldine","Spencer"),(149,"Audrey","Brock"),(150,"Fitzgerald","Harvey");
INSERT INTO AcademicStaff (academicStaffID,firstName,lastName) VALUES (151,"Sybill","Talley"),(152,"Lars","Brown"),(153,"Leslie","Mayer"),(154,"Byron","Walker"),(155,"Wallace","Barber"),(156,"Jessica","Hunt"),(157,"Zenaida","Brewer"),(158,"Nathaniel","Nichols"),(159,"Charissa","Tate"),(160,"Jessica","Tucker"),(161,"Ulysses","Todd"),(162,"Axel","Flores"),(163,"Aiko","Calderon"),(164,"Josiah","Norris"),(165,"Kevyn","Morris"),(166,"Jamalia","Hurley"),(167,"Claudia","Davenport"),(168,"Jarrod","Hudson"),(169,"Nathan","Hurley"),(170,"Gabriel","Summers"),(171,"Carl","Sanchez"),(172,"Flavia","Coffey"),(173,"Kylie","Atkins"),(174,"Marcia","Spence"),(175,"Logan","Richards"),(176,"Tarik","Vinson"),(177,"Cherokee","Lambert"),(178,"Christian","Miles"),(179,"Fletcher","Roberson"),(180,"Blake","Dawson"),(181,"Tamara","Owens"),(182,"Gemma","Love"),(183,"Hyacinth","Mccarty"),(184,"Alika","Gray"),(185,"Kylynn","Daniels"),(186,"Adara","Moody"),(187,"Montana","Dunn"),(188,"Patrick","Tyson"),(189,"Dane","Barnett"),(190,"Charlotte","Cohen"),(191,"Kelly","Parks"),(192,"Eric","Cross"),(193,"Dieter","Ayala"),(194,"Igor","Burt"),(195,"Joel","Whitney"),(196,"Elvis","Fischer"),(197,"Althea","Joyner"),(198,"Xander","Delacruz"),(199,"Mari","Rodriquez"),(200,"Ivana","Swanson");
INSERT INTO Faculty (facultyID,title) VALUES (1, "Arts"),(2, "Business and Economics"),(3, "Education"),(4,"Graduate Studies"),(5, "Kinesiology and Applied Health"),(6, "Science");
INSERT INTO Department (departmentID,facultyID, departmentCode,title) VALUES (1,1,'CLAS','Classics'),(2,1,'CJ','Criminal Justice'),(3,1,'ENG','English'),(4,1,'HIST','History'),(5,1,'IS','Indigenous Studies'),(6,1,'MOD','Modern Languages and Literatures'),(7,1,'PHIL','Philosophy'),(8,1,'POL','Political Science'),(9,1,'PSYC','Psychology'),(10,1,'REL','Religion and Culture'),(11,1,'RHET','Rhetoric, Writing, and Communications'),(12,1,'SOC','Sociology'),(13,1,'THFM','Theatre and Film'),(14,1,'UIC','Urban and Inner-City Studies'),(15,1,'WGS','Women and Gender Studies'),(16,2,'ECONS','Economics'),(17,2,'BUS','Business and Administration'),(18,5,'ATHL','Athletics'),(19,5,'KIN','Kinesiology and Applied Health'),(20,6,'ANTHRO','Anthropology'),(21,6,'ACS','Applied Computer Science'),(22,6,'BIOANTHRO','BioAnthropology'),(23,6,'BIOCHEM','BioChemistry'),(24,6,'BIO','Biology'),(25,6,'BIOPSYC','Biopsychology'),(26,6,'CHEM','Chemistry'),(27,6,'STATS','Statistics'),(28,6,'ENV','Environmental Studies and Sciences'),(29,6,'GEO','Geography'),(30,6,'MAT','Mathematics'),(31,6,'PHYS','Physics');
INSERT INTO Rank (rankID,title) VALUES (1, "Instructor I"),(2, "Instructor II"),(3, "Instructor III"),(4, "Lecturer"),(5, "Assistant Professor"),(6, "Associate Professor"),(7,"Professor");
INSERT INTO AcademicStaff_Department (academicStaffDepartmentID,departmentID,academicStaffID) VALUES (1,23,1),(2,22,2),(3,26,3),(4,21,4),(5,25,5),(6,28,6),(7,24,7),(8,23,8),(9,25,9),(10,22,10),(11,25,11),(12,20,12),(13,25,13),(14,22,14),(15,21,15),(16,31,16),(17,25,17),(18,25,18),(19,23,19),(20,31,20),(21,21,21),(22,23,22),(23,29,23),(24,31,24),(25,27,25),(26,22,26),(27,31,27),(28,27,28),(29,27,29),(30,25,30),(31,27,31),(32,27,32),(33,25,33),(34,26,34),(35,21,35),(36,24,36),(37,23,37),(38,30,38),(39,26,39),(40,27,40),(41,20,41),(42,31,42),(43,25,43),(44,24,44),(45,23,45),(46,24,46),(47,23,47),(48,23,48),(49,31,49),(50,26,50);
INSERT INTO AcademicStaff_Department (academicStaffDepartmentID,departmentID,academicStaffID) VALUES (51,25,51),(52,30,52),(53,26,53),(54,24,54),(55,28,55),(56,22,56),(57,25,57),(58,21,58),(59,27,59),(60,20,60),(61,27,61),(62,31,62),(63,20,63),(64,30,64),(65,21,65),(66,27,66),(67,22,67),(68,20,68),(69,30,69),(70,24,70),(71,20,71),(72,20,72),(73,29,73),(74,31,74),(75,20,75),(76,23,76),(77,28,77),(78,31,78),(79,23,79),(80,30,80),(81,28,81),(82,23,82),(83,22,83),(84,26,84),(85,22,85),(86,31,86),(87,20,87),(88,23,88),(89,26,89),(90,21,90),(91,31,91),(92,27,92),(93,21,93),(94,25,94),(95,27,95),(96,23,96),(97,24,97),(98,31,98),(99,31,99),(100,20,100);
INSERT INTO AcademicStaff_Department (academicStaffDepartmentID,departmentID,academicStaffID) VALUES (101,25,101),(102,31,102),(103,28,103),(104,27,104),(105,26,105),(106,20,106),(107,21,107),(108,25,108),(109,21,109),(110,22,110),(111,26,111),(112,20,112),(113,31,113),(114,23,114),(115,28,115),(116,22,116),(117,22,117),(118,22,118),(119,22,119),(120,22,120),(121,23,121),(122,22,122),(123,27,123),(124,27,124),(125,22,125),(126,24,126),(127,27,127),(128,23,128),(129,27,129),(130,24,130),(131,24,131),(132,26,132),(133,31,133),(134,28,134),(135,27,135),(136,22,136),(137,25,137),(138,23,138),(139,22,139),(140,27,140),(141,27,141),(142,23,142),(143,28,143),(144,29,144),(145,24,145),(146,30,146),(147,26,147),(148,26,148),(149,22,149),(150,25,150);
INSERT INTO AcademicStaff_Department (academicStaffDepartmentID,departmentID,academicStaffID) VALUES (151,28,151),(152,27,152),(153,21,153),(154,20,154),(155,29,155),(156,24,156),(157,27,157),(158,30,158),(159,26,159),(160,24,160),(161,29,161),(162,27,162),(163,27,163),(164,24,164),(165,21,165),(166,21,166),(167,22,167),(168,28,168),(169,27,169),(170,27,170),(171,21,171),(172,29,172),(173,31,173),(174,20,174),(175,31,175),(176,24,176),(177,30,177),(178,26,178),(179,27,179),(180,30,180),(181,28,181),(182,23,182),(183,26,183),(184,30,184),(185,26,185),(186,20,186),(187,25,187),(188,26,188),(189,29,189),(190,20,190),(191,24,191),(192,20,192),(193,20,193),(194,24,194),(195,21,195),(196,22,196),(197,28,197),(198,20,198),(199,21,199),(200,21,200);
-- INSERT INTO Course (courseID,courseNo) VALUES (1,2678),(2,4339),(3,3718),(4,4461),(5,2340),(6,3288),(7,2155),(8,3328),(9,1811),(10,1121),(11,1975),(12,2041),(13,3978),(14,4966),(15,1042),(16,3403),(17,4958),(18,3221),(19,2708),(20,1422),(21,3527),(22,2729),(23,2494),(24,2727),(25,1451),(26,2561),(27,1578),(28,2456),(29,2096),(30,4954),(31,4872),(32,2147),(33,4457),(34,1834),(35,2467),(36,1634),(37,4741),(38,3689),(39,2417),(40,1337),(41,4865),(42,3438),(43,4011),(44,3247),(45,1423),(46,4930),(47,4769),(48,1826),(49,4641),(50,4401);
-- INSERT INTO Course (courseID,courseNo) VALUES (51,1593),(52,3869),(53,4137),(54,1803),(55,1396),(56,4780),(57,2153),(58,4693),(59,4104),(60,1225),(61,3717),(62,1483),(63,4711),(64,4927),(65,4288),(66,3046),(67,1291),(68,1520),(69,1448),(70,4646),(71,1279),(72,2491),(73,1376),(74,3134),(75,3547),(76,4231),(77,2070),(78,2515),(79,1935),(80,1012),(81,4595),(82,4993),(83,3802),(84,3528),(85,3900),(86,2373),(87,3647),(88,2663),(89,3141),(90,2395),(91,4720),(92,3600),(93,1145),(94,2098),(95,1114),(96,1329),(97,3982),(98,1205),(99,1487),(100,4817);
-- INSERT INTO Section (sectionID, sectionNo, title) VALUES (1,"001","Day Class I"),(2,"002","Day Class II"),(3,"003","Day Class III"),(4,"004","Day Class IV"),(5,"050","Evening Class I"),(6,"051","Evening Class II"),(7,"052","Evening Class III"),(8,"0053","Evening Class IV"),(9,"072L","Lab I"),(10,"073L","Lab II"),(11,"074L","Lab III"),(12,"750","Web Based VOD 1"),(13,"760","LMS Online");

INSERT INTO RegularStaff (regularStaffID,academicStaffID) VALUES (1,1),(2,2),(3,3),(4,4),(5,5),(6,6),(7,7),(8,8),(9,9),(10,10),(11,11),(12,12),(13,13),(14,14),(15,15),(16,16),(17,17),(18,18),(19,19),(20,20),(21,21),(22,22),(23,23),(24,24),(25,25),(26,26),(27,27),(28,28),(29,29),(30,30),(31,31),(32,32),(33,33),(34,34),(35,35),(36,36),(37,37),(38,38),(39,39),(40,40),(41,41),(42,42),(43,43),(44,44),(45,45),(46,46),(47,47),(48,48),(49,49),(50,50);
INSERT INTO RegularStaff (regularStaffID,academicStaffID) VALUES (51,51),(52,52),(53,53),(54,54),(55,55),(56,56),(57,57),(58,58),(59,59),(60,60),(61,61),(62,62),(63,63),(64,64),(65,65),(66,66),(67,67),(68,68),(69,69),(70,70),(71,71),(72,72),(73,73),(74,74),(75,75),(76,76),(77,77),(78,78),(79,79),(80,80),(81,81),(82,82),(83,83),(84,84),(85,85),(86,86),(87,87),(88,88),(89,89),(90,90),(91,91),(92,92),(93,93),(94,94),(95,95),(96,96),(97,97),(98,98),(99,99),(100,100);
INSERT INTO RegularStaff (regularStaffID,academicStaffID) VALUES (101,101),(102,102),(103,103),(104,104),(105,105),(106,106),(107,107),(108,108),(109,109),(110,110),(111,111),(112,112),(113,113),(114,114),(115,115),(116,116),(117,117),(118,118),(119,119),(120,120),(121,121),(122,122),(123,123),(124,124),(125,125),(126,126),(127,127),(128,128),(129,129),(130,130),(131,131),(132,132),(133,133),(134,134),(135,135),(136,136),(137,137),(138,138),(139,139),(140,140),(141,141),(142,142),(143,143),(144,144),(145,145),(146,146),(147,147),(148,148),(149,149),(150,150);
#All Start dates set to 2010-01-01.
INSERT INTO RegularStaffEmployment (regularEmploymentID, regularStaffID) VALUES (1,1),(2,2),(3,3),(4,4),(5,5),(6,6),(7,7),(8,8),(9,9),(10,10),(11,11),(12,12),(13,13),(14,14),(15,15),(16,16),(17,17),(18,18),(19,19),(20,20),(21,21),(22,22),(23,23),(24,24),(25,25),(26,26),(27,27),(28,28),(29,29),(30,30),(31,31),(32,32),(33,33),(34,34),(35,35),(36,36),(37,37),(38,38),(39,39),(40,40),(41,41),(42,42),(43,43),(44,44),(45,45),(46,46),(47,47),(48,48),(49,49),(50,50);
INSERT INTO RegularStaffEmployment (regularEmploymentID,regularStaffID) VALUES (51,51),(52,52),(53,53),(54,54),(55,55),(56,56),(57,57),(58,58),(59,59),(60,60),(61,61),(62,62),(63,63),(64,64),(65,65),(66,66),(67,67),(68,68),(69,69),(70,70),(71,71),(72,72),(73,73),(74,74),(75,75),(76,76),(77,77),(78,78),(79,79),(80,80),(81,81),(82,82),(83,83),(84,84),(85,85),(86,86),(87,87),(88,88),(89,89),(90,90),(91,91),(92,92),(93,93),(94,94),(95,95),(96,96),(97,97),(98,98),(99,99),(100,100);
INSERT INTO RegularStaffEmployment (regularEmploymentID,regularStaffID) VALUES (101,101),(102,102),(103,103),(104,104),(105,105),(106,106),(107,107),(108,108),(109,109),(110,110),(111,111),(112,112),(113,113),(114,114),(115,115),(116,116),(117,117),(118,118),(119,119),(120,120),(121,121),(122,122),(123,123),(124,124),(125,125),(126,126),(127,127),(128,128),(129,129),(130,130),(131,131),(132,132),(133,133),(134,134),(135,135),(136,136),(137,137),(138,138),(139,139),(140,140),(141,141),(142,142),(143,143),(144,144),(145,145),(146,146),(147,147),(148,148),(149,149),(150,150);

INSERT INTO ContractStaff (contractStaffID,academicStaffID) VALUES (1,151),(2,152),(3,153),(4,154),(5,155),(6,156),(7,157),(8,158),(9,159),(10,160),(11,161),(12,162),(13,163),(14,164),(15,165),(16,166),(17,167),(18,168),(19,169),(20,170),(21,171),(22,172),(23,173),(24,174),(25,175),(26,176),(27,177),(28,178),(29,179),(30,180),(31,181),(32,182),(33,183),(34,184),(35,185),(36,186),(37,187),(38,188),(39,189),(40,190),(41,191),(42,192),(43,193),(44,194),(45,195),(46,196),(47,197),(48,198),(49,199),(50,200);
INSERT INTO ContractStaffEmployment (contractEmploymentID,contractStaffID) VALUES (1,1),(2,2),(3,3),(4,4),(5,5),(6,6),(7,7),(8,8),(9,9),(10,10),(11,11),(12,12),(13,13),(14,14),(15,15),(16,16),(17,17),(18,18),(19,19),(20,20),(21,21),(22,22),(23,23),(24,24),(25,25),(26,26),(27,27),(28,28),(29,29),(30,30),(31,31),(32,32),(33,33),(34,34),(35,35),(36,36),(37,37),(38,38),(39,39),(40,40),(41,41),(42,42),(43,43),(44,44),(45,45),(46,46),(47,47),(48,48),(49,49),(50,50);

INSERT INTO RegularStaff_Rank (regularStaffRankID,rankID,regularStaffID) VALUES (1,2,1),(2,5,2),(3,7,3),(4,5,4),(5,4,5),(6,3,6),(7,3,7),(8,6,8),(9,5,9),(10,5,10),(11,2,11),(12,6,12),(13,1,13),(14,1,14),(15,7,15),(16,6,16),(17,3,17),(18,6,18),(19,6,19),(20,4,20),(21,7,21),(22,6,22),(23,5,23),(24,4,24),(25,2,25),(26,7,26),(27,3,27),(28,4,28),(29,2,29),(30,1,30),(31,4,31),(32,7,32),(33,5,33),(34,5,34),(35,2,35),(36,5,36),(37,1,37),(38,6,38),(39,3,39),(40,2,40),(41,5,41),(42,7,42),(43,2,43),(44,7,44),(45,2,45),(46,1,46),(47,7,47),(48,2,48),(49,7,49),(50,7,50);
INSERT INTO RegularStaff_Rank (regularStaffRankID,rankID,regularStaffID) VALUES (51,2,51),(52,4,52),(53,5,53),(54,6,54),(55,6,55),(56,5,56),(57,3,57),(58,4,58),(59,2,59),(60,5,60),(61,5,61),(62,3,62),(63,4,63),(64,5,64),(65,3,65),(66,4,66),(67,3,67),(68,1,68),(69,5,69),(70,7,70),(71,1,71),(72,6,72),(73,4,73),(74,1,74),(75,3,75),(76,2,76),(77,4,77),(78,1,78),(79,7,79),(80,1,80),(81,2,81),(82,2,82),(83,7,83),(84,6,84),(85,5,85),(86,4,86),(87,1,87),(88,6,88),(89,6,89),(90,6,90),(91,3,91),(92,4,92),(93,7,93),(94,3,94),(95,2,95),(96,6,96),(97,3,97),(98,5,98),(99,2,99),(100,4,100);
INSERT INTO RegularStaff_Rank (regularStaffRankID,rankID,regularStaffID) VALUES (101,6,101),(102,1,102),(103,4,103),(104,6,104),(105,2,105),(106,7,106),(107,2,107),(108,3,108),(109,3,109),(110,1,110),(111,7,111),(112,3,112),(113,6,113),(114,2,114),(115,4,115),(116,1,116),(117,6,117),(118,4,118),(119,2,119),(120,2,120),(121,2,121),(122,3,122),(123,4,123),(124,3,124),(125,4,125),(126,2,126),(127,1,127),(128,2,128),(129,3,129),(130,3,130),(131,4,131),(132,4,132),(133,4,133),(134,7,134),(135,3,135),(136,4,136),(137,2,137),(138,7,138),(139,3,139),(140,1,140),(141,5,141),(142,5,142),(143,4,143),(144,2,144),(145,3,145),(146,3,146),(147,6,147),(148,2,148),(149,4,149),(150,1,150);
INSERT INTO Chair (chairID,regularStaffID,departmentID) VALUES (1,37,23),(2,85,26),(3,67,30),(4,99,20),(5,113,27),(6,58,29),(7,103,24),(8,79,31),(9,74,21),(10,141,22),(11,45,25),(12,107,28)
