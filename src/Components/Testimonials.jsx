export default function Testimonials() {
  // Testimonials 
  const reviews = [
    {
      name: "Ridhi Khan",
      comment:
        "RentWheels made renting a car so simple and quick. Highly recommended!",
      photo: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "Shadman Chowdhury",
      comment:
        "Amazing service and friendly providers. I always find the best cars here.",
      photo: "https://randomuser.me/api/portraits/men/46.jpg",
    },
    {
      name: "Arif Ahmed",
      comment:
        "Affordable rates and easy booking process. Loved the experience!",
      photo: "https://randomuser.me/api/portraits/men/55.jpg",
    },
  ];

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold mb-8">What Our Customers Say</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition"
            >
              <img
                src={review.photo}
                alt={review.name}
                className="w-16 h-16 rounded-full mx-auto mb-4"
              />
              <p className="text-gray-700 mb-2">"{review.comment}"</p>
              <h4 className="font-semibold">{review.name}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
