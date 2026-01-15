"use server";

import { ContactSchema, RoomSchema } from "./zod";
import prisma from "./prisma";

/* =======================
   SAVE ROOM
======================= */
export async function saveRoom(
  image: string,
  prevState: unknown,
  formData: FormData
) {
  if (!image) {
    return { error: { image: ["Image is required"] } };
  }

  const rawData = {
    name: formData.get("name"),
    description: formData.get("description"),
    capacity: Number(formData.get("capacity")),
    price: Number(formData.get("price")),
    amenities: formData.getAll("amenities"),
  };

  const validatedFields = RoomSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, description, price, capacity, amenities } =
    validatedFields.data;

  try {
    await prisma.room.create({
      data: {
        name,
        description,
        image,
        price,
        capacity,
        RoomAmenities: {
          createMany: {
            data: amenities.map((item) => ({
              amenitiesId: item as string,
            })),
          },
        },
      },
    });

    return { message: "Room berhasil disimpan" };
  } catch (error) {
    console.error(error);
    return { error: { server: ["Gagal menyimpan data"] } };
  }
}

/* =======================
   CONTACT MESSAGE
======================= */
export async function ContactMessage(
  prevState: unknown,
  formData: FormData
) {
  const validatedFields = ContactSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, email, subject, message } = validatedFields.data;

  try {
    await prisma.contact.create({
      data: {
        name,
        email,
        subject,
        message,
      },
    });

    return { message: "Terima kasih sudah menghubungi kami" };
  } catch (error) {
    console.error(error);
    return { error: { server: ["Gagal mengirim pesan"] } };
  }
}
