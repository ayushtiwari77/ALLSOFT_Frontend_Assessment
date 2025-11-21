import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import VerifyPage from "./pages/VerifyPage";
import HomePage from "./pages/HomePage";
import { useUserStore } from "./store/useUserStore";

const App = () => {
  const { token } = useUserStore();
  return (
    <Routes>
      <Route path="/login" element={token ? <HomePage /> : <LoginPage />} />
      <Route path="/verify" element={token ? <HomePage /> : <VerifyPage />} />
      <Route path="/" element={token ? <HomePage /> : <LoginPage />} />

      {/* page not found page */}
    </Routes>
  );
};

export default App;
