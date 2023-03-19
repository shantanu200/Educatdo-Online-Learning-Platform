import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { getLocalObject } from "../../../locallStorage/local";
import SingleCourse from "./SingleCourse";
import styled from "styled-components";

const Box = styled.div`
  width: 90%;
  margin: 1rem auto;
  padding: 2rem;
`;

const Title = styled.div`
  font-size: 2rem;
  font-weight: bold;
`;

const Catelog = styled.div`
  margin: 1rem 0;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`

function CourseCatelog() {
  const id = getLocalObject("teacher")?._id;
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function getData() {
      const { data } = await axios.get(`/course/courses/${id}`);
      setCourses(data);
    }
    getData();
  }, [id]);

  console.log(courses);

  return (
    <Box>
      <Title>Your Courses,</Title>
      <Catelog>
        {courses.map((course, idx) => {
          return <SingleCourse course={course} />;
        })}
      </Catelog>
    </Box>
  );
}

export default CourseCatelog;
