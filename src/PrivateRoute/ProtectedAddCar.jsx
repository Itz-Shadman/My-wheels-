import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AddCar from "../Pages/AddCar"; // your existing AddCar component
import { useAuth } from "../Components/context/AuthContext";

export default function ProtectedAddCar() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      toast.info("⚠ You must be logged in to add a car");
      navigate("/login"); // redirect if not logged in
    }
  }, [user, navigate]);

  if (!user) return null; // prevent showing form before redirect

  return <AddCar />; // render your original form
}
