import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';

// Define the table with id as a primary key and places as a varchar field
export const locations = pgTable('locations', {
  id: serial('id').primaryKey(),  // Primary key
  places: varchar('places', { length: 255 }),  // Places as a string with a max length of 255 characters
});
