import React from "react";
import HeroSlider from "../Components/HeroSlider";
import FeaturedCars from "../Components/FeaturedCars";
import WhyRentWithUs from "../Components/WhyRentWithUs";
import TopRatedCars from "../Components/TopRatedCars";
import Testimonials from "../Components/Testimonials";

export default function Home() {
  return (
    <div>
      <HeroSlider />
      <FeaturedCars />
      <WhyRentWithUs />
      <TopRatedCars />
      <Testimonials />
    </div>
  );
}

