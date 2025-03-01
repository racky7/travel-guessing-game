import { Globe } from "lucide-react";
import Link from "next/link";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-500 to-blue-600 text-white">
      <header className="container mx-auto py-6 px-4">
        <Link href="/">
          <div className="flex items-center justify-center mb-8">
            <Globe className="w-10 h-10 mr-2" />
            <h1 className="text-3xl font-bold">Globetrotter Challenge</h1>
          </div>
        </Link>
      </header>
      {children}
    </div>
  );
}
