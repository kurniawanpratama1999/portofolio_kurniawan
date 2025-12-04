import '@/index.css'

import ReactDOM from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import DefaultLayout from "@/layouts/DefaultLayout";
import Home from "@/pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    Component: DefaultLayout,
    children: [
      {
        index: true,
        Component: Home
      }
    ]
  },
]);

const root: any = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <RouterProvider router={router} />,
);
