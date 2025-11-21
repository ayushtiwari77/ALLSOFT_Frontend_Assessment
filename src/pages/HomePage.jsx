import { useUserStore } from "../store/useUserStore";
import Navbar from "../components/Navbar";

const HomePage = () => {
  return (
    <main className="min-h-screen w-screen bg-blue-300">
      <Navbar />
    </main>
  );
};

export default HomePage;
