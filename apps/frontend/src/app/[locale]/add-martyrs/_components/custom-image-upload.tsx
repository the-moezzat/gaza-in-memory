import React, { useState, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";
import { useUploadThing } from "@/app/[locale]/add-martyrs/_hooks/useUploadThing";

interface CustomImageUploadProps {
  // onUploadComplete?: (res: UploadFileResponse[] | undefined) => void;
}

const CustomImageUpload: React.FC<CustomImageUploadProps> = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const { startUpload, isUploading } = useUploadThing("imageUploader");

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (preview) {
      const res = await startUpload([dataURItoFile(preview, "image.jpg")]);
      console.log(res);
      // if (onUploadComplete) {
      //     onUploadComplete(res);
      // }
    }
  };

  const dataURItoBlob = (dataURI: string): Blob => {
    const byteString = atob(dataURI.split(",")[1]);
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  };

  return (
    <div className="flex flex-col items-center">
      {preview ? (
        <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-4">
          <span className="text-4xl">J</span>
        </div>
      )}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        id="imageUpload"
      />
      <label htmlFor="imageUpload">
        <Button variant="outline" className="cursor-pointer">
          <Camera className="mr-2 h-4 w-4" /> Add
        </Button>
      </label>
      {preview && (
        <Button onClick={handleUpload} disabled={isUploading} className="mt-4">
          {isUploading ? "Uploading..." : "Upload"}
        </Button>
      )}
    </div>
  );
};

export default CustomImageUpload;

const dataURItoFile = (dataURI: string, filename: string): File => {
  const byteString = atob(dataURI.split(",")[1]);
  const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new File([ab], filename, {
    type: mimeString,
    lastModified: Date.now(),
  });
};
