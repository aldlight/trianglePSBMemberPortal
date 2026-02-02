import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import Event from "./components/Event";
import EventList from "./components/EventList";
import Login from "./components/Login"
import RegisterUser from "./components/RegisterUser"
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
    ],
  },
  {
    path: "/register",
    element: <App />,
    children: [
      {
        path: "/register",
        element: <RegisterUser />,
      },
    ],
  },
  {
    path: "/events",
    element: <App />,
    children: [
      {
        path: "/events",
        element: <EventList />,
      },
    ],
  },
  {
    path: "/events/edit/:id",
    element: <App />,
    children: [
      {
        path: "/events/edit/:id",
        element: <Event />,
      },
    ],
  },
  {
    path: "/events/create",
    element: <App />,
    children: [
      {
        path: "/events/create",
        element: <Event />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);