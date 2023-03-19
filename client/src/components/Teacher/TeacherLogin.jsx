import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Swal from "sweetalert2";
import loginTeacher from "../../images/loginTeacher.jpg";
import { createLocalObject } from "../../locallStorage/local";
import {Spinner} from "../../utils/SpinnerItem";

const LoginBox = styled.div`
  width: 40%;
  background: white;
  padding: 1rem;

  @media (max-width: 1024px) {
    width: 60%;
  }

  @media (max-width: 768px) {
    width: 80%;
  }
`;
const LoginTitle = styled.div`
  padding: 1rem;
  font-weight: bold;
  font-size: 2rem;
`;

const LoginImg = styled.div`
  width: 100%;
  text-align: center;
  margin: 1rem 0;
`;

const Border = styled.div`
  border-bottom: 0.1rem solid black;
`;
const Img = styled.img`
  width: 100%;
  max-width: 25rem;
`;

const LoginForm = styled.div`
  width: 100%;
  padding: 1rem;
  text-align: center;
`;

const EmailInput = styled.input`
  width: 100%;
  padding: 0.5rem 1rem;

  &:focus {
    outline: none;
  }
`;
const Button = styled.button`
  width: 80%;
  margin: 1rem;
  padding: 0.8rem 1rem;
  background: #6f58c5;
  border: none;
  border-radius: 0.3rem;
  color: white;
  /* display: flex;
  align-items: center;
  justify-content: center; */

  &:hover {
    background: #87a2fb;
    cursor: pointer;
    transition: 0.3s all ease-in;
    color: black;
  }
`;

const Msg = styled.p`
  color: green;
  padding: 0.5rem 0;
  font-weight: 600;
`;

const OTPInput = styled.input`
  width: 100%;
  padding: 0.5rem 1rem;

  &:focus {
    outline: none;
  }
`;

const TeacherLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isOTPSend, setIsSend] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [OTP, setOTP] = useState("");


  const handleSendOTP = async () => {
    setIsLoading(true);

    try {
      const { data } = await axios.post("/teacher/sendOTP", { email });

      if (data) {
        setIsLoading(false);
        setIsSend(true);
      }
    } catch (error) {
      setIsLoading(false);
      Swal.fire({
        title: "Server Side Error",
        text: err.response.data.message,
        icon: "error",
      });
    }
  };

  const handleValidateOTP = async () => {
    setIsLoading(true);

    try {
      const { data } = await axios.post("/teacher/login", { email, otp:OTP });

      if (data) {
        setIsLoading(false);
        createLocalObject("teacher",data);
        navigate("/courses");
      }
    } catch (err) {
      Swal.fire({
        title: "Server Side Error",
        text: err.response.data.message,
        icon: "error",
      });
    }
  };

  return (
    <LoginBox>
      <LoginImg>
        <Img src={loginTeacher} />
      </LoginImg>
      <Border />
      <LoginTitle>Welcome Back!</LoginTitle>
      <LoginForm>
        {isOTPSend ? (
          <OTPInput
            placeholder="Enter OTP"
            onChange={(e) => setOTP(e.target.value)}
          />
        ) : (
          <EmailInput
            placeholder="Enter Your Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        )}
        {isOTPSend && <Msg>OTP is send on your EmailID</Msg>}
        <Button disabled={isLoading ? "disabled" : null} onClick={isOTPSend ? handleValidateOTP : handleSendOTP}>
          {isLoading ? <Spinner /> : isOTPSend ? "Validate OTP" : "Send OTP"}
        </Button>
      </LoginForm>
    </LoginBox>
  );
};

export default TeacherLogin;
