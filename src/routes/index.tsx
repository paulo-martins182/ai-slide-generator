import App from "@/App";
import RootLayout from "@/components/layout/RootLayout";
import WorksPace from "@/pages/workspace";
import Project from "@/pages/workspace/project";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <App /> },
      {
        path: "/workspace",
        element: <WorksPace />,
        children: [{ path: "project/:projectId", element: <Project /> }],
      },
    ],
  },
]);

export default router;
