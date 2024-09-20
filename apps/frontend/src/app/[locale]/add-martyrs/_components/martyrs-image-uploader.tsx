"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Camera, X } from "lucide-react";

function MartyrsImageUploader() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please select an image file.");
    }
  };

  const handleDeleteImage = () => {
    setSelectedImage(null);
    // Reset the file input
    const fileInput = document.getElementById(
      "martyrs-image",
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-72 h-72 rounded-full">
        <Image
          src={selectedImage || "/illustrations/placeholder-profile.svg"}
          alt={selectedImage ? "Selected image" : "Placeholder image"}
          fill
          className="object-cover rounded-full"
        />
      </div>
      <Input
        type="file"
        className="hidden"
        id="martyrs-image"
        accept="image/*"
        onChange={handleImageChange}
      />
      <div className={"flex items-center -translate-y-1/2 gap-2"}>
        <Button
          variant="outline"
          type="button"
          className="cursor-pointer drop-shadow-md rounded-xl outline-0 border-0 px-6 py-2"
          asChild
        >
          <label htmlFor="martyrs-image" className="flex items-center gap-2">
            <Camera size={20} fill="#000" stroke="#fff" strokeWidth={1.5} />
            <span>{selectedImage ? "Change" : "Add"}</span>
          </label>
        </Button>

        {selectedImage && (
          <Button
            variant="destructive"
            size="icon"
            className="rounded-xl"
            onClick={handleDeleteImage}
          >
            <X size={20} />
          </Button>
        )}
      </div>
    </div>
  );
}

export default MartyrsImageUploader;
