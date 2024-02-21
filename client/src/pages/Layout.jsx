import { Outlet } from "react-router-dom";
import Header from "../components/Header";

export default function Layout() {
  return (
    <main className="max-w-4xl my-0 mx-auto px-2">
      <Header />
      <Outlet />
    </main>
  );
}
