CREATE TABLE IF NOT EXISTS "notifications" (
	"id" serial PRIMARY KEY NOT NULL,
	"from" varchar(255),
	"to" varchar(255),
	"send" boolean DEFAULT false,
	"received" boolean DEFAULT false
);
