// src/app/api/sendNotification/route.ts
import { NextResponse } from 'next/server';
import { pgTable, serial, varchar, boolean } from 'drizzle-orm/pg-core';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { createClient } from '@vercel/postgres';

// Define the schema directly here
const notifications = pgTable('notifications', {
  id: serial('id').primaryKey(),
  from: varchar('from', { length: 255 }),
  to: varchar('to', { length: 255 }),
  send: boolean('send').default(false),
  received: boolean('received').default(false),
});

export async function POST(req: Request) {
  console.log("Received a POST request to /api/sendNotification");

  try {
    const { from, to, send, received } = await req.json();
    console.log("Request Body:", { from, to, send, received });

    // Initialize the database connection
    const client = createClient();

    // Check connection status
    await client.connect(); // Add this line to establish the connection
    console.log("Connected to database successfully");

    const db = drizzle(client);

    // Insert the data into the database
    await db.insert(notifications).values({
      from,
      to,
      send,
      received,
    });

    return NextResponse.json({ message: 'Notification created successfully' }, { status: 200 });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ error: 'Error creating notification' }, { status: 500 });
  }
}
