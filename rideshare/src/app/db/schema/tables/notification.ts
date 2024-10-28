import { boolean, pgTable, serial, varchar } from 'drizzle-orm/pg-core';

// Define the table with id as a primary key and places as a varchar field
export const notifications = pgTable('notifications', {
  id: serial('id').primaryKey(),  // Primary key
  from: varchar('from', { length: 255 }),
  to: varchar('to', { length: 255 }),
  send: boolean('send',).default(false),
  received: boolean('received',).default(false),  // Places as a string with a max length of 255 characters
});
