import React, { useState } from "react";
import styled from "styled-components";
import loginPage from "../../images/loginStudent.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 40%;
  background: white;
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
`;
const ImageContainer = styled.div`
  width: 100%;
  text-align: center;
`;

const Image = styled.img`
  max-width: 25rem;
  width: 100%;
`;

const FormContainer = styled.div`
  width: 100%;
  padding: 1rem;
`;

const Header = styled.h1`
  margin: 1rem 0;
`;

const InputField = styled.div`
  width: 100%;
  margin: 0.5rem 0;
`;
const Input = styled.input`
  width: 100%;
  padding: 0.8rem 1rem;
  display: inline-block;
  border: 1px solid black;
  border-radius: 0.3rem;

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

const Message = styled.div`
  font-weight: 600;
  color: green;
  text-align: center;
`;

const ButtonContainer = styled.div`
  text-align: center;
`;

const StudentLogin = () => {
  const navigate = useNavigate();
  const [isOTPSend, setIsOTPSend] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState("");
  const handleOTP = async () => {
    if (!isOTPSend) {
      const { data } = await axios.post("/student/sendOTP", { email });

      if (data) setIsOTPSend(true);
    } else {
      const { data } = await axios.post("/student/login", { email, otp });

      if (data) {
        localStorage.setItem("loggedStudent", JSON.stringify(data));
        navigate("/courses");
      }
    }
  };

  return (
    <Container>
      <ImageContainer>
        <Image src={loginPage} alt="" />
      </ImageContainer>
      <FormContainer>
        <Header>Welcome Back!!</Header>
        <InputField>
          <Input
            placeholder="Enter your Email Here"
            disabled={isOTPSend ? "disabled" : null}
            onChange={(e) => setEmail(e.target.value)}
          />
        </InputField>
        {isOTPSend && <Message>OTP send Successfully.</Message>}
        {isOTPSend && (
          <InputField>
            <Input
              placeholder="Enter OTP"
              onChange={(e) => setOTP(e.target.value)}
            />
          </InputField>
        )}
        <ButtonContainer>
          <Button onClick={handleOTP}>
            {isOTPSend ? "Validate OTP" : "Send OTP"}
          </Button>
        </ButtonContainer>
      </FormContainer>
    </Container>
  );
};

export default StudentLogin;
