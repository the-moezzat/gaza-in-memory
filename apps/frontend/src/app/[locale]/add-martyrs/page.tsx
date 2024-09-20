import ImageUploader from "@/app/[locale]/add-martyrs/_components/image-uploader";
import { AddingForm } from "@/app/[locale]/add-martyrs/_components/adding-form";
import MartyrsImageUploader from "@/app/[locale]/add-martyrs/_components/martyrs-image-uploader";

export default function Page() {
  return (
    <div className="grid grid-cols-[12fr,22fr] gap-4 p-4">
      <div className="sticky top-4 self-start">
        <MartyrsImageUploader />
      </div>

      <AddingForm />
    </div>
  );
}
