import { db } from "@/lib/db";
import { validateUsername } from "@/lib/user";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { username } = await request.json();

    const validation = validateUsername(username);
    if (!validation.isValid) {
      return NextResponse.json({ message: validation.error }, { status: 400 });
    }

    // Check if username already exists
    const existingUser = await db.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      // If user exists, just return success
      return NextResponse.json(existingUser);
    }

    // Create new user
    const newUser = await db.user.create({
      data: {
        username,
      },
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { message: "Failed to create user" },
      { status: 500 }
    );
  }
}
