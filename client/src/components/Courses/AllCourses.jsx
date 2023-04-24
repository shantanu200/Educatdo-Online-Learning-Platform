import axios, { all } from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SingleCourse from "./SingleCourse";

const Container = styled.section`
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
`;

const Courses = styled.section`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  padding-top: 1rem;
`

function AllCourses() {
  const [allCourses, setAllCourses] = useState([]);

  useEffect(() => {
    async function getData() {
      const { data } = await axios.get("/course/");
      setAllCourses(data);
    }
    getData();
  }, []);

  return <Container>
    <Title>Our Courses,</Title>
    <Courses>
    {allCourses.map((_,id) => {
      return <SingleCourse course={_} key={id} />
    })}
    </Courses>
  </Container>;
}

export default AllCourses;
