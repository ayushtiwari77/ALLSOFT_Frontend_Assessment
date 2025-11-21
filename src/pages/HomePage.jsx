import { useUserStore } from "../store/useUserStore";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";

const HomePage = () => {
  return (
    <main className="min-h-screen w-screen bg-blue-300">
      <Navbar />
      <div className="min-h-[70vh] p-2">
        <SearchBar />
      </div>
    </main>
  );
};

export default HomePage;
