import { Room } from "@/app/generated/prisma";
import React from "react";
import { BiPencil, BiTrash } from "react-icons/bi";

export default function RoomTable({ rooms }: { rooms: Room[] }) {

  interface Props {
    rooms: Room[];
  }
  return (
    <div className="bg-white p-4 mt-5 shadow-sm">
      <table className="w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 w-32 text-sm font bold text-gray-700 uppercase text-left"> Image</th>
            <th className="px-6 py-3 text-sm font bold text-gray-700 uppercase text-left">Room Name</th>
            <th className="px-6 py-3 text-sm font bold text-gray-700 uppercase text-left">Price</th>
            <th className="px-6 py-3 text-sm font bold text-gray-700 uppercase text-left">Room capacity</th>
            <th className="px-6 py-3 text-sm font bold text-gray-700 uppercase text-left">Created At</th>
            <th className="px-6 py-3 text-sm font bold text-gray-700 uppercase text-left">Action</th>
          </tr>
        </thead>


        <tbody className="diivide-y divide-gray-200">
          {rooms.map((room) => (
            <tr key={room.id} className="hover:bg-gray-100">
              <td className="px-6 py-4">{room.image}</td>
              <td className="px-6 py-4">{room.name}</td>
              <td className="px-6 py-4">{room.price.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}</td>
              <td className="px-6 py-4">{room.capacity} Persons</td>
              <td className="px-6 py-4">{room.createdAt.toLocaleDateString()}</td>
              
              <td className="px-6 py-4 flex">
                <button className="hover:bg-blue-700 text-blue-500 font-bold py-2 px-4 rounded">
                  <BiPencil size={20} />
                </button>
                <button className=" hover:bg-red-600 text-red-500 font-bold py-2 px-4 rounded ml-2">
                  <BiTrash size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

