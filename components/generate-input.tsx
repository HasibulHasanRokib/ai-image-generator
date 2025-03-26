"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Info, Loader2, Sparkles, X } from "lucide-react";
import { AuthDialog } from "./auth-dialog";

import { DownloadButton } from "./download-btn";

export default function GenerateInput() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showAuthDialog, setShowAuthDialog] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      if (response.ok) {
        setImageUrl(data.image);
      } else {
        setError(data.error);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="w-full max-w-3xl bg-white rounded-lg mb-4  overflow-hidden  border shadow items-center px-3">
        <form onSubmit={handleSubmit} className="flex p-2">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your prompt..."
            className="flex-1 outline-none"
            disabled={isLoading}
          />
          <Button
            className="bg-rose-500 hover:bg-rose-300"
            type="submit"
            disabled={isLoading || !prompt}
          >
            <Sparkles />
            {isLoading ? <Loader2 className="animate-spin" /> : "Generate"}
          </Button>
        </form>
      </div>
      {error && (
        <p className="text-destructive bg-destructive/10 p-3 rounded-md w-full text-center md:w-3xl flex items-center justify-center gap-x-2">
          <Info />
          {error}
        </p>
      )}

      {imageUrl && (
        <div className="mt-4 shadow  relative  group">
          <img
            src={imageUrl}
            alt="Generated image"
            className="md:w-2xl h-auto rounded"
            loading="lazy"
          />
          <button
            type="button"
            onClick={() => {
              setImageUrl("");
              setPrompt("");
            }}
            className="absolute hidden group-hover:block bg-destructive p-1 rounded-full top-2 right-2 text-white cursor-pointer shadow"
          >
            <X />
          </button>
        </div>
      )}
      {imageUrl && (
        <DownloadButton
          imageUrl={imageUrl}
          setError={setError}
          setShowAuthDialog={setShowAuthDialog}
        />
      )}
      <AuthDialog open={showAuthDialog} onOpenChange={setShowAuthDialog} />
    </>
  );
}
