'use client'

import { Room } from "@/app/generated/prisma";
import { updateRoom } from "../../actions";

interface EditRoomFormProps {
  room: Room
}

export default function EditRoomForm({ room }: EditRoomFormProps) {
  return (
    <div className="flex justify-center px-4 mt-50">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-sm border p-6">
        
        <h2 className="text-xl font-semibold mb-6">
          Edit Room
        </h2>

        <form action={updateRoom} className="space-y-6">
          <input type="hidden" name="id" value={room.id} />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left */}
            <div className="md:col-span-2 space-y-4">
                <label className="block text-sm font-medium text-gray-700">Room Name</label>
              <input
                type="text"
                name="name"
                defaultValue={room.name}
                placeholder="Room name"
                className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
              />

              <label className="block text-sm font-medium text-gray-700">Room Description</label>

              <textarea
                name="description"
                defaultValue={room.description}
                rows={5}
                placeholder="Description"
                className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
              />
            </div>

            {/* Right */}
            <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">Room Capacity</label>
              <input
                type="number"
                name="capacity"
                defaultValue={room.capacity}
                placeholder="Capacity"
                className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
              />
              <label className="block text-sm font-medium text-gray-700">Room Price</label>

              <input
                type="number"
                name="price"
                defaultValue={room.price}
                placeholder="Price"
                className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
              />
                
              <button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-md transition"
              >
                Update Room
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
