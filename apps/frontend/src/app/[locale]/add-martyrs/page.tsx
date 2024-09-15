import ImageUploader from "@/app/[locale]/add-martyrs/_components/image-uploader";
import { AddingForm } from "@/app/[locale]/add-martyrs/_components/adding-form";

export default function Page() {
  return (
    <div className="grid grid-cols-[12fr,22fr] gap-4 p-4">
      {/*<CustomImageUpload />*/}
      <div className={""}>
        <ImageUploader />
      </div>

      <AddingForm />
    </div>
  );
}
