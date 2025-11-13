import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../Components/context/AuthContext";

export default function AddCar() {
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
  });

  // Auto-fill provider info when user changes
  useEffect(() => {
    if (user) {
      setCarData((prev) => ({
        ...prev,
        providerName: user.displayName || "",
        providerEmail: user.email || "",
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Prevent user from changing providerName/email
    if (name === "providerName" || name === "providerEmail") return;
    setCarData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...carData,
      status: "Available",
    };

    try {
      const res = await axios.post("http://localhost:3000/cars", payload);
      if (res.status === 201) {
        toast.success("✅ Car added successfully!");
        // Reset form except provider info
        setCarData((prev) => ({
          name: "",
          description: "",
          category: "Sedan",
          pricePerDay: "",
          location: "",
          imageURL: "",
          providerName: prev.providerName,
          providerEmail: prev.providerEmail,
        }));
      }
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to add car. Try again.");
    }
  };

  return (
    <div className="max-w-lg mx-auto my-10 p-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-2xl border border-blue-200">
      <h2 className="text-3xl font-bold mb-6 text-center text-black">Add Your Car</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-1 font-medium text-black">Car Name</label>
          <input
            type="text"
            name="name"
            value={carData.name}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded shadow-inner focus:ring-2 focus:ring-blue-400 text-black"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium text-black">Description</label>
          <textarea
            name="description"
            value={carData.description}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded shadow-inner focus:ring-2 focus:ring-blue-400 text-black"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium text-black">Category</label>
          <select
            name="category"
            value={carData.category}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded shadow-inner focus:ring-2 focus:ring-blue-400 text-black"
          >
            <option>Sedan</option>
            <option>SUV</option>
            <option>Hatchback</option>
            <option>Luxury</option>
            <option>Electric</option>
          </select>
        </div>
        <div>
          <label className="block mb-1 font-medium text-black">Rent Price (per day)</label>
          <input
            type="number"
            name="pricePerDay"
            value={carData.pricePerDay}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded shadow-inner focus:ring-2 focus:ring-blue-400 text-black"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium text-black">Location</label>
          <input
            type="text"
            name="location"
            value={carData.location}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded shadow-inner focus:ring-2 focus:ring-blue-400 text-black"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium text-black">Hosted Image URL</label>
          <input
            type="text"
            name="imageURL"
            value={carData.imageURL}
            onChange={handleChange}
            required
            placeholder="https://images.unsplash.com/..."
            className="w-full border px-3 py-2 rounded shadow-inner focus:ring-2 focus:ring-blue-400 text-black"
          />
        </div>

        {/* Provider fields are read-only */}
        <div>
          <label className="block mb-1 font-medium text-black">Provider Name</label>
          <input
            type="text"
            name="providerName"
            value={carData.providerName}
            readOnly
            className="w-full border px-3 py-2 rounded shadow-inner focus:ring-2 focus:ring-blue-400 bg-gray-100 text-black"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium text-black">Provider Email</label>
          <input
            type="email"
            name="providerEmail"
            value={carData.providerEmail}
            readOnly
            className="w-full border px-3 py-2 rounded shadow-inner focus:ring-2 focus:ring-blue-400 bg-gray-100 text-black"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
        >
          Add Car
        </button>
      </form>
    </div>
  );
}
