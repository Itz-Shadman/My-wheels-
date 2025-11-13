import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "./context/AuthContext";

export default function UpdateCar({ carId }) {
  const { user } = useAuth(); // ✅ get logged-in user
  const [carData, setCarData] = useState({
    name: "",
    description: "",
    category: "Sedan",
    pricePerDay: "",
    location: "",
    imageURL: "",
    providerName: "",
    providerEmail: "",
    status: "Available",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch car data by ID
  useEffect(() => {
    if (!carId) return;

    const fetchCar = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/cars/${carId}`);
        const car = res.data;

        // Fill provider info from logged-in user
        setCarData({
          ...car,
          providerName: user?.displayName || car.providerName,
          providerEmail: user?.email || car.providerEmail,
        });
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to load car data.");
        setLoading(false);
      }
    };

    fetchCar();
  }, [carId, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch(`http://localhost:3000/cars/${carId}`, carData);
      if (res.status === 200) {
        toast.success("✅ Car updated successfully!");
      }
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to update car.");
    }
  };

  if (!user) return <p className="text-center py-10 font-semibold text-white">Please login to update a car.</p>;
  if (loading) return <div className="text-center py-10">Loading car data...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div className="max-w-lg mx-auto my-10 p-8 bg-white rounded-xl shadow-lg border">
      <h2 className="text-3xl font-bold mb-6 text-center">Update Car</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Car Name */}
        <div>
          <label className="block mb-1 font-medium">Car Name</label>
          <input
            type="text"
            name="name"
            value={carData.name}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="description"
            value={carData.description}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block mb-1 font-medium">Category</label>
          <select
            name="category"
            value={carData.category}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-400"
          >
            <option>Sedan</option>
            <option>SUV</option>
            <option>Hatchback</option>
            <option>Luxury</option>
            <option>Electric</option>
          </select>
        </div>

        {/* Rent Price */}
        <div>
          <label className="block mb-1 font-medium">Rent Price (per day)</label>
          <input
            type="number"
            name="pricePerDay"
            value={carData.pricePerDay}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block mb-1 font-medium">Location</label>
          <input
            type="text"
            name="location"
            value={carData.location}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Image URL */}
        <div>
          <label className="block mb-1 font-medium">Hosted Image URL</label>
          <input
            type="text"
            name="imageURL"
            value={carData.imageURL}
            onChange={handleChange}
            placeholder="https://images.unsplash.com/..."
            className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Provider Name (read-only) */}
        <div>
          <label className="block mb-1 font-medium">Provider Name</label>
          <input
            type="text"
            value={carData.providerName}
            readOnly
            className="w-full border px-3 py-2 rounded bg-gray-100"
          />
        </div>

        {/* Provider Email (read-only) */}
        <div>
          <label className="block mb-1 font-medium">Provider Email</label>
          <input
            type="email"
            value={carData.providerEmail}
            readOnly
            className="w-full border px-3 py-2 rounded bg-gray-100"
          />
        </div>

        {/* Status */}
        <div>
          <label className="block mb-1 font-medium">Status</label>
          <select
            name="status"
            value={carData.status}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-400"
          >
            <option>Available</option>
            <option>Booked</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-semibold"
        >
          Update Car
        </button>
      </form>
    </div>
  );
}
