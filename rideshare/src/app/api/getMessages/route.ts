// src/app/api/getMessages/route.ts
import { NextResponse } from "next/server";
import { messageDb, message_Table } from "@/db/schema/tables/message"; // Adjust the import according to your project structure
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    // Fetch all messages
    const messages = await messageDb.select().from(message_Table).execute();

    if (messages.length === 0) {
      return NextResponse.json(
        {
          message: "No messages available",
        },
        { status: 200 }
      );
    }

    // Assuming messages are sorted by id in ascending order
    let firstId = messages[0].id;
    let lastId = messages[messages.length - 1].id;
    let idDifference = lastId - firstId;

    // Delete messages until the id difference is 10 or less
    while (idDifference > 10 && messages.length > 0) {
      // Delete the message from the database
      await messageDb
        .delete(message_Table) // Pass the table to delete
        .where(eq(message_Table.id, firstId))
        .execute();

      // Remove the first message from the array
      messages.shift();

      // Recalculate the id difference
      if (messages.length > 0) {
        firstId = messages[0].id;
        lastId = messages[messages.length - 1].id;
        idDifference = lastId - firstId;
      }
    }

    console.log("Final ID difference:", idDifference);

    return NextResponse.json(
      {
        messages,
        idDifference,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch messages",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
