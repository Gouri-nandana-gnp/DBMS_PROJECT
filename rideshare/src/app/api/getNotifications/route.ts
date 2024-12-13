// src/app/api/getNotifications/route.ts
import { NextResponse } from "next/server";
import {
  notificationsDb,
  notifications_Table,
} from "@/db/schema/tables/notification";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    // Fetch all notifications
    const notifications = await notificationsDb
      .select()
      .from(notifications_Table)
      .execute();

    if (notifications.length === 0) {
      return NextResponse.json(
        {
          message: "No notifications available",
        },
        { status: 200 }
      );
    }

    // Assuming notifications are sorted by id in ascending order
    let firstId = notifications[0].id;
    let lastId = notifications[notifications.length - 1].id;
    let idDifference = lastId - firstId;

    // Delete notifications until the id difference is 10 or less
    while (idDifference > 10 && notifications.length > 0) {
      // Delete the notification from the database
      await notificationsDb
        .delete(notifications_Table) // Pass the table to delete
        .where(eq(notifications_Table.id, firstId))
        .execute();

      // Remove the first notification from the array
      notifications.shift();

      // Recalculate the id difference
      if (notifications.length > 0) {
        firstId = notifications[0].id;
        lastId = notifications[notifications.length - 1].id;
        idDifference = lastId - firstId;
      }
    }

    console.log("Final ID difference:", idDifference);

    return NextResponse.json(
      {
        notifications,
        idDifference,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch notifications",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
