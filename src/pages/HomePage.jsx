import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import DocumentDisplay from "../components/DocumentDisplay";

const HomePage = () => {
  return (
    <main className=" w-screen bg-blue-300">
      <Navbar />
      <div className="min-h-[70vh] w-full flex flex-col gap-5 items-center ">
        <SearchBar />
        <DocumentDisplay />
      </div>
    </main>
  );
};

export default HomePage;
