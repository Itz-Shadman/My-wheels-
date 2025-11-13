import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../Components/context/AuthContext";
const MyBookings = () => {
  const { user } = useAuth();  
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchBookings = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/my-bookings?userEmail=${user.email}`);
        setBookings(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load your bookings.");
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user]);

  if (!user) return <p className="text-center py-10 font-semibold text-white">Please login to view your bookings.</p>;
  if (loading) return <p className="text-center py-10 font-semibold text-white">Loading your bookings...</p>;
  if (bookings.length === 0) return <p className="text-center py-10 font-semibold text-white">No bookings yet.</p>;

  return (
    <div className="container mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold mb-6 text-white">My Bookings</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookings.map((booking) => {
          const car = booking.car || {};
          return (
            <div key={booking._id} className="border rounded-lg p-4 shadow relative bg-gray-800 text-white">
              <h3 className="text-xl font-semibold">{car.carName || "Unknown Car"}</h3>
              <p>Category: {car.category || "N/A"}</p>
              <p className="font-medium">Price/day: {car.rentPrice || car.pricePerDay || "N/A"} BDT</p>
              <p>Location: {car.location || "N/A"}</p>
              <p>Description: {car.description || "N/A"}</p>

              <div className="mt-2">
                <p className="font-medium">Provider: {car.providerName || "N/A"}</p>
                <p>Email: {car.providerEmail || "N/A"}</p>
              </div>

              <span 
                className={`absolute top-4 right-4 px-3 py-1 rounded-full font-semibold ${booking.status === "Booked" ? "bg-red-500" : "bg-green-500"}`}
              >
                {booking.status || "Available"}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyBookings;
