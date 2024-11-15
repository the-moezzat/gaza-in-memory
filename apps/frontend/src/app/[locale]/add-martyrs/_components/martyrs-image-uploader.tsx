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
import { toast } from "sonner";
import { useCurrentLocale } from "@/utils/useCurrentLocale";
import addMartyrTranslator from "../_glossary/translator";

function MartyrsImageUploader() {
  const { control, watch, setValue } = useFormContext();
  const profileImage = watch("profileImage");
  const locale = useCurrentLocale();
  const t = addMartyrTranslator(locale);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setValue("profileImage", file);
    } else {
      toast.error(t.pleaseSelectImageFile());
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
            <div className="relative aspect-square w-full max-w-48 rounded-full md:w-full md:max-w-72">
              <Image
                src={
                  profileImage
                    ? URL.createObjectURL(profileImage)
                    : "/illustrations/placeholder-profile.svg"
                }
                alt={profileImage ? t.selectedImage() : t.placeholderImage()}
                fill
                className="rounded-full object-cover"
              />
            </div>
            <Input
              type="file"
              className="hidden"
              id="martyrs-image"
              accept="image/*"
              onChange={handleImageChange}
            />
            <div className={"flex -translate-y-1/2 items-center gap-2"}>
              <Button
                variant="outline"
                type="button"
                className="cursor-pointer rounded-xl border-0 px-6 py-2 outline-0 drop-shadow-md"
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
                  <span>{profileImage ? t.changeImage() : t.addImage()}</span>
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
