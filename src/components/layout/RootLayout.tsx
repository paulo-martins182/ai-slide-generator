import { Outlet } from "react-router-dom";
import Header from "../custom/Header";

function RootLayout() {
  return (
    <div>
      <Header />

      <Outlet />
    </div>
  );
}

export default RootLayout;
