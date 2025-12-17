import { NavBar } from "@/components/Navbar/navBar";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4">
      <NavBar />
      <h1 className="text-2xl font-bold">Sprint Capacity Tracker</h1>
      <Link href="/dashboard">
        <button className="px-4 py-2 bg-blue-500 text-white rounded">
          Go to Dashboard
        </button>
      </Link>
    </main>
  );
}
