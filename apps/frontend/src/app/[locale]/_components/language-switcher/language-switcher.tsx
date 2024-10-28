import LanguageSwitcherDialog from "./language-switcher-dialog";
import LanguageSwitcherDrawer from "./language-switcher-drawer";

export default function LanguageSwitcher() {
  return (
    <>
      <div className="hidden lg:block">
        <LanguageSwitcherDialog />
      </div>
      <div className="lg:hidden">
        <LanguageSwitcherDrawer />
      </div>
    </>
  );
}
