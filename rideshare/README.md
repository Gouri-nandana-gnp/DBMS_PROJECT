This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

Rideshare Platform for Students

Objective

To create a platform where students can hitchhike to nearby places at minimal or no cost.

Tools and Technologies

> > Database ORM\*: Drizzle ORM (Vercel PostgreSQL)

> > Deployment\*: Vercel

> > Frontend Framework\*: Next.js

> > Authentication and Storage\*: Firebase

Theory/Background

The project utilizes Drizzle ORM for database operations, which enables query-less interactions, enhancing simplicity and maintainability. By leveraging Drizzle’s integration with Vercel PostgreSQL, the platform can efficiently manage data while keeping operations streamlined.

Requirements Analysis

The rideshare platform has several key tables, with details provided below:

Schema for notifications

typescript

export const notifications_Table = pgTable("notifications", {

id: serial("id").primaryKey(),

user: varchar("user", { length: 255 }).default("admin"),

email: varchar("email", { length: 255 }),

from: varchar("from", { length: 255 }),

to: varchar("to", { length: 255 }),

send: boolean("send").default(false),

received: boolean("received").default(false),

});

Schema for messages

typescript

export const message_Table = pgTable("messages", {

id: serial("id").primaryKey(),

user: varchar("user", { length: 255 }).default("admin"),

fromEmail: varchar("fromEmail", { length: 255 }),

toEmail: varchar("toEmail", { length: 255 }),

send: boolean("send").default(false),

received: boolean("received").default(false),

});

These tables facilitate notifications and messaging within the platform, storing details such as sender and receiver emails, message statuses, and more.

Methodology/Implementation

to

To run u have  
1.git clone https://github.com/ft4bhi/DBMS_PROJECT.git
2.after open the folder in terminal //npm install//

3.npm run dev

4. u should have a .env file created and it should have the db security key

ER Diagram and Schema Design

SQL Queries Executed

This is a query less operation.we have apis for it like.

This for getting the message

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

This is for getting notification

// src/app/api/getNotifications/route.ts

import { NextResponse } from "next/server";

import {

notificationsDb,

notifications_Table,

} from "@/db/schema/tables/notification";

import { eq, lt } from "drizzle-orm";

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

This for sending message to db

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

This is for sending notification to db

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

Results and Output

We have succesfully get the output we coudl send the message succesfully

Conclusion

Version 1.0 of the platform has been launched, providing a stable base for students to coordinate rides. The system successfully manages notifications and messages between users, showing promising initial performance.

Future Scope/Enhancements

Future updates to the platform will include additional features, such as a chat feature for better user interaction. Additional updates will continue to refine and expand the platform’s functionality.
