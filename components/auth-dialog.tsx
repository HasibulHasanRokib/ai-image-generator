import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import Link from "next/link";

export function AuthDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex flex-col items-center space-y-8">
        <DialogHeader className="flex flex-col space-y-4 items-center justify-center">
          <DialogTitle className="font-bold text-2xl">
            Log in to continue
          </DialogTitle>
          <DialogDescription className="text-center">
            Your configuration will be saved! Please login or create an account
            to download your image.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Link href="/sign-in">
            <Button className="bg-rose-400 hover:bg-red-500">Log in</Button>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
