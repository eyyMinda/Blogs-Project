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

export function AlertDialogComp({ children, onClickFunc, locale }: { children: any; onClickFunc: () => void; locale: AlertDialogLocaleType }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children ? children : <Button variant="ghost">{locale.trigger}</Button>}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{locale.title}</AlertDialogTitle>
          <AlertDialogDescription>{locale.description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{locale.cancel}</AlertDialogCancel>
          <AlertDialogAction onClick={onClickFunc}>{locale.action}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
