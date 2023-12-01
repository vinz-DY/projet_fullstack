import React from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import PageGameOne from "./pages/PageGameOne";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: () => {
      return axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/games`)
        .then((res) => res.data)
        .catch((err) => console.error(err));
    },
  },
  {
    path: "/games/:id",
    element: <PageGameOne />,
    loader: ({ params }) => {
      return axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/games/${params.id}`)
        .then((res) => res.data)
        .catch((err) => console.error(err));
    },
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
