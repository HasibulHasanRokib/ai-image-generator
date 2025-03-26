"use client";

import { useState } from "react";
import { DownloadButton } from "./download-btn";
import { AuthDialog } from "./auth-dialog";
import { Info } from "lucide-react";

export function GenerateImage({ image }: { image: string }) {
  const [error, setError] = useState("");
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  return (
    <div className="flex flex-col items-center space-y-5">
      <img src={image} alt="Generated Image" className="rounded shadow w-2xl" />
      <DownloadButton
        imageUrl={image}
        setError={setError}
        setShowAuthDialog={setShowAuthDialog}
      />
      {error && (
        <p className="text-destructive bg-destructive/10 p-3 rounded-md w-full text-center md:w-3xl flex items-center justify-center gap-x-2">
          <Info />
          {error}
        </p>
      )}
      <AuthDialog open={showAuthDialog} onOpenChange={setShowAuthDialog} />
    </div>
  );
}
