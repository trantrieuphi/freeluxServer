use FreeluxDB;
CREATE TABLE device (
    id int(11) NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    macAddress varchar(255) NOT NULL UNIQUE,
    clientID varchar(255) NOT NULL UNIQUE,
    pairingCode varchar(255) NOT NULL UNIQUE,
    deviceType ENUM ("gateway", "device") DEFAULT "device",
    connectionCounter int(11) NOT NULL DEFAULT 0,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO device (name, macAddress, clientID, pairingCode, deviceType) VALUES ("gateway1", "00:00:00:00:00:00", "gatewaadhjahfhy", "000000", "gateway");
