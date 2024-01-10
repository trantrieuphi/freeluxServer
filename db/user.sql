create schema FreeluxDB;
use FreeluxDB;

DROP TABLE IF EXISTS user;

CREATE TABLE user (
	-- id int(11) NOT NULL AUTO_INCREMENT,
	userId varchar(255) NOT NULL UNIQUE,
	firstName varchar(255) NOT NULL,
	lastName varchar(255) NOT NULL,
	email varchar(255) NOT NULL UNIQUE,
	role ENUM ("admin", "instructor", "user") DEFAULT "user",
	username varchar(255) NOT NULL UNIQUE,
	password varchar(255) NOT NULL,
	verifyCode varchar(255),
	isVerified BOOLEAN DEFAULT FALSE,
	PRIMARY KEY (userId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO user (userId, firstName, lastName, email, role, username, password, isVerified) VALUES ("adhjahd", "admin", "admin", "admin@gmail.com", "admin", "admin", "admin", TRUE);
