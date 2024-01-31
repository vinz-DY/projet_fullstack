import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import connexion from "./services/connexion";

import App from "./App";
import PageGameOne from "./pages/PageGameOne";
import Admin from "./pages/Admin";
import Vinylo from "./pages/Vinylo";
import Advinylo from "./pages/Advinylo";
import PageVinylOne from "./pages/PageVinylOne";
import Gamespage from "./pages/Gamespage";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/games",
    element: <Gamespage />,
    loader: () => {
      return connexion
        .get("/games")
        .then((res) => res.data)
        .catch((err) => console.error(err));
    },
  },
  {
    path: "/games/:id",
    element: <PageGameOne />,
    loader: ({ params }) => {
      return connexion
        .get(`/games/${params.id}`)
        .then((res) => res.data)
        .catch((err) => console.error(err));
    },
  },
  {
    path: "/adminGames",
    element: <Admin />,
  },
  {
    path: "/vinyles",
    element: <Vinylo />,
    loader: () => {
      return connexion
        .get("/discs")
        .then((res) => res.data)
        .catch((err) => console.error(err));
    },
  },
  {
    path: "/discs/:id",
    element: <PageVinylOne />,
    loader: ({ params }) => {
      return connexion
        .get(`/discs/${params.id}`)
        .then((res) => res.data)
        .catch((err) => console.error(err));
    },
  },
  {
    path: "/adminVinyles",
    element: <Advinylo />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
