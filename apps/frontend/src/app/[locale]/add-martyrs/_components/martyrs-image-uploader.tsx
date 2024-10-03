import React from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Camera, X } from "lucide-react";
import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

function MartyrsImageUploader() {
  const { control, watch, setValue } = useFormContext();
  const profileImage = watch("profileImage");

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setValue("profileImage", file);
    } else {
      alert("Please select an image file.");
    }
  };

  const handleDeleteImage = () => {
    setValue("profileImage", null);
    // Reset the file input
    const fileInput = document.getElementById(
      "martyrs-image",
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  return (
    <FormField
      control={control}
      name="profileImage"
      render={({ field }) => (
        <FormItem>
          <div className="flex flex-col items-center">
            <div className="relative w-72 h-72 rounded-full">
              <Image
                src={
                  profileImage
                    ? URL.createObjectURL(profileImage)
                    : "/illustrations/placeholder-profile.svg"
                }
                alt={profileImage ? "Selected image" : "Placeholder image"}
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
                <label
                  htmlFor="martyrs-image"
                  className="flex items-center gap-2"
                >
                  <Camera
                    size={20}
                    fill="#000"
                    stroke="#fff"
                    strokeWidth={1.5}
                  />
                  <span>{profileImage ? "Change" : "Add"}</span>
                </label>
              </Button>

              {profileImage && (
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
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default MartyrsImageUploader;
