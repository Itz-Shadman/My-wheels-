import React, { useEffect, useState } from "react";
import axios from "axios";
// featured cars 
const FeaturedCars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/cars/featured")
      .then((res) => {
        setCars(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load featured cars.");
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className="text-center py-10">
        <span className="loader"></span> Loading featured cars...
      </div>
    );

  if (error)
    return <div className="text-center py-10 text-red-500">{error}</div>;

  if (cars.length === 0)
    return <div className="text-center py-10">No featured cars available.</div>;

  return (
    <section className="py-10 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-8 text-black">Featured Cars</h2>
      <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map((car) => (
          <div
            key={car._id}
            className="border rounded-lg p-4 shadow hover:shadow-lg bg-white transition"
          >
            {/* Safe placeholder image */}
       <img
  src={
    car.imageURL
      ? car.imageURL
      : `https://dummyimage.com/300x200/cccccc/000000&text=${encodeURIComponent(
          car.carName || "Car"
        )}`
  }
  alt={car.carName || "Car"}
  className="w-full h-48 object-cover rounded mb-4"
/>

            <h3 className="text-xl font-semibold">{car.carName || "Unknown Car"}</h3>
            <p className="text-gray-600">Category: {car.category || "Unknown"}</p>
            <p className="text-gray-800 font-medium">
              Price/day: {car.pricePerDay || "N/A"} BDT
            </p>
            <p className="text-gray-600">
              Provider: {car.providerName || "Unknown"}
            </p>
            <p
              className={`inline-block mt-2 px-2 py-1 rounded text-white text-sm ${
                car.availability === "unavailable"
                  ? "bg-red-500"
                  : "bg-green-500"
              }`}
            >
              {car.availability === "unavailable" ? "Booked" : "Available"}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedCars;
