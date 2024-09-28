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

const AddChildSection: React.FC = () => {
  const { children, removeChild } = useChildStore();
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

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
            className="p-4 border rounded-xl flex items-center justify-between gap-8 "
          >
            <div>
              <div className="flex gap-2 items-center">
                <h4 className="text-lg font-semibold">{child.name}</h4>
                <div className="flex items-center gap-1">
                  <span
                    className={`w-2 h-2 rounded-full ${getStatusColor(child.status)}`}
                  ></span>
                  <p className="text-sm text-gray-500">
                    {child.status.charAt(0).toUpperCase() +
                      child.status.slice(1)}
                  </p>
                </div>
              </div>
              <div className={"flex gap-6"}>
                <p className="text-gray-600 text-sm flex flex-col">
                  {/*<Calendar size={16} />*/}
                  <span className={"text-sm text-gray-500"}>Age:</span>
                  <span>{child.age} Years old</span>
                </p>
                {child.status === "dead" && child.dod && (
                  <p className="text-gray-600 text-sm flex flex-col">
                    {/*<CalendarX size={16} />*/}
                    <span className={"text-sm text-gray-500"}>Death date:</span>
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
            className="border-dashed py-8 px-24 rounded-lg"
          >
            <Plus className="mr-2 h-4 w-4" /> Add Child
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add a new Child</DialogTitle>
          </DialogHeader>
          <AddChildForm onCancel={() => setIsDialogOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddChildSection;
