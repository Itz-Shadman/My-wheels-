import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";

const HeroSlider = () => {
  return (
    <div className="w-full max-w-7xl mx-auto mt-6 rounded-2xl overflow-hidden shadow-lg">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {/* ---- Slide 1 ---- */}
        <SwiperSlide>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1549923746-c502d488b3ea"
              alt="Luxury Cars"
              className="w-full h-[500px] object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-center text-white px-4">
              <h1 className="text-4xl font-bold mb-3">Rent Premium Cars at Affordable Rates</h1>
              <p className="text-lg">Find the best car for your next adventure — fast, easy, and reliable.</p>
            </div>
          </div>
        </SwiperSlide>

        {/* ---- Slide 2 ---- */}
        <SwiperSlide>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1605559424843-9e4c4c13d1f3"
              alt="Family Cars"
              className="w-full h-[500px] object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-center text-white px-4">
              <h1 className="text-4xl font-bold mb-3">Perfect Cars for Family Trips</h1>
              <p className="text-lg">Spacious, safe, and comfortable vehicles for your loved ones.</p>
            </div>
          </div>
        </SwiperSlide>

        {/* ---- Slide 3 ---- */}
        <SwiperSlide>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1525609004556-c46c7d6cf023"
              alt="Business Cars"
              className="w-full h-[500px] object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-center text-white px-4">
              <h1 className="text-4xl font-bold mb-3">Book Cars for Business & Events</h1>
              <p className="text-lg">Arrive in style and make an impression with our executive fleet.</p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default HeroSlider;
