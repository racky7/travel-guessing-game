import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { validateUsername } from "@/lib/user";
import { Score } from "@/lib/destination";
import html2canvas from "html2canvas-pro";
import ImagePreview from "./image-preview";
import Link from "next/link";

type ChallengeFriendModalProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
  score: Score;
};

const INITIAL_FORM_STATE = {
  values: {
    username: "",
  },
  errors: {
    username: "",
  },
};

export default function ChallengeFriendModal({
  open,
  setOpen,
  score,
}: ChallengeFriendModalProps) {
  const [username, setUsername] = useState<string | null>(null);
  const [formState, setFormState] = useState(INITIAL_FORM_STATE);
  const [isLoading, setIsLoading] = useState(false);
  const [generatedLink, setGeneratedLink] = useState("");
  const lastScoreRef = useRef<Score | null>(null);

  const imagePreviewRef = useRef<HTMLIFrameElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        [name]: value,
      },
      errors: {
        ...prev.errors,
        [name]: "", // Clear previous errors when typing
      },
    }));
  };

  const generateLink = useCallback(async () => {
    if (!username || !open) return; // Ensure modal is open before triggering
    if (lastScoreRef.current === score) return; // Prevent duplicate requests

    try {
      setIsLoading(true);
      const response = await fetch(`/api/users/${username}/score`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ score }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate invite link");
      }

      const data = await response.json();
      setGeneratedLink(`${window.location.origin}/challenge?score=${data.id}`);
      lastScoreRef.current = score;
    } catch (error) {
      console.error("Error generating link:", error);
    } finally {
      setIsLoading(false);
    }
  }, [username, score, open]);

  useEffect(() => {
    generateLink();
  }, [open, score, generateLink]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { username } = formState.values;
    const validation = validateUsername(username);

    if (!validation.isValid) {
      setFormState((prev) => ({
        ...prev,
        errors: { ...prev.errors, username: validation.error },
      }));
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify({ username }),
      });
      const data = await response.json();

      if (!response.ok) {
        setFormState((prev) => ({
          ...prev,
          errors: { ...prev.errors, username: data?.error ?? "" },
        }));
      }
      setUsername(data.username);
    } catch (error) {
      console.error("Error creating user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const donwloadImage = async () => {
    if (imagePreviewRef.current) {
      try {
        const canvas = await html2canvas(imagePreviewRef.current);
        console.log("canvas", canvas);
        const image = canvas.toDataURL("image/png");
        console.log("image", image);

        // Create a temporary link element
        const link = document.createElement("a");
        link.href = image;
        link.download = "downloaded-image.png"; // Set the filename
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (err) {
        console.error("html2canvas error:", err);
      }
    }
  };

  const getWhatsappShareLink = () => {
    if (!generatedLink) return "";
    const message = `Hey, challenge me on this game! Click here: ${generatedLink}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    return whatsappUrl;
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">Challenge a Friend</DialogTitle>
        </DialogHeader>
        {username && true ? (
          <div className="space-y-4">
            <div className="relative flex flex-col justify-center items-center gap-2">
              <div
                className="pointer-events-none select-none"
                style={{ width: "80%", height: "auto" }}
                ref={imagePreviewRef}
              >
                <ImagePreview username={username!} score={score} />
              </div>
              <Button
                className="mx-auto bg-purple-600 hover:bg-purple-500"
                onClick={donwloadImage}
              >
                Download Image
              </Button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="generatedLink">Your Invite Link</Label>
              <Input
                id="generatedLink"
                value={generatedLink}
                readOnly
                className="bg-gray-100 truncate"
              />
            </div>

            <Link href={getWhatsappShareLink()} target="_blank">
              <Button className="w-full bg-green-600 hover:bg-green-500">
                Share on Whatsapp
              </Button>
            </Link>
          </div>
        ) : (
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="username">Enter your username</Label>
              <Input
                name="username"
                value={formState.values.username}
                onChange={handleInputChange}
              />
              {formState.errors.username && (
                <p className="text-red-500 text-sm">
                  {formState.errors.username}
                </p>
              )}
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-600 hover:bg-green-500"
            >
              {isLoading ? "Please wait..." : "Generate Invite Link"}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
