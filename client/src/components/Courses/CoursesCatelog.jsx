import React from "react";
import styled from "styled-components";
import SingleItem from "./SingleItem";
import {LargeSpinner, Spinner} from "../../utils/SpinnerItem";
import { AiOutlineDown } from "react-icons/ai";

const Box = styled.section`
  width: 90%;
  margin: 1rem auto;
  padding: 1rem;
`;

const Title = styled.div`
  width: 100%;
  font-size: 2rem;
  font-weight: bold;
`;

const Container = styled.div`
  width: 100%;
  margin: 2rem 0;
  display: flex;
`;

const Action = styled.div`
  width: 30%;
`;

const Items = styled.div`
  width: 70%;
  margin-left: 4rem;
`;

const SubAction = styled.div`
  padding: 1rem;
  font-size: 1.3rem;
  font-weight: bold;
  border-bottom: 1px solid black;
  display: flex;
  justify-content: space-between;
`;

function CoursesCatelog({ courses, query }) {
  return (
    query && <Box>
      <Title>
        {courses?.length} results for "{query}"
      </Title>
      <Container>
        <Action>
          <SubAction>Ratings<AiOutlineDown /></SubAction>
          <SubAction>Languages<AiOutlineDown /></SubAction>
          <SubAction>Video Duration<AiOutlineDown /></SubAction>
          <SubAction>Features<AiOutlineDown /></SubAction>
          <SubAction>Topics<AiOutlineDown /></SubAction>
          <SubAction>Levels<AiOutlineDown /></SubAction>
        </Action>
        <Items>
          {courses?.map((course, idx) => {
            return <SingleItem course={course} />;
          })}
        </Items>
      </Container>
    </Box>
  );
}

export default CoursesCatelog;
