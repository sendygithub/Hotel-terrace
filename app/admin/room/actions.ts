"use server"
import { revalidatePath } from "next/cache";
import prisma  from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function deleteRoom(id: string) {
  await prisma.room.delete({
    where: { id },
  });
  revalidatePath("/admin/room");
}


export async function updateRoom(formData: FormData) {
  const id = formData.get('id') as string
  const name = formData.get('name') as string
  const price = Number(formData.get('price'))

  await prisma.room.update({
    where: { id }, // ✅ STRING
    data: { name, price },
  })

  revalidatePath('/admin/room')
  redirect('/admin/room')
}