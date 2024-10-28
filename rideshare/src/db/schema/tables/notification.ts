import { boolean, pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";

export const notificationsDb = drizzle(sql);

// Define the table with id as a primary key and other fields including email
export const notifications_Table = pgTable("notifications", {
  id: serial("id").primaryKey(), // Primary key
  user: varchar("user", { length: 255 }).default("admin"),
  email: varchar("email", { length: 255 }), // New email column
  from: varchar("from", { length: 255 }),
  to: varchar("to", { length: 255 }),
  send: boolean("send").default(false),
  received: boolean("received").default(false), // Places as a string with a max length of 255 characters
});

export type InsertSaveData = typeof notifications_Table.$inferInsert;
export type SelectSaveData = typeof notifications_Table.$inferSelect;
