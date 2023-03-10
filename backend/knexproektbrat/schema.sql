DROP DATABASE IF EXISTS PasswordManager;
CREATE DATABASE PasswordManager CHARSET 'utf8';
USE PasswordManager;

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '0000';
flush privileges;

CREATE TABLE Users(
    Id INTEGER AUTO_INCREMENT PRIMARY KEY,
    Username VARCHAR(20) UNIQUE NOT NULL,
    RootPass VARCHAR(18) NOT NULL
);

CREATE TABLE Domains(
    Id INTEGER AUTO_INCREMENT PRIMARY KEY,
    DomainName VARCHAR(100) NOT NULL
);

CREATE TABLE Passwords(
    EntryId INTEGER AUTO_INCREMENT PRIMARY KEY,
    UserId INTEGER,
    DomainId INTEGER,
    Password VARCHAR(18) NOT NULL,
    
    FOREIGN KEY(UserId) REFERENCES Users(Id),
    FOREIGN KEY(DomainId) REFERENCES Domains(Id)
);

CREATE TABLE UserKeys(
    EntryId INTEGER AUTO_INCREMENT PRIMARY KEY,
    UserId INTEGER,
    AuthKey VARCHAR(20) NOT NULL,
    
    FOREIGN KEY(UserId) REFERENCES Users(Id)
);

#INSERT INTO Users(Id, Username, RootPass) VALUES(1, "Username", "Password");
#(2, "ZombieStrker", "MyPass")