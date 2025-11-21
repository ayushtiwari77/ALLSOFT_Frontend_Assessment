import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import VerifyPage from "./pages/VerifyPage";
import HomePage from "./pages/HomePage";
import { useUserStore } from "./store/useUserStore";

const App = () => {
  const { token } = useUserStore();
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/verify" element={<VerifyPage />} />
      <Route path="/home" element={token ? <HomePage /> : <LoginPage />} />
    </Routes>
  );
};

export default App;
