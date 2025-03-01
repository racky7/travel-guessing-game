import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type ChallengeFriendModalProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

const validateUsername = (
  username: string
): { isValid: boolean; error: string } => {
  if (!username.trim()) {
    return { isValid: false, error: "Username is required" };
  }

  // Check length (3-20 characters)
  if (username.length < 3 || username.length > 20) {
    return {
      isValid: false,
      error: "Username must be between 3 and 20 characters",
    };
  }

  // Only allow letters, numbers, underscores, and hyphens
  const validUsernameRegex = /^[a-zA-Z0-9_-]+$/;
  if (!validUsernameRegex.test(username)) {
    return {
      isValid: false,
      error: "Illegal characters not allowed",
    };
  }

  return { isValid: true, error: "" };
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
}: ChallengeFriendModalProps) {
  const [formState, setFormState] = useState(INITIAL_FORM_STATE);
  const [generatedLink, setGeneratedLink] = useState("");

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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

    const shareLink = `${window.location.origin}/challenge/${username}`;
    setGeneratedLink(shareLink);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">Challenge a Friend</DialogTitle>
        </DialogHeader>
        {generatedLink ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="generatedLink">Your Invite Link</Label>
              <Input
                id="generatedLink"
                value={generatedLink}
                readOnly
                className="bg-gray-100 truncate"
              />
            </div>
            <Button className="w-full bg-green-600 hover:bg-green-500">
              Share on Whatsapp
            </Button>
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
              className="w-full bg-green-600 hover:bg-green-500"
            >
              Generate Invite Link
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
