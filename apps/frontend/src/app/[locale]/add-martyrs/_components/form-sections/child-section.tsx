import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar, CalendarX, Plus, Trash } from "lucide-react";
import { useChildStore } from "@/app/[locale]/add-martyrs/_store/childStore";
import AddChildForm from "./add-child";
import { useCurrentLocale } from "@/utils/useCurrentLocale";
import translator from "../../_glossary/translator";

const AddChildSection: React.FC = () => {
  const { children, removeChild } = useChildStore();
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const locale = useCurrentLocale();
  const t = translator(locale);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "alive":
        return "bg-green-500";
      case "dead":
        return "bg-red-500";
      case "wounded":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className={"flex flex-wrap gap-4"}>
      <div className={"contents"}>
        {children.map((child) => (
          <div
            key={child.id}
            className="flex items-center justify-between gap-8 rounded-xl border p-4"
          >
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-lg font-semibold">{child.name}</h4>
                <div className="flex items-center gap-1">
                  <span
                    className={`h-2 w-2 rounded-full ${getStatusColor(child.status)}`}
                  ></span>
                  <p className="text-sm text-gray-500">
                    {t[child.status as "alive" | "dead" | "wounded"]()}
                  </p>
                </div>
              </div>
              <div className={"flex gap-6"}>
                <p className="flex flex-col text-sm text-gray-600">
                  <span className={"text-sm text-gray-500"}>{t.age()}:</span>
                  <span>
                    {child.age} {t.yearsOld()}
                  </span>
                </p>
                {child.status === "dead" && child.dod && (
                  <p className="flex flex-col text-sm text-gray-600">
                    <span className={"text-sm text-gray-500"}>
                      {t.deathDate()}:
                    </span>
                    <span>{child.dod.toLocaleDateString()}</span>
                  </p>
                )}
              </div>
            </div>
            <Button
              type="button"
              variant="destructive"
              size="icon"
              onClick={() => removeChild(child)}
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button
            type="button"
            variant="outline"
            className="rounded-lg border-dashed px-24 py-8"
          >
            <Plus className="mr-2 h-4 w-4" /> {t.addChild()}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t.addNewChild()}</DialogTitle>
          </DialogHeader>
          <AddChildForm onCancel={() => setIsDialogOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddChildSection;
