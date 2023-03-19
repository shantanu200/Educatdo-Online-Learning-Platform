import React, { useState } from "react";
import { TbBooks } from "react-icons/tb";
import { AiOutlineMenu } from "react-icons/ai";
import "./Navbar.css";
import { getLocalObject } from "../../locallStorage/local";

const Navbar = () => {
  const [isMenuShow, setIsMenuShow] = useState(false);
  const MobileMenu = () => {
    return (
      <ul>
        <li>Home</li>
        <li>Student</li>
        <li>Teacher</li>
        <li>Contact Us</li>
        <li>Join Us</li>
      </ul>
    );
  };

  const Teacher = getLocalObject("teacher");

  return (
    <nav className="navbar">
      <a href="/" className="title">
        <TbBooks className="icon" />
        Educatdo
      </a>
      <ul className={`list ${isMenuShow && "active"}`}>
        <li className="list-item">
          <a href="/">Home</a>
        </li>
        <li className="list-item">
          <a href="/courses">Courses</a>
        </li>
        <li className="list-item">
          <a href="/student/register">Student</a>
        </li>
        <li className="list-item">
          <a href={Teacher ? `/teacher/course/${Teacher._id}` : "/teacher/register"}>Teacher</a>
        </li>
        <li className="list-item">
          <a href="/contact">Contact</a>
        </li>
        <li className="list-btn">
          <a href="#">Join Us</a>
        </li>
      </ul>
      <AiOutlineMenu
        className="menu-btn"
        onClick={() => setIsMenuShow(!isMenuShow)}
      />
    </nav>
  );
};

export default Navbar;
