import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Globe } from "lucide-react";
import LanguageSwitcherContent from "./language-switcher-content";

export default function LanguageSwitcherDrawer() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon">
          <Globe size={18} />
        </Button>
      </DrawerTrigger>

      <DrawerContent className="px-4">
        <LanguageSwitcherContent />
      </DrawerContent>
    </Drawer>
  );
}
