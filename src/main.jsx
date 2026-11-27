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
import Dashboard from "./components/DashBoard";
import "./index.css";

// Auths
import RequireAuth from "./components/RequireAuth";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      { path: "/", element: <Login /> },
      {
        element: <RequireAuth />,
        children: [
          { path: "/dashboard", element: <Dashboard /> },
          { path: "/events", element: <EventList /> },
          { path: "/events/create", element: <Event /> },
          { path: "/events/edit/:id", element: <Event /> },
          { path: "/register", element: <RegisterUser /> },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);