import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import { UserContextProvider } from "./context/UserContext";
import Home from "./pages/Home";
import CreateBlog from "./pages/CreateBlog";

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/create" element={<CreateBlog />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
