
CREATE TABLE "Flight" (
	"id"	INTEGER NOT NULL,
	"num"	TEXT NOT NULL UNIQUE,
	"departure"	TEXT NOT NULL,
	"destination"	TEXT NOT NULL,
	"boardingDate"	TEXT NOT NULL,
	"boardingTime"	TEXT NOT NULL,
	"canceled" TEXT NOT NULL,
	PRIMARY KEY("id")
)

INSERT INTO Flight (num, departure, destination, boardingDate, boardingTime, canceled)

VALUES("AX6015", "Paris", "Madrid", "10/10/2021", "10:15",0),
("AX8026", "Zagreb", "London", "12/10/2021", "19:28",0),
("AX9584", "Berlin", "Dublin", "12/10/2021", "15:48",0)
