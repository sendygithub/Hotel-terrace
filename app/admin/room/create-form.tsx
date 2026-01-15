"use client"
import { IoCloudUploadOutline, IoTrashOutline } from "react-icons/io5";
import { startTransition, useRef, useState, useTransition } from "react";
import Image from "next/image";
import { BarLoader } from "react-spinners";
import { type PutBlobResult } from "@vercel/blob";
import { Amenities } from "@/app/generated/prisma";



const CreateForm = ({amenities}:{amenities: Amenities[ ]}) => {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState("");
  const [message, setMessage] = useState("");
  const [pending, startTransition]= useTransition();

  const handleUpload = () => {
    if (!inputFileRef.current?.files) return null;
    const file = inputFileRef.current.files[0];
    const formData = new FormData();
    formData.set("file", file);
    startTransition(async () => {
      try {
        const response = await fetch("/api/upload",
          method : "PUT",
          body : formData,
        )
      }
      const data = await response.json();
      if (response.status !== 200) {
        setMessage(data.message);
      }
      const img = data as PutBlobResult;
      setImage(img.url);
    }catch (error) {
      console.log(error); 
      
    }
    )
  }

const deleteImage = (image: string) => {
  startTransition(async () => {
    try {
      await fetch(`/api/upload/?imageUrl=${image}`, {
        method: "DELETE",
      });
      setImage("");
    } catch (error) {
      console.log(error);
      

    }
  });
};
  return (
    <form action="">
      <div className="grid md:grid-cols-12 gap5">
        <div className="col-span-8 bg-white p-4">
          <div className="mb-4">
            <input
              type="text"
              name="name"
              className="py-2 px-4"
              rounded-sm
              border-gray-400
              w-full
              placeholder="room name..."
            />
            <div aria-live="polite" aria-atomic="true">
              <span className="text-sm text-red-500 mt-2"> message</span>
            </div>
          </div>
          <div className="mb-4">
            <textarea
              name="description"
              rows={8}
              className="py-2 px-4"
              rounded-sm
              border-gray-400
              w-full
              placeholder="Description"
            >
              {" "}
            </textarea>
            <div className="mb-4 md:grid-cols-3">
              <input
                type="checkboox"
                name="amenities"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
              />
              <label className="ms-2 text-sm font-medium text-gray-900 capitalize">
                Spa
              </label>
              <div aria-live="polite" aria-atomic="true">
                <span className="text-sm text-red-500 mt-2"> message</span>
              </div>
            </div>
            <div aria-live="polite" aria-atomic="true">
              <span className="text-sm text-red-500 mt-2"> message</span>
            </div>
          </div>
          <div className="col-span-4 bg-white p-4">
            <label
              htmlFor="input-file"
              className="flex flex-col mb-4 items-center justify-center aspect-video border-2 border-gray-300 border-dashed rounded-md cursor-pointer bg-gray-500 relative"
            >
              <div className="flex flex-col items-center justify-center text-gray-500 pt-5 pb-6 z-10">
                <div className="flex flex-col items-center justify-center">
                  <IoCloudUploadOutline className="size-8" />
                  <p className="mb-1 text-sm font-bold"> Select Image</p>
                  <p> SVG,PNG,JPG,GIF,or Other(max:4mb)</p>
                </div>
              </div>
              <input type="file" id="input-file" className="hidden" />
            </label>
            <div className="mb-4">
              <input
                type="text"
                name="capacity"
                className="py-2 px-4"
                rounded-sm
                border-gray-400
                w-full
                placeholder="capacity"
              />
              <div aria-live="polite" aria-atomic="true">
                <span className="text-sm text-red-500 mt-2"> message</span>
              </div>
            </div>
            <div className="mb-4">
              <input
                type="text"
                name="price"
                className="py-2 px-4"
                rounded-sm
                border-gray-400
                w-full
                placeholder="Price. . ."
              />
              <div aria-live="polite" aria-atomic="true">
                <span className="text-sm text-red-500 mt-2"> message</span>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="bg-orange-400 text-white w-full hover-orange-500 py-2.5 px-6 md:px-1 text-lg font-semibold cursor-pointer"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default CreateForm;
