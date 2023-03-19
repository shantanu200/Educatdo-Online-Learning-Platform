import React, { useState } from "react";
import styled from "styled-components";
import { programmingSkillsCategories } from "../../../data/Category";
import { languages } from "../../../data/languages";
import { Levels } from "../../../data/Levels";
import { Price } from "../../../data/Price";
import uploadImage from "../../../images/upload.png";
import { getLocalObject } from "../../../locallStorage/local";
import {Spinner} from "../../../utils/SpinnerItem";
import Swal from "sweetalert2";
import axios from "axios";

const Box = styled.div`
  width: 75%;
  margin: 2rem auto;
  border: 1px solid #87a2fb;
  padding: 1rem;

  @media (max-width: 768px) {
    width: 90%;
  }
`;

const Title = styled.div`
  font-size: 2rem;
  font-weight: bold;
`;

const Form = styled.form`
  padding: 1rem 0;
`;

const InputField = styled.div`
  padding: 1rem 0;
`;

const Label = styled.label`
  font-weight: 600;
  font-size: 1.2rem;
  margin: 1rem 0;
  padding: 1rem 0;
`;

const Input = styled.input`
  padding: 0.7rem 1rem;
  width: 100%;
  font-size: 1.1rem;
  margin: 0.5rem 0;

  &:focus {
    outline: none;
  }
`;

const InputFile = styled.input`
  border: 1px solid black;
  padding: 0.7rem 1rem;
  width: 100%;
  font-size: 1rem;

  &:focus {
    outline: none;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  resize: none;
  padding: 1rem;
  font-size: 1.1rem;
  margin: 0.5rem 0;

  &:focus {
    outline: none;
  }
`;

const InputGroup = styled.div`
  width: 100%;
  display: flex;
  margin: 0.5rem 0;
`;

const Select = styled.select`
  padding: 0.7rem 1rem;
  font-size: 1.1rem;
  margin: 0.5rem 0;
  &:focus {
    outline: none;
  }
`;

const UploadImage = styled.img`
  padding: 1rem;
  border: 1px solid black;
  width: 40%;
  max-width: 20rem;
`;

const InputImageGrp = styled.div`
  width: 100%;
  display: flex;
  margin: 0.5rem 0;
`;

const ImageInput = styled.div`
  width: 60%;
  padding: 1rem;
`;

const TextContent = styled.p`
  padding: 1rem;
  font-size: 1.1rem;
`;

const Profile = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin: 0.5rem 0;
  border: 1px solid black;
  padding: 1rem;
`;

const ProfileImg = styled.img`
  width: 2rem;
  border-radius: 100%;
  margin-right: 1rem;
`;

const ProfileName = styled.div``;

const ButtonSection = styled.div`
  text-align: right;
`;
const Button = styled.button`
  padding: 0.8rem 1rem;
  background: #6f58c5;
  border: none;
  border-radius: 0.3rem;
  color: white;
  font-size: 1rem;
  width: 25%;
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

const CourseForm = ({setIsCreate}) => {
  const Teacher = getLocalObject("teacher");
  const [coverImage, setCoverImage] = useState("");
  const [Topics, setTopics] = useState([]);
  const [course, setCourse] = useState({
    title: "",
    description: "",
    instructor: Teacher?._id,
    language: languages[0],
    level: Levels[0],
    domain: programmingSkillsCategories[0],
    price: 0,
  });

  const [loading, setLoading] = useState(false);

  const handleTopics = (e) => {
    const value = e.target.value;

    let topics = [];

    let singleTopic = "";
    for (let i = 0; i < value.length; i++) {
      if (value[i] !== ",") {
        singleTopic += value[i];
      } else {
        !topics.includes(singleTopic) ? topics.push(singleTopic) : null;
        singleTopic = "";
      }
    }
    !topics.includes(singleTopic) ? topics.push(singleTopic) : null;

    setTopics(topics);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCourse({
      ...course,
      [name]: value,
    });
  };

  const handleCoverImage = async (post) => {
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
          setCoverImage(data.url.toString());
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

  const handleButton = async () => {
    if (!course.title || !course.description || !Topics) {
      Swal.fire({
        title: "Empty Form",
        icon: "error",
        text: "Please Fillout complete Form",
      });
      return;
    } else if (!coverImage) {
      Swal.fire({
        title: "No CoverImage",
        icon: "warning",
        text: "Please Select CoverImage",
      });
      return;
    } else if (course.level === Levels[0]) {
      Swal.fire({
        title: "Invalid Level",
        icon: "warning",
        text: "Please Select Valid Level",
      });
      return;
    } else if (course.domain === programmingSkillsCategories[0]) {
      Swal.fire({
        title: "Invalid Domain",
        icon: "warning",
        text: "Please Select Valid Domain",
      });
      return;
    } else if (course.price == 0) {
      Swal.fire({
        title: "Invalid Price",
        icon: "warning",
        text: "Please Enter Price Detailse",
      });
      return;
    }

    try {
      const postData = {
        title: course.title,
        description: course.description,
        instructor: course.instructor,
        language: course.language,
        level: course.level,
        domain: course.domain,
        price: course.price,
        coverImage: coverImage,
        topics: Topics,
      };
      const { data } = await axios.post("/course/", postData);

      if (data) {
        setIsCreate(false);
        Swal.fire({
          title: "Course Created",
          text: `Course Created by Title ${course.title}`,
          icon: "success",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Server Side Error",
        icon: "warning",
        text: "",
      });
    }
  };

  return (
    <Box>
      <Title>Create Course,</Title>
      <Form onSubmit={(e) => e.preventDefault()}>
        <InputField>
          <Label>
            Course Title
            <Input name="title" onChange={handleChange} />
          </Label>
        </InputField>
        <InputField>
          <Label>
            Course Description
            <TextArea
              name="description"
              onChange={handleChange}
              rows={5}
              cols={30}
            ></TextArea>
          </Label>
        </InputField>
        <InputField>
          <Label>
            Basic Info
            <InputGroup>
              <Select
                name="language"
                onChange={handleChange}
                style={{ width: "33%", marginRight: ".5rem" }}
              >
                {languages.map((_, id) => {
                  return <option key={id}>{_}</option>;
                })}
              </Select>
              <Select
                name="level"
                onChange={handleChange}
                style={{ width: "33%", marginRight: ".5rem" }}
              >
                {Levels.map((_, id) => {
                  return <option key={id}>{_}</option>;
                })}
              </Select>
              <Select
                name="domain"
                onChange={handleChange}
                style={{ width: "33%", marginRight: ".5rem" }}
              >
                {programmingSkillsCategories.map((_, id) => {
                  return <option key={id}>{_}</option>;
                })}
              </Select>
            </InputGroup>
          </Label>
        </InputField>
        <InputField>
          <Label>Cover Image of Course</Label>
          <br />
          <InputImageGrp>
            <UploadImage alt="" src={uploadImage} />
            <ImageInput>
              <TextContent>
                Upload your course image here. It must meet our{" "}
                <b>course image quality standards</b> to be accepted. Important
                guidelines: <b>Image Size: Max 2MB</b>; .jpg, .jpeg,. gif, or
                .png. no text on the image
              </TextContent>
              <InputFile
                type={"file"}
                accept="image/x-png,image/jpeg"
                onChange={(e) => handleCoverImage(e.target.files[0])}
              />
            </ImageInput>
          </InputImageGrp>
        </InputField>
        <InputGroup>
          <InputField style={{ width: "25%", marginRight: "1rem" }}>
            <Label>
              Price of Course(INR)
              <Select
                name="price"
                onChange={handleChange}
                style={{ width: "100%" }}
              >
                {Price.map((_, id) => {
                  return (
                    <option value={Number(_.value)} key={id}>
                      {_.range}
                    </option>
                  );
                })}
              </Select>
            </Label>
          </InputField>
          <InputField style={{ width: "75%" }}>
            <Label>
              Topics Covered{" "}
              <span
                style={{ fontSize: "1rem", marginLeft: "1rem", color: "green" }}
              >
                (Please Enter values seperated by ',')
              </span>
              <Input
                onChange={handleTopics}
                placeholder="e.g. HTML,CSS,NodeJs......."
              />
            </Label>
          </InputField>
        </InputGroup>
        <InputField>
          <Label>
            Instructor Profile
            <Profile>
              <ProfileImg alt="" src={Teacher?.profilepic} />
              <ProfileName>{Teacher?.name}</ProfileName>
            </Profile>
          </Label>
        </InputField>
        <ButtonSection>
          <Button disabled={loading ? "disabled" : null} onClick={handleButton}>
            {loading ? <Spinner /> : "Submit"}
          </Button>
        </ButtonSection>
      </Form>
    </Box>
  );
};

export default CourseForm;
