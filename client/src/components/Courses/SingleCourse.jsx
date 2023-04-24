import React from "react";
import styled from "styled-components";

const Card = styled.div`
  width: 20rem;
  margin-right: 1rem;
  border: 1px solid #6f38c5;
  padding: 0.5rem;
  border-radius: 0.3rem;

  &:hover {
    cursor: pointer;
    scale: 1.05;
    transition: 0.3s all ease-out;
  }
`;

const CoverImage = styled.img`
  max-width: 20rem;
  width: 100%;
  aspect-ratio: 2/1;
`;

const Title = styled.h3`
  font-size: 1.5rem;
`;

const Tags = styled.p`
  margin: 0.5rem 0;
  font-size: 1rem;
`;

const Price = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
  color: #6f38c5;
`;

const Items = styled.div`
  display: flex;
  align-items: center;
  padding: .5rem 0;
`;



const Student = styled.p``;

const Lesson = styled.p``;

const Item = styled.span`
  font-weight: bold;
  margin-left: 10px;
`;

const Educator = styled.div`
  padding: .5rem 0;
  text-align: center;
  border: 1px solid black;
`;

function SingleCourse({ course }) {
  return (
    <Card>
      <CoverImage alt="" src={course?.coverImage} />
      <Title>{course?.title}</Title>
      <Tags>{course?.topics.join(", ")}</Tags>
      <Price>₹. {course?.price}</Price>
      <Items>
        <Lesson>
          Lessons ::<Item>{course?.lessons?.length}</Item>
        </Lesson>
        <span style={{ margin: "0 20px" }}>|</span>
        <Student>
          Student :: <Item>{course?.enrolledUsers?.length}</Item>
        </Student>
      </Items>
      <Educator>Shantanu Bhusari</Educator>
    </Card>
  );
}

export default SingleCourse;
