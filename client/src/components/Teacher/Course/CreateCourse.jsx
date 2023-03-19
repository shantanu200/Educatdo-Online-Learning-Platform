import React from "react";
import styled from "styled-components";

const Box = styled.div`
  width: 90%;
  padding: 2rem;
  border: 1px solid #87a2fb;
  margin: 1rem auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  user-select: none;
`;
const TextContent = styled.div``;
const Text = styled.h1``;
const Action = styled.div``;
const Button = styled.button`
  padding: 0.8rem 1rem;
  background: #6f58c5;
  border: none;
  border-radius: 0.3rem;
  color: white;
  font-size: 1rem;

  &:hover {
    background: #87a2fb;
    cursor: pointer;
    transition: 0.3s all ease-in;
    color: black;
  }
`;

const SubHead = styled.p``;

const CreateCourse = ({isCreate,setIsCreate}) => {
  return (
    <Box>
      <TextContent>
        <Text>Join Community,</Text>
        <SubHead>
          Designing Effective Learning Experiences: A Course for Educators
        </SubHead>
      </TextContent>
      <Action>
        <Button onClick={() => setIsCreate(!isCreate)}>Create Course</Button>
      </Action>
    </Box>
  );
};

export default CreateCourse;
