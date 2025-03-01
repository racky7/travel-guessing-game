import { useEffect, useState } from "react";
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

type ChallengeFriendModalProps = {
  username: string | null;
  open: boolean;
  setOpen: (value: boolean) => void;
  score: Score;
  onSubmit: (username: string) => void;
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
  username,
  open,
  setOpen,
  score,
  onSubmit,
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

  const generateLink = async (username: string) => {
    const response = await fetch(`/api/users/${username}/score`, {
      method: "POST",
      body: JSON.stringify({ score }),
    });
    const data = await response.json();
    const shareLink = `${window.location.origin}/challenge/${username}/${data.id}`;
    setGeneratedLink(shareLink);
  };

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

    onSubmit?.(username);
  };

  useEffect(() => {
    if (open && username) {
      generateLink(username);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, username]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">Challenge a Friend</DialogTitle>
        </DialogHeader>
        {username ? (
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
