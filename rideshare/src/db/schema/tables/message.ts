import { boolean, pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";

export const messageDb = drizzle(sql);

// Define the table with id as a primary key and other fields including email
export const message_Table = pgTable("messages", {
  id: serial("id").primaryKey(), // Primary key
  user: varchar("user", { length: 255 }).default("admin"),
  fromEmail: varchar("fromEmail", { length: 255 }), // New email column
  toEmail: varchar("toEmail", { length: 255 }),
  send: boolean("send").default(false),
  received: boolean("received").default(false), // Places as a string with a max length of 255 characters
});

export type Insertmessage = typeof message_Table.$inferInsert;
export type Selectmessage = typeof message_Table.$inferSelect;
