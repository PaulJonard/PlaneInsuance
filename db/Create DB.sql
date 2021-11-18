

CREATE TABLE "Flight" (
	"id"	INTEGER NOT NULL,
	"num"	TEXT NOT NULL UNIQUE,
	"departure"	TEXT NOT NULL,
	"destination"	TEXT NOT NULL,
	"boardingDate"	TEXT NOT NULL,
	"boardingTime"	TEXT NOT NULL,
	"canceled" BOOLEAN NOT NULL,
	"price" INTEGER NOT NULL,
	PRIMARY KEY("id")
)

INSERT INTO Flight (num, departure, destination, boardingDate, boardingTime, canceled, price)

VALUES("AX6015", "Paris", "Madrid", "19/11/2021", "10:15",0,75),
("AX8026", "Zagreb", "Londres", "21/11/2021", "19:28",0,115),
("BR8970", "Lisbonne", "Dublin", "24/11/2021", "15:19",0,90),
("ZW4562", "Berlin", "Zagreb", "30/11/2021", "08:48",0,45),
("AM9584", "Madrid", "Paris", "02/12/2021", "10:00",0,37),
("GH9584", "Berlin", "Genève", "03/12/2021", "19:30",0,46),
("AX9584", "Stockholm", "Madrid", "05/12/2021", "20:20",0,179),
("LM9584", "Paris", "Dublin", "07/12/2021", "04:20",0,68)

