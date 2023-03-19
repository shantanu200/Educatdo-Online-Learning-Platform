import React from "react";
import Course from "../components/Home/Course";
import Hero from "../components/Home/Hero";
import Join from "../components/Home/Join";
import Navbar from "../components/Home/Navbar";
import { Spinner } from "../utils/SpinnerItem";

const Home = () => {
  return (
    <section>
      <Navbar />
      <Hero />
      <Course />
      <Join />
    </section>
  );
};

export default Home;
