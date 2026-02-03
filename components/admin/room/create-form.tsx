'use client'

import { PutBlobResult } from '@vercel/blob'
import { useRef, useState, useTransition } from 'react'
import Image from 'next/image'
import { IoCloudUploadOutline, IoTrashOutline } from 'react-icons/io5'
import { BarLoader } from 'react-spinners'
import { Amenities } from '@/app/generated/prisma'

interface CreateFormProps {
  amenities: Amenities[]
}

const CreateForm = ({ amenities }: CreateFormProps) => {
  const inputFileRef = useRef<HTMLInputElement>(null)
  const [image, setImage] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  const [pending, startTransition] = useTransition()

  const handleUpload = () => {
    if (!inputFileRef.current?.files) return
    const file = inputFileRef.current.files[0]
    const formData = new FormData()
    formData.set('file', file)

    startTransition(async () => {
      try {
        const response = await fetch('/api/upload', {
          method: 'PUT',
          body: formData,
        })
        const data = await response.json()
        if (response.status !== 200) {
          setMessage(data.message)
          return
        }
        const img = data as PutBlobResult
        setImage(img.url)
      } catch (error) {
        console.error(error)
        setMessage('Upload failed')
      }
    })
  }

  const deleteImage = (image: string) => {
    startTransition(async () => {
      try {
        await fetch(`/api/upload/?imageUrl=${image}`, { method: 'DELETE' })
        setImage('')
      } catch (error) {
        console.error(error)
      }
    })
  }



 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const form = e.currentTarget;
  const formData = new FormData(form);

  const name = formData.get("name")?.toString() || "";
  const description = formData.get("description")?.toString() || "";
  const price = Number(formData.get("price"));
  const capacity = Number(formData.get("capacity"));
  const amenitiesSelected = formData.getAll("amenities") as string[];

  try {
    const res = await fetch("/api/rooms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        description,
        image,
        price,
        capacity,
        amenities: amenitiesSelected,
      }),
    });

    if (!res.ok) throw new Error("Failed to save room");

    // ✅ reset HTML form
    form.reset();

    // ✅ reset React state
    setImage("");

    // ✅ reset file input
    if (inputFileRef.current) {
      inputFileRef.current.value = "";
    }

    alert("Room created successfully!");
  } catch (error) {
    console.error(error);
    alert("Error creating room");
  }
};



  return (
    <form className="space-y-18 mt-10" onSubmit={handleSubmit}>
      {/* Room Name & Description */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <div>
            <input
              type="text"
              name="name"
              placeholder="Room Name"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
          <div>
            <textarea
              name="description"
              rows={5}
              placeholder="Description"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            ></textarea>
          </div>

          {/* Amenities */}
          <div>
            <h3 className="font-semibold mb-2 text-gray-700">Amenities</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {amenities.map((item) => (
                <label
                  key={item.id}
                  className="flex items-center space-x-2 border border-gray-200 rounded-md p-2 hover:bg-gray-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    name="Amenities"
                    value={item.id}
                    className="w-4 h-4 text-orange-500 border-gray-300 rounded"
                  />
                  <span className="text-gray-800 text-sm capitalize">
                    {item.name || 'Unnamed Amenity'}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Image & Details */}
        <div className="space-y-4">
          {/* Image Upload */}
          <div className="relative border border-dashed border-gray-300 rounded-md p-4 flex flex-col items-center justify-center">
            {pending && <BarLoader width={100} />}
            {image ? (
              <div className="relative w-full h-40">
                <Image
                  src={image}
                  alt="Room Image"
                  fill
                  className="object-cover rounded-md"
                />
                <button
                  type="button"
                  onClick={() => deleteImage(image)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                >
                  <IoTrashOutline />
                </button>
              </div>
            ) : (
              <div
                className="flex flex-col items-center justify-center cursor-pointer"
                onClick={() => inputFileRef.current?.click()}
              >
                <IoCloudUploadOutline className="text-4xl text-gray-400" />
                <p className="text-sm font-medium text-gray-600 mt-2">Select Image</p>
                <p className="text-xs text-gray-400 mt-1">
                  SVG, PNG, JPG, GIF (max 4MB)
                </p>
              </div>
            )}
            <input
              type="file"
              ref={inputFileRef}
              onChange={handleUpload}
              className="hidden"
            />
          </div>

          {/* Capacity */}
          <input
            type="number"
            name="capacity"
            placeholder="Capacity"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />

          {/* Price */}
          <input
            type="number"
            name="price"
            placeholder="Price"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />

          <button
            type="submit"
            className="w-full bg-orange-400 hover:bg-orange-500 text-white font-semibold py-2 rounded-md transition-colors"
          >
            Save Room
          </button>
        </div>
      </div>
    </form>
  )
}

export default CreateForm
