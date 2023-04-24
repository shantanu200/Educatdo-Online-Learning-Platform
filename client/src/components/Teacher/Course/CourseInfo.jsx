import React from "react";
import styled from "styled-components";
import { FaChalkboardTeacher } from "react-icons/fa";
import { AiOutlineFieldTime } from "react-icons/ai";
import { useState } from "react";
import CourseContent from "./CourseContent";

const CourseDetailComp = styled.section`
  width: 80%;
  margin: 1rem auto;
  display: flex;
  border: 1px solid #87a2fb;
  border-radius: .5rem ;
  @media (max-width: 768px) {
    width: 90%;
    flex-direction: column;
  }
`;

const Left = styled.div`
  width: 40%;
  background-color: #6f38c5;
  color: white;
  padding: 2rem;
  border-radius: .5rem 0 0 .5rem;
  @media (max-width: 1024px) {
    width: 50%;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Right = styled.div`
  width: 60%;
`;

const ImageSection = styled.div`
  width: 100%;
`;

const Image = styled.img`
  width: 100%;
  max-width: 1024px;
  border-radius: 0.8rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin: 1rem 0;
`;

const Description = styled.p``;

const Instructor = styled.p`
  margin: 1.5rem 0;
  font-size: 1rem;
  font-weight: bold;
  display: flex;
  align-items: center;
`;

const UpdateField = styled.input`
  width: 100%;
  padding: 1rem;

  &:focus {
    outline: none;
  }
`;

const Domains = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Topic = styled.p`
  padding: 0.5rem;
  margin-right: 1rem;
  background-color: #87a2fb;
  font-size: 1rem;
  border-radius: 0.3rem;
`;

const Information = styled.div`
  margin: 1rem 0;
  padding: 1rem 0;
  display: inline-flex;
  align-items: center;
`;

const Item = styled.p`
  margin-right: 1rem;
  font-size: 18px;
`;

const Create = styled.div`
  font-size: 1rem;
  display: inline-flex;
  align-items: center;
  font-weight: bold;
`;

const Content = styled.div``;

function CourseInfo({ course }) {
  const convertDate = (dateStr) => {
    const date = new Date(dateStr);

    const day = date.toLocaleString("en-us", { weekday: "long" });
    const month = date.toLocaleString("en-us", { month: "long" });
    const dateNum = date.getDate();
    const year = date.getFullYear();
    const time = date.toLocaleTimeString("en-us", {
      hour12: true,
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });

    const formattedDate = `${day}, ${month} ${dateNum}, ${year} ${time}`;
    return formattedDate;
  };
  const [isUpadate, setIsUpadate] = useState(false);

  return (
    <CourseDetailComp>
      <Left>
        <ImageSection>
          <Image src={course?.coverImage} />
        </ImageSection>
        <Title>
          {isUpadate ? <UpdateField value={course?.title} /> : course?.title}
        </Title>
        <p style={{ fontSize: "16px" }} align="justify">
          {course?.description}
        </p>
        <Instructor style={{ fontSize: "16px" }}>
          <FaChalkboardTeacher style={{ marginRight: "1rem" }} />
          Shantanu Bhusari
        </Instructor>
        <Domains>
          {course?.topics?.map((_, id) => {
            return <Topic>{_}</Topic>;
          })}
        </Domains>
        <Information>
          <Item>{course?.language} | </Item>
          <Item>{course?.lessons?.length} Lessons | </Item>
          <Item>{course?.level}</Item>
        </Information>
        <Create style={{ marginRight: "1rem", fontSize: "16px" }}>
          <AiOutlineFieldTime style={{marginRight:"10px",fontSize:"1.25rem"}} />
          {convertDate(course?.createdAt)}
        </Create>
      </Left>
      <CourseContent course={course} />
    </CourseDetailComp>
  );
}

export default CourseInfo;
