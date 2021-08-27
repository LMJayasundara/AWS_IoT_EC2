CREATE DATABASE  IF NOT EXISTS `patient` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `patient`;

DROP TABLE IF EXISTS `weight`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `weight` (
  `id` INT(150) NOT NULL AUTO_INCREMENT,
  `ble_addr` VARCHAR(150) NOT NULL,
  `weight` FLOAT(7,4) NOT NULL,
  `time` INT(150) NOT NULL,
  `mac` VARCHAR(150) NOT NULL,
  `ip` VARCHAR(250) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

DROP TABLE IF EXISTS `oximeter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `oximeter` (
  `id` INT(150) NOT NULL AUTO_INCREMENT,
  `ble_addr` VARCHAR(150) NOT NULL,
  `spo2` INT NOT NULL,
  `pulse` INT NOT NULL,
  `time` INT(150) NOT NULL,
  `mac` VARCHAR(150) NOT NULL,
  `ip` VARCHAR(250) NOT NULL,
  PRIMARY KEY (`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

DROP TABLE IF EXISTS `watch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `watch` (
  `id` INT(150) NOT NULL AUTO_INCREMENT,
  `ble_addr` VARCHAR(150) NOT NULL,
  `hr` INT NOT NULL,
  `temp` FLOAT(7,4) NOT NULL,
  `time` INT(150) NOT NULL,
  `mac` VARCHAR(150) NOT NULL,
  `ip` VARCHAR(250) NOT NULL,
  PRIMARY KEY (`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

DROP TABLE IF EXISTS `bp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bp` (
  `id` INT(150) NOT NULL AUTO_INCREMENT,
  `ble_addr` VARCHAR(150) NOT NULL,
  `bp` INT NOT NULL,
  `pr` INT NOT NULL,
  `time` INT(150) NOT NULL,
  `mac` VARCHAR(150) NOT NULL,
  `ip` VARCHAR(250) NOT NULL,
  PRIMARY KEY (`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;
