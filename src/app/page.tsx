import HoldingsTable from "@/components/HoldingsTable";
import RecentlyViewedCoins from "@/components/RecentlyViewedCoins";
import SearchBar from "@/components/Searchbar";

export default async function Home() {

  console.log("serverside rendering");

  return (
    <main className="w-full h-screen grid md:grid-cols-2 place-items-center">
      <SearchBar/>
     <HoldingsTable/>
     
    </main>
  );
}
