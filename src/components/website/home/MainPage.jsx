import React from "react";
import Banner from "./Banner";
import Country from "./Country";
// import ESimCard from "./ESimCard";
import Features from "./Features";
import Benefits from "./Benefits";
import WorkFunc from "./WorkFunc";
import Ad from "./Ad";
import FAQ from "./FAQ";
import Testimonials from "./Testimonials";

const MainPage = () => {
  return (
    <div>
      <Banner />
      <Country />
      {/* <ESimCard /> */}
   
      <Benefits />
      <WorkFunc />
      <Ad />
      <FAQ />
           <Features />
      <Testimonials />
 
    </div>
  );
};

export default MainPage;
