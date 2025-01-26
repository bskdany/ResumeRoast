import "./App.css";
import Luigi from "./pages/luigiAvatar/Luigi";
import { BrowserRouter, Route, Routes } from "react-router";
import UserFormPage from "./pages/userFormPage/UserFormPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/avatar" element={<Luigi />} />
          <Route path="/" element={<UserFormPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
