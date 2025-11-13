import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../Components/context/AuthContext";
import MyBookings from "../Pages/MyBookings";

export default function ProtectedBookings() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      toast.info("⚠ You must be logged in to view your bookings");
      navigate("/login"); 
    }
  }, [user, navigate]);

  if (!user) return null; 

  return <MyBookings />; 
}
