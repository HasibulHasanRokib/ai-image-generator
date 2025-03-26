import { Images } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { CurrentUser } from "@/lib/current-user";
import Link from "next/link";
import { Button } from "./ui/button";

export async function Navbar() {
  const user = await CurrentUser();
  return (
    <nav className="py-4 flex items-center justify-end px-6 md:px-20">
      {user ? (
        <div className="flex items-center space-x-4">
          <Link href={"/gallery"}>
            <Button className="bg-rose-500 hover:bg-rose-400">
              <Images />
              Gallery
            </Button>
          </Link>
          <UserButton />
        </div>
      ) : (
        <Link href={"/sign-in"}>
          <Button className="bg-rose-500 hover:bg-rose-400">Sign in</Button>
        </Link>
      )}
    </nav>
  );
}
