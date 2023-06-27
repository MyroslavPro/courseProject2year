# DROP DATABASE IF EXISTS `alarm_system.db`;
CREATE DATABASE IF NOT EXISTS `alarm_system.db`;
USE `alarm_system.db`;

-- Drop all values from tables
DROP table IF exists power;
DROP table IF exists motion;
DROP table IF exists sound;
DROP table IF exists user;


-- Table user
CREATE TABLE user(
   id  INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
   name  VARCHAR(45) NOT NULL,
  UNIQUE INDEX name_UNIQUE (name))
ENGINE = InnoDB;


-- Table motion_spike   
CREATE TABLE motion(
   id  INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
   status  VARCHAR(45) NOT NULL, -- Spike detected, or stopped recording spike
   created_at  DATETIME DEFAULT current_timestamp , -- DEFAULT current_timestamp  NOT NULL
   user_id  INT ,
  INDEX  fk_motion_spike_user1_idx (user_id),
  CONSTRAINT  motion_spike_user1 
    FOREIGN KEY (user_id)
    REFERENCES   user (id) ON UPDATE CASCADE ON DELETE CASCADE)
ENGINE = InnoDB;

-- Table power status
CREATE TABLE power(
   id  INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
   power_status  BOOLEAN NOT NULL, -- On or off
   created_at DATETIME default current_timestamp not null,
   user_id  INT NOT NULL,
  INDEX  fk_power_user1_idx (user_id),
  CONSTRAINT  power_user1 
    FOREIGN KEY (user_id)
    REFERENCES   user (id) ON UPDATE CASCADE ON DELETE CASCADE)
ENGINE = InnoDB;

-- Table sound detecting
CREATE TABLE sound(
   id  INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
   value  INT NOT NULL, -- relational sound value/ % rounded
   created_at  DATETIME DEFAULT current_timestamp , -- DEFAULT current_timestamp  NOT NULL
   user_id  INT ,
  INDEX  fk_sound_user1_idx (user_id),
  CONSTRAINT  sound_user1 
    FOREIGN KEY (user_id)
    REFERENCES   user (id) ON UPDATE CASCADE ON DELETE CASCADE)
ENGINE = InnoDB;

INSERT INTO user(name) VALUES ('Jack'),('Bill');


select * from user;
select * from motion;
