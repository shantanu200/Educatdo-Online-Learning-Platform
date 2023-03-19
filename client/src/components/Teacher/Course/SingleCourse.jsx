import React from "react";
import { HiUser } from "react-icons/hi";
import { MdPlayLesson } from "react-icons/md";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";

const Box = styled.div`
  width: 30%;
  border: 1px solid #87a2fb;
  padding: 0.5rem;
  border-radius: 0.3rem;
  margin: 1rem;
`;
const CoverImg = styled.img`
  width: 100%;
  max-width: 800px;
  border-radius: 0.3rem;
  aspect-ratio: 2/1;
`;
const Name = styled.div`
  padding: 1rem 0;
  width: 100%;
  display: flex;
  align-items: center;
`;
const Title = styled.div`
  width: 75%;
  font-weight: bold;
  font-size: 1.3rem;
  text-transform: uppercase;
`;
const Price = styled.div`
  width: 25%;
  text-align: center;
  color: #6f58c5;
  font-weight: bold;
  font-size: 1.2rem;
`;

const Categories = styled.div`
  padding: 0.5rem 0;
  display: flex;
  flex-wrap: wrap;
`;

const Category = styled.p`
  font-size: 1.1rem;
  padding: 0.5rem;
  background: #eeeeee;
  margin: 0.2rem 0.3rem;
  border-radius: 0.3rem;
`;

const Information = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Lessons = styled.p`
  display: flex;
  align-items: center;
  padding: 1rem 0.3rem;
  color: #626262;
  font-weight: bold;
`;
const Students = styled.p`
  display: flex;
  align-items: center;
  padding: 1rem 0.3rem;
  color: #626262;
  font-weight: bold;
`;

const DateType = styled.div`
  padding: 1rem 0.3rem;
  font-weight: 600;
  font-size: 1rem;
`;

const Button = styled.button`
  padding: 0.8rem 1rem;
  background: #6f58c5;
  border: none;
  border-radius: 0.3rem;
  color: white;
  font-size: 1rem;
  width: 100%;
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

function SingleCourse({ course }) {
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

  const navigate = useNavigate();
  return (
    <Box>
      <CoverImg alt="" src={course?.coverImage} />
      <Categories>
        {course?.topics?.map((cat, id) => {
          return <Category>{cat}</Category>;
        })}
      </Categories>
      <Name>
        <Title>{course?.title}</Title>
        <Price>Rs. {course?.price}</Price>
      </Name>
      <Information>
        <Lessons>
          <MdPlayLesson style={{ marginRight: ".5rem" }} />
          {course?.lessons?.length} Lessons
        </Lessons>
        <Students>
          <HiUser style={{ marginRight: ".5rem" }} />
          {course?.enrolledUsers?.length} Student
        </Students>
      </Information>
      <DateType>{convertDate(course?.createdAt)}</DateType>
      <Button onClick={() => navigate(`/teacher/coursedetails/${course?._id}`)}>Check Course</Button>
    </Box>
  );
}

export default SingleCourse;
