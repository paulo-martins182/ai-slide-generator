import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import RootLayout from "@/components/layout/RootLayout";
import WorksPace from "@/pages/workspace";
import Outline from "@/pages/workspace/project/outline";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <App /> },
      {
        path: "/workspace",
        element: <WorksPace />,
        children: [
          { path: "project/:projectId/outline", element: <Outline /> },
        ],
      },
    ],
  },
]);

export default router;
