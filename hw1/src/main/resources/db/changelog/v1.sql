--liquibase formatted sql

--changeset desistoeva:1
CREATE TABLE NOTES (
    id numeric not null primary key,
    userid numeric not null,
    title varchar(50) not null,
    description varchar(1000) not null,
    creationdate timestamp,
    notificationdate timestamp,
    todolistid numeric
);