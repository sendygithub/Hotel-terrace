"use client";

import { IoCloudUploadOutline, IoTrashOutline } from "react-icons/io5";
import { useRef, useState, useTransition } from "react";
import Image from "next/image";
import { BarLoader } from "react-spinners";
import type { PutBlobResult } from "@vercel/blob";
import { Amenities } from "@/app/generated/prisma";

type Props = {
  amenities: Amenities[];
};

const CreateForm = ({ amenities }: Props) => {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  const handleUpload = () => {
    if (!inputFileRef.current?.files?.[0]) return;

    const formData = new FormData();
    formData.set("file", inputFileRef.current.files[0]);

    startTransition(async () => {
      try {
        const response = await fetch("/api/upload", {
          method: "PUT",
          body: formData,
        });

        const data = await response.json();

        if (!response.ok) {
          setMessage(data.message ?? "Upload failed");
          return;
        }

        const img = data as PutBlobResult;
        setImage(img.url);
        setMessage("");
      } catch (error) {
        console.error(error);
        setMessage("Upload error");
      }
    });
  };

  const deleteImage = (url: string) => {
    startTransition(async () => {
      try {
        await fetch(`/api/upload?imageUrl=${url}`, {
          method: "DELETE",
        });
        setImage("");
      } catch (error) {
        console.error(error);
      }
    });
  };

  return (
    <form className="grid md:grid-cols-12 gap-5">
      {/* LEFT */}
      <div className="col-span-8 bg-white p-4 space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Room name"
          className="w-full border border-gray-300 rounded-sm px-4 py-2"
        />

        <textarea
          name="description"
          rows={6}
          placeholder="Description"
          className="w-full border border-gray-300 rounded-sm px-4 py-2"
        />

        <div className="grid md:grid-cols-3 gap-3">
          {amenities.map((item) => (
            <label key={item.id} className="flex items-center gap-2">
              <input
                type="checkbox"
                name="amenities"
                value={item.id}
                className="w-4 h-4"
              />
              <span className="capitalize text-sm">{item.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* RIGHT */}
      <div className="col-span-4 bg-white p-4 space-y-4">
        <label
          htmlFor="input-file"
          className="relative flex items-center justify-center aspect-video border-2 border-dashed rounded-md cursor-pointer"
        >
          {isPending && <BarLoader />}

          {image ? (
            <>
              <button
                type="button"
                onClick={() => deleteImage(image)}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded"
              >
                <IoTrashOutline />
              </button>
              <Image
                src={image}
                alt="preview"
                fill
                className="object-cover rounded-md"
              />
            </>
          ) : (
            <div className="flex flex-col items-center text-gray-500">
              <IoCloudUploadOutline className="text-3xl" />
              <p className="text-sm font-semibold">Select Image</p>
              <p className="text-xs">PNG, JPG, SVG (max 4MB)</p>
            </div>
          )}

          <input
            ref={inputFileRef}
            id="input-file"
            type="file"
            hidden
            onChange={handleUpload}
          />
        </label>

        {message && <p className="text-sm text-red-500">{message}</p>}

        <input
          type="number"
          name="capacity"
          placeholder="Capacity"
          className="w-full border border-gray-300 rounded-sm px-4 py-2"
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          className="w-full border border-gray-300 rounded-sm px-4 py-2"
        />

        <button
          type="submit"
          className="w-full bg-orange-400 hover:bg-orange-500 text-white py-2 font-semibold rounded"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default CreateForm;
