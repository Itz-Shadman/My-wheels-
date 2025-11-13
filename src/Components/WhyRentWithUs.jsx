export default function WhyRentWithUs() {
  const benefits = [
    {
      title: "Easy Booking",
      description:
        "Book your favorite car in just a few clicks with our user-friendly platform.",
      icon: "🚗",
    },
    {
      title: "Affordable Rates",
      description:
        "Get the best prices for every car without any hidden charges.",
      icon: "💰",
    },
    {
      title: "Trusted Providers",
      description:
        "All cars are listed by verified and trusted providers in your area.",
      icon: "✅",
    },
    {
      title: "24/7 Support",
      description:
        "Our customer support team is available round the clock to assist you.",
      icon: "📞",
    },
  ];

  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold mb-8">Why Rent With Us</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition duration-300 flex flex-col items-center text-center"
            >
              <div className="text-5xl mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
