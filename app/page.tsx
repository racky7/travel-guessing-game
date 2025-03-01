import { Button } from "@/components/ui/button";
import { MapPin, Trophy, Users } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <main className="container mx-auto px-4 pb-12">
        <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-md rounded-xl p-8 shadow-lg">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-4">Hello, Travler!</h2>
            <p className="text-xl">
              Test your travel knowledge with cryptic clues about famous
              destinations around the world.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/20 p-6 rounded-lg text-center">
              <MapPin className="w-10 h-10 mx-auto mb-3" />
              <h3 className="text-xl font-semibold mb-2">Guess Destinations</h3>
              <p>Solve cryptic clues about famous places around the world</p>
            </div>

            <div className="bg-white/20 p-6 rounded-lg text-center">
              <Trophy className="w-10 h-10 mx-auto mb-3" />
              <h3 className="text-xl font-semibold mb-2">Earn Points</h3>
              <p>Track your score and discover fun facts about each location</p>
            </div>

            <div className="bg-white/20 p-6 rounded-lg text-center">
              <Users className="w-10 h-10 mx-auto mb-3" />
              <h3 className="text-xl font-semibold mb-2">Challenge Friends</h3>
              <p>Invite friends to beat your score and explore together</p>
            </div>
          </div>
          <div className="max-w-md mx-auto">
            <Link href="/play">
              <Button
                size="lg"
                className="w-full bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold"
              >
                Start your journey!
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
