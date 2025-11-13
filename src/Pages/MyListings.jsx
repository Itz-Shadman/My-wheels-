import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../Components/context/AuthContext";

export default function MyListings() {
  const { user } = useAuth(); // ✅ get logged-in user
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCars = async () => {
    try {
      const res = await axios.get("http://localhost:3000/cars");
      // Filter cars by logged-in user's email
      const userCars = res.data.filter(car => car.providerEmail === user?.email);
      setCars(userCars);
      setLoading(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load cars.");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchCars(); // fetch only if user is logged in
  }, [user]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this car?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:3000/cars/${id}`);
      toast.success("Car deleted successfully!");
      setCars(cars.filter(car => car._id !== id));
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete car.");
    }
  };

  const handleUpdate = async (car) => {
    const updatedName = prompt("Enter new car name:", car.name) || car.name;
    const updatedCategory = prompt("Enter new category:", car.category) || car.category;
    const updatedPrice = prompt("Enter new price per day:", car.pricePerDay) || car.pricePerDay;
    const updatedStatus = prompt("Enter new status:", car.status) || car.status;

    try {
      const res = await axios.put(`http://localhost:3000/cars/${car._id}`, {
        name: updatedName,
        category: updatedCategory,
        pricePerDay: updatedPrice,
        status: updatedStatus,
      });
      setCars(cars.map(c => c._id === car._id ? res.data : c));
      toast.success("Car updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update car.");
    }
  };

  if (loading) return <div className="text-center py-10 text-white font-semibold">Loading cars...</div>;

  if (!user) return <div className="text-center py-10 text-white font-semibold">Please login to view your listings.</div>;

  return (
    <div className="max-w-4xl mx-auto my-10">
      <h2 className="text-3xl font-extrabold mb-6 text-center text-white">My Listings</h2>
      {cars.length === 0 ? (
        <p className="text-center text-white font-semibold">No cars found. Add your first car!</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300 shadow-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="border px-4 py-2 text-white font-semibold">Car Name</th>
              <th className="border px-4 py-2 text-white font-semibold">Category</th>
              <th className="border px-4 py-2 text-white font-semibold">Price/Day</th>
              <th className="border px-4 py-2 text-white font-semibold">Status</th>
              <th className="border px-4 py-2 text-white font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cars.map(car => (
              <tr key={car._id} className="hover:bg-gray-50 transition">
                <td className="border px-4 py-2 text-white">{car.name}</td>
                <td className="border px-4 py-2 text-white">{car.category}</td>
                <td className="border px-4 py-2 text-white">{car.pricePerDay} BDT</td>
                <td className="border px-4 py-2 text-white">{car.status}</td>
                <td className="border px-4 py-2 flex gap-2">
                  <button
                    onClick={() => handleUpdate(car)}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition font-semibold"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(car._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition font-semibold"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
