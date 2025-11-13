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


      { path: "add-car", Component: ProtectedAddCar },
      { path: "add-car", Component: AddCar },

      { path: "my-listings", Component: ProtectedMyListings },
      { path: "my-listings", Component: MyListings },

     
      { path: "my-bookings", Component: ProtectedBookings, children: [
          { index: true, Component: MyBookings }
      ]},


      { path: "update-car/:id", Component: UpdateCar },

  
      { path: "browse-cars", Component: BrowseCars },

      { path: "cars/:id", Component: CarDetails },


      { path: "book/:id", Component: ProtectedBookings, children: [
          { index: true, Component: MyBookings }
      ]},


      { path: "login", Component: Login },
      { path: "register", Component: Register },


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
