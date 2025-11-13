import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Truck, MapPin, Tag, Star, Calendar, Info, Loader2 } from 'lucide-react';
import axios from 'axios';

// Helper component for detail items
const DetailItem = ({ icon: Icon, label, value }) => (
  <div className="flex items-center space-x-3 p-3 border-b pb-3">
    <Icon className="w-6 h-6 text-gray-500" />
    <p className="font-semibold">{label}:</p>
    <span className="text-gray-900">{value}</span>
  </div>
);


export default function CarDetails() {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    
    console.log("Attempting to fetch Car ID:", id);
    
    const fetchCar = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/cars/${id}`);
        setCar(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch car details:", err);
      
        const errorMessage = err.response?.data?.message 
            ? `Server responded: ${err.response.data.message}`
            : "Check console for network error. Is the server running?";
            
        setError(`Failed to load car details for ID: ${id}. Reason: ${errorMessage}`);
        setLoading(false);
      }
    };
    fetchCar();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center py-20 flex flex-col items-center justify-center">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin mb-4" />
        <p className="text-xl text-gray-700">Loading car details...</p>
      </div>
    );
  }

  if (error) {
    return (
        <div className="max-w-4xl mx-auto my-10 p-6 bg-red-100 border border-red-400 rounded-xl shadow-md text-red-800">
            <h2 className="text-2xl font-bold mb-3">Loading Error</h2>
            <p className="mb-4">{error}</p>
            <p className="text-sm">Please follow the steps in the debugging guide below.</p>
            <Link
                to="/"
                className="mt-4 inline-block text-blue-600 hover:text-blue-800 font-medium"
            >
                &larr; Back to Listings
            </Link>
        </div>
    );
  }
  
  const defaultImage = `https://placehold.co/600x400/cccccc/000000?text=${encodeURIComponent(
    car.carName || "Car"
  )}`;

  return (
    <div className="max-w-4xl mx-auto my-10 p-6 bg-white border border-gray-300 rounded-xl shadow-2xl">
      <Link
        to="/"
        className="mb-6 text-blue-600 hover:text-blue-800 flex items-center transition-colors font-medium"
      >
        &larr; Back to Listings
      </Link>

      <h1 className="text-4xl font-extrabold mb-6 text-gray-900 border-b pb-3">
        {car.carName || "Unnamed Car"}
      </h1>

      <img
        src={car.imageURL || defaultImage}
        alt={car.carName}
        className="w-full h-80 object-cover rounded-xl mb-8 shadow-inner"
      />

      <div className="space-y-4 mb-8 text-lg text-gray-700">
        <DetailItem icon={Truck} label="Category" value={car.category || "-"} />
        <DetailItem icon={Calendar} label="Model" value={car.model || "-"} />
        <DetailItem icon={Tag} label="Price per day" value={`${car.rentPrice || "-"} BDT`} />
        <DetailItem icon={MapPin} label="Location" value={car.location || "-"} />

        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
          <Info className="w-6 h-6 text-blue-600" />
          <p className="font-semibold">Status:</p>
          <span className={`font-bold ${car.status === "Available" ? "text-green-600" : "text-red-600"}`}>
            {car.status || "-"}
          </span>
        </div>

        <DetailItem
          icon={Star}
          label="Rating"
          value={car.rating ? `${car.rating} ⭐` : "-"}
        />

        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
          <Info className="w-6 h-6 text-gray-500" />
          <p className="font-semibold">Provider:</p>
          <span className="text-gray-900">{car.providerName || car.provider || "-"}</span>
        </div>
      </div>

      <div className="border-t pt-6 text-gray-800">
        <h2 className="text-2xl font-bold mb-3 text-gray-900">Description</h2>
        <p className="leading-relaxed bg-gray-50 p-4 rounded-lg italic">
          {car.description || "No description available."}
        </p>
      </div>
    </div>
  );
}