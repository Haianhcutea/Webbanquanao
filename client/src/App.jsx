import { Route, Routes } from "react-router-dom";
import AuthLayouts from "./components/layouts/AuthLayouts";
import Login from "./components/auth/login";
import Home from "./components/home";
import MainLayouts from "./components/layouts/MainLayouts";

function App() {
  return (
    <Routes>
      <Route path="/auth" element={<AuthLayouts />}>
        <Route path="login" element={<Login />}></Route>
      </Route>
      <Route path="/" element={<MainLayouts />}>
        <Route path="home" element={<Home />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
