import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // sesuaikan path prisma client

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { name, description, image, price, capacity, amenities } = body;

    if (!name || !description || !price || !capacity) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Buat Room
    const room = await prisma.room.create({
      data: {
        name,
        description,
        image,
        price: Number(price),
        capacity: Number(capacity),
        RoomAmenities: {
          create: (amenities || []).map((id: string) => ({
            amenity: { connect: { id } },
          })),
        },
      },
    });

    return NextResponse.json(room);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create room" }, { status: 500 });
  }
}
