// src/app/api/sendNotification/route.ts
import { NextResponse } from "next/server";
import {
  notificationsDb,
  notifications_Table,
  InsertSaveData,
} from "@/db/schema/tables/notification";

export async function POST(request: Request) {
  try {
    // Parse JSON data from the request
    const notificationData: InsertSaveData = await request.json();
    console.log("Received notification data:", notificationData);

    // Extract data fields from the request body
    const {
      user,
      email,
      from,
      to,
      send = false,
      received = false,
    } = notificationData;

    if (!from || !to) {
      throw new Error("Missing required fields: 'from' and 'to'");
    }

    // Insert data into the notifications table
    const result = await notificationsDb
      .insert(notifications_Table)
      .values({
        user,
        from,
        email,
        to,
        send,
        received,
      })
      .returning({
        id: notifications_Table.id,
        user: notifications_Table.user,
        email: notifications_Table.email,
        from: notifications_Table.from,
        to: notifications_Table.to,
        send: notifications_Table.send,
        received: notifications_Table.received,
      });

    console.log("Insert operation result:", result);
    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    console.error("Error in POST request:", error);
    return NextResponse.json(
      {
        error: "Failed to create notification",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
