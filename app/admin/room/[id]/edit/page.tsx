import prisma  from "@/lib/prisma";
import EditRoomForm from "./edit-form";

export default async function EditRoomPage({
  params,
}: {
  params: { id: string };
}) {
  const room = await prisma.room.findUnique({
    where: { id: params.id }, // ✅ STRING
  });

  if (!room) {
    return <div>Room not found</div>;
  }

  return <EditRoomForm room={room} />;
}
