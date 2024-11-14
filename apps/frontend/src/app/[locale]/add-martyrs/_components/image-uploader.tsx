"use client";
import { UploadDropzone } from "@/utils/uploadthing";
import { toast } from "sonner";

function ImageUploader() {
  return (
    <UploadDropzone
      endpoint={"imageUploader"}
      className={"w-24"}
      onClientUploadComplete={(res) => {
        // Do something with the response
        console.log("Files: ", res);
        toast.success("Upload Completed");
      }}
      onUploadError={(error: Error) => {
        // Do something with the error.
        toast.error(`ERROR! ${error.message}`);
      }}
    />
  );
}

export default ImageUploader;
