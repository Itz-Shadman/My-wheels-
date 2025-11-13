import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./index.css";

import Root from "./Root/Root.jsx";
import Home from "./Pages/Home.jsx";
import AddCar from "./Pages/AddCar.jsx";
import MyListings from "./Pages/MyListings.jsx";
import MyBookings from "./Pages/MyBookings.jsx";
import BrowseCars from "./Pages/BrowseCars.jsx";
import UpdateCar from "./Components/UpdateCar.jsx";
import CarDetails from "./Components/CarDetails.jsx";
import Login from "./Components/Login.jsx";
import Register from "./Components/Register.jsx";
import NotFound from "./Components/NotFound.jsx";

import { AuthProvider } from "./Components/context/AuthContext.jsx";
import ProtectedAddCar from "./PrivateRoute/ProtectedAddCar.jsx";
import ProtectedMyListings from "./PrivateRoute/ProtectedMyListings.jsx";
import ProtectedBookings from "./PrivateRoute/ProtectedBookings.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },

      // Add Car
      { path: "add-car", Component: ProtectedAddCar },
      { path: "add-car", Component: AddCar },

      // My Listings
      { path: "my-listings", Component: ProtectedMyListings },
      { path: "my-listings", Component: MyListings },

      // My Bookings (list)
      { path: "my-bookings", Component: ProtectedBookings, children: [
          { index: true, Component: MyBookings }
      ]},

      // Update Car
      { path: "update-car/:id", Component: UpdateCar },

      // Browse Cars
      { path: "browse-cars", Component: BrowseCars },

      // Car Details (dynamic route)
      { path: "cars/:id", Component: CarDetails },

      // Book Now (dynamic, protected)
      { path: "book/:id", Component: ProtectedBookings, children: [
          { index: true, Component: MyBookings }
      ]},

      // Auth
      { path: "login", Component: Login },
      { path: "register", Component: Register },

      // 404
      { path: "*", Component: NotFound },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <ToastContainer />
    </AuthProvider>
  </StrictMode>
);
