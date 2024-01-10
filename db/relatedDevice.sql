use FreeluxDB;

CREATE TABLE relatedDevice (
    id int(11) NOT NULL AUTO_INCREMENT,
    deviceID int(11) NOT NULL,
    userID int(11) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (deviceID) REFERENCES device(id),
    FOREIGN KEY (userID) REFERENCES user(userId)

) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO relatedDevice (deviceID, userID) VALUES (1, 1);