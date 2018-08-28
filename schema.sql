DROP DATABASE IF EXISTS mvp;

CREATE DATABASE mvp;

\c mvp;

CREATE TABLE IF NOT EXISTS pet (
  id SERIAL NOT NULL,
  name varchar(25) NOT NULL,
  gender char(1),
  birthdate varchar(10) NOT NULL,
  species varchar(25) NOT NULL,
  breed varchar(25) NOT NULL,
  weight int,
  microchipId varchar(30),
  PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS vaccinations (
id SERIAL NOT NULL,
petID int NOT NULL,
name varchar(20) NOT NULL,
frequency varchar (10) NOT NULL,
lastGiven varchar(10),
PRIMARY KEY(id),
FOREIGN KEY (petID) REFERENCES pet(id)
);

CREATE TABLE IF NOT EXISTS medications (
id SERIAL NOT NULL,
petID int NOT NULL, 
name varchar(20) NOT NULL,
use varchar(50) NOT NULL,
dosage varchar(15) NOT NULL,
frequency varchar(10) NOT NULL,
PRIMARY KEY(id),
FOREIGN KEY (petID) REFERENCES pet(id)
)

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/
