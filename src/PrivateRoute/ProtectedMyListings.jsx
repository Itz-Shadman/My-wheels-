import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../Components/context/AuthContext";
import MyListings from "../Pages/MyListings";

export default function ProtectedMyListings() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      toast.info("⚠ You must be logged in to view your listings");
      navigate("/login"); // redirect if not logged in
    }
  }, [user, navigate]);

  if (!user) return null; // prevent showing table before redirect

  return <MyListings />; // render your original listings
}
