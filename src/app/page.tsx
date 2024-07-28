import HoldingsTable from "@/components/HoldingsTable";
import RecentlyViewedCoins from "@/components/RecentlyViewedCoins";
import SearchBar from "@/components/Searchbar";
import Link from "next/link";

export default async function Home() {

  console.log("serverside rendering");

  return (
    <main className="w-full h-screen grid md:grid-cols-2 place-items-center">
      <div>
        Mistakenly here bro, no worris get to the actual homepage as soon as possible
        at <Link href="/coins">Homepage</Link>
      </div>
     
    </main>
  );
}
