"use client";
import { UploadDropzone } from "@/utils/uploadthing";

function ImageUploader() {
  return (
    <UploadDropzone
      endpoint={"imageUploader"}
      className={"w-24"}
      onClientUploadComplete={(res) => {
        // Do something with the response
        console.log("Files: ", res);
        alert("Upload Completed");
      }}
      onUploadError={(error: Error) => {
        // Do something with the error.
        alert(`ERROR! ${error.message}`);
      }}
    />
  );
}

export default ImageUploader;
