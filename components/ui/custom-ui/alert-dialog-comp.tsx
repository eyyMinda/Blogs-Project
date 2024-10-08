import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { DeleteCommentLocale as locale } from "@/lib/locale/default-alerts";

export function AlertDialogComp({ children, onClickFunc }: { children: any; onClickFunc: () => void }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children ? children : <Button variant="ghost">{locale.button}</Button>}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{locale.title}</AlertDialogTitle>
          <AlertDialogDescription>{locale.description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onClickFunc}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
