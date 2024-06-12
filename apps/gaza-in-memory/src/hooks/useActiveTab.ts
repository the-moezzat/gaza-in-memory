import { usePathname } from "next/navigation";
import {appTabs} from "@/utils/appTabs";

export default function useActiveTab() {
  const pathname = usePathname();

  pathname.split("/").at(1);

  return appTabs.find((tab) => tab.relative === pathname.split("/").at(1));
}
