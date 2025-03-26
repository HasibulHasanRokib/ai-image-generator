"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center space-y-4">
      <h2 className="font-semibold text-2xl">Something went wrong!</h2>
      <Button className="bg-rose-500 hover:bg-rose-400" onClick={() => reset()}>
        Try again
      </Button>
    </div>
  );
}
