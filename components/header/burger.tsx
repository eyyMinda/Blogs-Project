import { Menu } from "lucide-react";
import { Button } from "../ui/button";

export default function BurgerMenu({ setBurgerOpen }: { setBurgerOpen: React.Dispatch<React.SetStateAction<Boolean>> }) {
  return (
    <Button
      title="BurgerMenu"
      type="button"
      className="text-gray-700 outline-none p-2 rounded-md border-white focus:border-gray-600 focus:border bg-white focus:bg-white hover:bg-white"
      onClick={() => setBurgerOpen((b: Boolean) => !b)}>
      <Menu />
    </Button>
  );
}
