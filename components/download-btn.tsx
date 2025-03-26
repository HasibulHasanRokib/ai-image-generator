import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { ArrowDownToLine } from "lucide-react";

interface DownloadButtonProps {
  imageUrl: string;
  setError: (error: string) => void;
  setShowAuthDialog: (show: boolean) => void;
}

export function DownloadButton({
  imageUrl,
  setError,
  setShowAuthDialog,
}: DownloadButtonProps) {
  const { isSignedIn } = useUser();

  const handleDownload = async () => {
    if (!isSignedIn) {
      setShowAuthDialog(true);
      return;
    }
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `generated-image-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError("Failed to download the image: " + err);
    }
  };

  return (
    <Button
      onClick={handleDownload}
      className="bg-rose-500 hover:bg-rose-300 mt-2 cursor-pointer"
    >
      <ArrowDownToLine />
      Download
    </Button>
  );
}
