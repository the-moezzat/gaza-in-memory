import { useCallback, useMemo } from "react";
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
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { toast } from "sonner";

const GallerySection = () => {
  const { control, setValue, watch } = useFormContext();
  const files: File[] = useMemo(
    () => watch("gallery") || [],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [watch("gallery")],
  );

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (files.length + acceptedFiles.length > 5) {
        toast.error("You can only upload a maximum of 5 images.");
        return;
      }
      setValue("gallery", [...files, ...acceptedFiles]);
    },
    [files, setValue],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 5,
    maxSize: 5 * 1024 * 1024, // 5MB limit per file
    onDropRejected: (rejectedFiles) => {
      if (
        rejectedFiles.some((file) => file.errors[0]?.code === "too-many-files")
      ) {
        toast.error("You can only upload a maximum of 5 images.");
      } else if (
        rejectedFiles.some((file) => file.errors[0]?.code === "file-too-large")
      ) {
        toast.error(
          "One or more files are too large. Maximum file size is 5MB.",
        );
      }
    },
    disabled: files.length >= 5, // Disable dropzone if 5 or more files
  });

  const removeImage = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setValue("gallery", newFiles);
  };

  return (
    <FormField
      control={control}
      name="gallery"
      render={({ field }) => (
        <FormItem className="space-y-4">
          {/* Preview Area */}
          {files.length > 0 && (
            <div className="relative w-full">
              <Carousel className="w-full overflow-hidden rounded-md">
                <CarouselContent className="-ml-2 md:-ml-4">
                  {files.map((file, index) => (
                    <CarouselItem
                      key={index}
                      className="basis-full pl-2 sm:basis-1/2 md:basis-1/3 md:pl-4 lg:basis-1/4"
                    >
                      <Card className="border-0 shadow-none">
                        <CardContent className="relative flex aspect-square items-center justify-center p-0">
                          <div className="relative h-full w-full">
                            <Image
                              src={URL.createObjectURL(file)}
                              alt={`Preview ${index + 1}`}
                              fill
                              className="rounded-md object-cover"
                            />
                          </div>
                          <Button
                            variant="destructive"
                            size="icon"
                            type={"button"}
                            className="absolute right-2 top-2 rounded-full"
                            onClick={() => removeImage(index)}
                          >
                            <X size={16} />
                          </Button>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-2" type="button" />
                <CarouselNext className="right-2" type="button" />
              </Carousel>
              <div className="absolute left-4 top-2 z-10 rounded bg-black bg-opacity-50 px-2 py-1 text-white">
                {files.length} image{files.length !== 1 ? "s" : ""}
              </div>
            </div>
          )}

          {/* Dropzone */}
          <div
            {...getRootProps()}
            className={`cursor-pointer rounded-md border border-dashed p-8 text-center ${
              isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
            } ${files.length >= 5 ? "cursor-not-allowed opacity-50" : ""}`}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <p>
                {files.length >= 5
                  ? "Maximum number of images reached (5)"
                  : `Drag and drop some files here, or click to select files (Limit: 5 images)`}
              </p>
            )}
          </div>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default GallerySection;
