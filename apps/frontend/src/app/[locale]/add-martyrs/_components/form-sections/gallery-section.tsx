import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

const GallerySection = () => {
  const { control, setValue } = useFormContext();
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
      setValue("gallery", [...files, ...acceptedFiles]);
    },
    [files, setValue],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
  });

  return (
    <FormField
      control={control}
      name="gallery"
      render={({ field }) => (
        <FormItem className="space-y-4">
          {/* Preview Area */}
          {files.length > 0 && (
            <div className="relative w-full">
              <Carousel className="w-full">
                <CarouselContent className="-ml-2 md:-ml-4">
                  {files.map((file, index) => (
                    <CarouselItem
                      key={index}
                      className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                    >
                      <Card className="border-0 shadow-none">
                        <CardContent className="flex aspect-square items-center justify-center p-0">
                          <div className="relative h-full w-full">
                            <Image
                              src={URL.createObjectURL(file)}
                              alt={`Preview ${index + 1}`}
                              fill
                              className="object-cover rounded-md"
                            />
                          </div>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-2" />
                <CarouselNext className="right-2" />
              </Carousel>
              <div className="absolute top-2 right-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded z-10">
                {files.length} image{files.length !== 1 ? "s" : ""}
              </div>
            </div>
          )}

          {/* Dropzone */}
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-md p-8 text-center cursor-pointer ${
              isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
            }`}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <p>Drag and drop some files here, or click to select files</p>
            )}
          </div>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default GallerySection;
