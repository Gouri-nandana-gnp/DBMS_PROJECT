// src/app/api/sendMessage/route.ts
import { NextResponse } from "next/server";
import {
  messageDb,
  message_Table,
  Insertmessage,
} from "@/db/schema/tables/message"; // Adjust the import according to your project structure

export async function POST(request: Request) {
  try {
    // Parse JSON data from the request
    const messageData: Insertmessage = await request.json();
    console.log("Received message data:", messageData);

    // Extract data fields from the request body
    const {
      user = "admin", // Default to 'admin' if not provided
      fromEmail,
      toEmail,
      send = false,
      received = false,
    } = messageData;

    // Validate required fields
    if (!fromEmail || !toEmail) {
      throw new Error("Missing required fields: 'fromEmail' and 'toEmail'");
    }

    // Insert data into the messages table
    const result = await messageDb
      .insert(message_Table)
      .values({
        user,
        fromEmail,
        toEmail,
        send,
        received,
      })
      .returning({
        id: message_Table.id,
        user: message_Table.user,
        fromEmail: message_Table.fromEmail,
        toEmail: message_Table.toEmail,
        send: message_Table.send,
        received: message_Table.received,
      });

    console.log("Insert operation result:", result);
    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    console.error("Error in POST request:", error);
    return NextResponse.json(
      {
        error: "Failed to create message",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
