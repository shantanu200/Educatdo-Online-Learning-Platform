import React from "react";
import "./StudentPage.css";
import { useLocation } from "react-router-dom";
import StudentRegister from "../../components/Student/StudentRegister";
import StudentLogin from "../../components/Student/StudentLogin";

const StudentLoginPage = () => {
  const location = useLocation();
  const userType = location.pathname.split("/")[2];

  const renderElement = () => {
    console.log(userType);
    switch (userType) {
      case "register":
        return <StudentRegister />;

      case "login":
        return <StudentLogin />
    }
  };

  return <div className="studentPage">{renderElement()}</div>;
};

export default StudentLoginPage;
