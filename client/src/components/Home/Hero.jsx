import React from "react";
import "./Hero.css";
import HeroImg from "../../images/hero1.png";
import {useNavigate} from "react-router-dom"

const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="main-text">
            Learn new skills online with top Educators
          </h1>
          <p className="main-msg">
            Join the future of learning today with our dynamic online e-learning
            platform!
          </p>
        </div>
        <div className="main-btn-div">
          <button className="main-btn" onClick={() => navigate("/student/register")}>Start Learning Today</button>
        </div>
      </div>
      <div className="hero-img">
        <img src={HeroImg} alt="" />
      </div>
    </section>
  );
};

export default Hero;
