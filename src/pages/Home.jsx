import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Announcment from "../components/Announcment";
import Slider from "../components/Slider";
import Categories from "../components/Categories";
import Products from "../components/Products";
import NewsLetter from "../components/NewsLetter";
import Footer from "../components/Footer";
import { useLocation } from "react-router-dom";
import WelcomSection from "../components/WelcomSection";

const Home = () => {
  const Url = useState("homeProduct");
  return (
    <div>
      <Announcment />
      <Navbar />
      <WelcomSection />
      <Slider autoSlide={true} autoSlideInterval={3000} />
      <Categories />
      <Products Url={Url[0]} />
      <NewsLetter />
      <Footer />
    </div>
  );
};

export default Home;
