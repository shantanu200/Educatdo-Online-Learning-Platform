import React, { useState } from "react";
import teacherLoginImg from "../../images/teacherLogin.jpg";
import styled from "styled-components";
import { programmingSkills } from "../../data/skills";
import MultiSelect from "multiselect-react-dropdown";
import {Spinner} from "../../utils/SpinnerItem";
import Swal from "sweetalert2";
import axios from "axios";
import { createLocalObject } from "../../locallStorage/local";

const TeacherLoginBox = styled.div`
  width: 60%;
  background-color: white;
  display: flex;

  @media (max-width: 768px) {
    width: 80%;
  }

  @media (max-width: 1024px) {
    width: 80%;
  }
`;

const FormSection = styled.div`
  width: 50%;
  padding: 1rem;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const FormTitle = styled.div`
  padding: 1rem;
  font-size: 2rem;
  font-weight: bold;
`;

const RegisterForm = styled.form``;

const ImgSection = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 768px) {
    display: none;
  }
`;

const Image = styled.img`
  width: 100%;
  max-width: 24rem;
  aspect-ratio: auto 4/3;
`;

const Border = styled.div`
  border: 1px solid black;
  margin: 1rem 0;
  @media (max-width: 768px) {
    display: none;
  }
`;

const InputField = styled.div`
  margin: 0.5rem 0;
  padding: 0 1rem;
`;

const Input = styled.input`
  width: 100%;
  margin: 0.5rem 0;
  padding: 0.8rem 1rem;
  display: inline-block;
  border: 1px solid black;
  border-radius: 0.3rem;

  &:focus {
    outline: none;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 0.8rem 1rem;
  background: #6f58c5;
  border: none;
  border-radius: 0.3rem;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #87a2fb;
    cursor: pointer;
    transition: 0.3s all ease-in;
    color: black;
  }
`;

const DropDown = styled.div`
  display: inline-block;
  width: 100%;
  border: 1px solid black;
`;

const Anchor = styled.span`
  position: relative;
  cursor: pointer;
  display: inline-block;
  padding: 0.8rem 1rem;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.8rem;
`;

const UserExists = styled.p`
  width: 100%;
  text-align: center;
  padding: 0.5rem 0;
`;

const TeacherRegister = () => {
  const [teacher, setTeacher] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [pic, setPic] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    let err = errors;

    switch (name) {
      case "name":
        err.name = value.length === 0 ? "Please Enter Your Name" : null;
      case "email":
        err.email = value.length === 0 ? "Please Enter a valid Email" : null;
      case "password":
        err.password =
          value.length >= 0 && value.length < 8
            ? "Password Must Contain 8 characters"
            : "";
    }
    setErrors(err);
    setTeacher({ ...teacher, [name]: value });
  };

  const handleFile = (post) => {
    setLoading(true);

    if (post === undefined) {
      Swal.fire({
        title: "No Image",
        icon: "error",
        text: "Please Select an Image!",
      });
      return;
    }

    if (post.type === "image/jpeg" || post.type === "image/png") {
      const data = new FormData();
      data.append("file", post);
      data.append("upload_preset", "educatdo");
      data.append("cloud_name", "dgrxzxtd8");
      fetch("https://api.cloudinary.com/v1_1/dgrxzxtd8/image/upload", {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(data.url.toString());
          setLoading(false);
        });
    } else {
      Swal.fire({
        title: "Image not found",
        icon: "warning",
        text: "Please Select an Image!",
      });
      setLoading(false);
      return;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (errors.name || errors.email || errors.password || !pic) {
      console.log(errors);
      return;
    }

    try {
      setLoading(true);
      const postData = {
        name: teacher.name,
        email: teacher.email,
        password: teacher.password,
        profilepic: pic,
      };

      const req = await axios.post("/teacher/", postData);

      

      if (req.data) {
        setLoading(false);
        createLocalObject("teacher", req.data);
        alert("Teacher is created");
      } else {
        setLoading(false);
      }
    } catch (error) {
      Swal.fire({
        title: "Server Errror",
        text: error.response.data.message,
        icon: "error",
      });
    }
  };

  return (
    <TeacherLoginBox>
      <FormSection>
        <FormTitle>Welcome Teacher</FormTitle>
        <RegisterForm>
          <InputField>
            <label>Name</label>
            <br />
            <Input
              name="name"
              type={"text"}
              onChange={handleChange}
              placeholder="e.g. John Doe"
            />
            {errors.name?.length > 0 && (
              <ErrorMessage>{errors.name}</ErrorMessage>
            )}
          </InputField>
          <InputField>
            <label>Email</label>
            <br />
            <Input
              type={"email"}
              name="email"
              onChange={handleChange}
              placeholder="e.g. johndoe@gmail.com"
            />
            {errors.email?.length > 0 && (
              <ErrorMessage>{errors.email}</ErrorMessage>
            )}
          </InputField>
          <InputField>
            <label>Password</label>
            <br />
            <Input
              type={"password"}
              name="password"
              onChange={handleChange}
              placeholder="***********"
            />
            {errors.password?.length > 0 && (
              <ErrorMessage>{errors.password}</ErrorMessage>
            )}
          </InputField>
          <InputField>
            <label>Profile Picture</label>
            <br />
            <Input
              type={"file"}
              name="pic"
              accept="image/x-png,image/jpeg"
              onChange={(e) => handleFile(e.target.files[0])}
            />
          </InputField>
          <InputField>
            <SubmitButton
              disabled={loading ? "disabled" : null}
              onClick={handleSubmit}
            >
              {loading ? <Spinner /> : "Submit"}
            </SubmitButton>
          </InputField>
        </RegisterForm>
        <UserExists>
          Already Registered,
          <a style={{ color: "black" }} href="/teacher/login">
            Login Here
          </a>
        </UserExists>
      </FormSection>
      <Border />
      <ImgSection>
        <Image src={teacherLoginImg} />
      </ImgSection>
    </TeacherLoginBox>
  );
};

export default TeacherRegister;
