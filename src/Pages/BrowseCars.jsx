import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const BrowseCars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCars = async () => {
    try {
      const res = await axios.get("http://localhost:3000/cars");
      setCars(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load cars.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  if (loading) return <p className="text-center py-10">Loading cars...</p>;

  return (
    <div className="container mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold mb-6">Browse Cars</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map((car) => (
          <div key={car._id} className="border rounded-lg p-4 shadow relative">
            <img
              src={car.imageURL || `https://dummyimage.com/300x200/cccccc/000000&text=${encodeURIComponent(car.name)}`}
              alt={car.name}
              className="w-full h-48 object-cover rounded mb-4"
            />
            <h3 className="text-xl font-semibold">{car.name}</h3>
            <p className="text-gray-600">Category: {car.category}</p>
            <p className="text-gray-800 font-medium">Price/day: {car.pricePerDay} BDT</p>

            <span
              className={`absolute top-4 right-4 px-3 py-1 rounded-full text-white font-semibold ${car.status === "Available" ? "bg-green-500" : "bg-red-500"
                }`}
            >
              {car.status === "Available" ? "Available" : "Booked"}
            </span>

            <div className="mt-4 flex justify-between gap-2">
              <Link
                to={`/cars/${car._id}`}
                className="flex-1 bg-gray-500 text-white py-2 rounded hover:bg-gray-600 text-center"
              >
                View Details
              </Link>
              <Link
  to={car.status === "Available" ? `/book/${car._id}` : "#"}
  className={`flex-1 py-2 rounded text-white text-center ${
    car.status === "Available"
      ? "bg-blue-500 hover:bg-blue-600"
      : "bg-gray-400 cursor-not-allowed"
  }`}
>
  Book Now
</Link>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrowseCars;
