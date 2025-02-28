import { Button } from "@/components/ui/button";
import { Share2, Trophy } from "lucide-react";

export default function GamePage() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 flex items-center gap-2">
          <Trophy className="h-5 w-5 text-white" />
          <span className="font-semibold">Score: 7 / 10</span>
        </div>
        <Button
          variant="ghost"
          className="bg-blue-600 hover:bg-blue-500 text-white hover:text-white"
        >
          <Share2 className="h-4 w-4 mr-2" />
          Challenge a Friend
        </Button>
      </div>
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 shadow-lg">
        <div>Game Page</div>
      </div>
    </div>
  );
}
