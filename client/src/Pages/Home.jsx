import Accommodations from "@/components/Accommodations";
import Hero from "@/components/Hero";
import WhyWeAreBest from "@/components/WhyWeAreBest";
import React, { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <div className="z-10">
      <Hero />
      <Accommodations />
      <WhyWeAreBest/>
    </div>
  );
};

export default Home;
