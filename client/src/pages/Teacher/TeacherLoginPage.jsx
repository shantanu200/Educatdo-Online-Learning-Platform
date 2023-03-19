import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import TeacherLogin from "../../components/Teacher/TeacherLogin";
import TeacherRegister from "../../components/Teacher/TeacherRegister";
import "./Teacher.css";

const TeacherLoginPage = () => {
  const location = useLocation();
  const userType = location.pathname.split("/")[2];

  const renderComponent = () => {
    switch (userType) {
      case "login":
        return  <TeacherLogin />;

      case "register":
        return <TeacherRegister />;

      default:
        return <div>404 Page Not Found</div>;
    }
  };
  
  console.log(userType);
  return <div className="teacherPage">{renderComponent()}</div>;
};

export default TeacherLoginPage;
