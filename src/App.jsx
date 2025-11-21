import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import VerifyPage from "./pages/VerifyPage";
import HomePage from "./pages/HomePage";
import { useUserStore } from "./store/useUserStore";
import UploadPage from "./pages/UploadPage";
import AdminPage from "./pages/AdminPage";

const App = () => {
  const { token } = useUserStore();
  return (
    <Routes>
      <Route path="/login" element={token ? <HomePage /> : <LoginPage />} />
      <Route path="/verify" element={token ? <HomePage /> : <VerifyPage />} />
      <Route path="/" element={token ? <HomePage /> : <LoginPage />} />
      <Route path="/upload" element={token ? <UploadPage /> : <LoginPage />} />
      <Route path="/admin" element={token ? <AdminPage /> : <LoginPage />} />

      {/* page not found page */}
      <Route path="*" element={token ? <HomePage /> : <LoginPage />} />
    </Routes>
  );
};

export default App;
