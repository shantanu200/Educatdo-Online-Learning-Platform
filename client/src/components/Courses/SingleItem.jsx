import React from "react";
import styled from "styled-components";
import {FaChalkboardTeacher} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Item = styled.div`
  margin: 1rem 0;
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #87a2fb;
  border-radius: 0.3rem;
  display: flex;
  align-items: center;
  user-select: none;

  &:hover{
    scale : 1.05;
    transition: .3s all ease-in-out;
  }
`;

const Cover = styled.div`
  width: 40%;
`;

const Image = styled.img`
  width: 100%;
  max-width: 20rem;
  border-radius: 0.3rem;
`;

const Details = styled.div`
  width: 60%;
  padding: 0.5rem;
`;

const TitleSection = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h2``;

const Price = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
  color: #6f38c5;
`;

const Desc = styled.p``;

const Instructor = styled.a`
   padding: .5rem 0;
   font-size: 1rem;
   text-decoration: none;
   color: black;
   display: flex;
   align-items: center;
`;
const Reviews = styled.div`
  display: flex;
  padding: .5rem 0;
`;

const Info = styled.p`
  color: gray;
`;

function SingleItem({ course }) {
  const navigate = useNavigate();
  function convertDescription(text) {
    let convert = "";
    for (let i = 0; i < text?.length; i++) {
      if (text[i] === ".") {
        break;
      }
      convert += text[i];
    }
    return convert;
  }
  
  return (
    <Item onClick={() => navigate(`/teacher/coursedetails/${course?._id}`)}>
      <Cover>
        <Image alt="" src={course?.coverImage} />
      </Cover>
      <Details>
        <TitleSection>
          <Title>{course?.title}</Title>
          <Price>₹ {course?.price}</Price>
        </TitleSection>
        <p style={{ padding: "1rem 0" }} align="justify">
          {convertDescription(course?.description)}.
        </p>
        <Instructor href={`/teacher/${course?.instructor}`}><FaChalkboardTeacher style={{marginRight:".5rem"}} />Shantanu Bhusari</Instructor>
        <Reviews>
          <Info>{course?.language} | </Info>
          <Info style={{marginLeft:".5rem"}}>{course?.lessons?.length} Lessons | </Info>
          <Info style={{marginLeft:".5rem"}}>{course?.topics?.length} Topics | </Info>
          <Info style={{marginLeft:".5rem"}}>{course?.level}</Info>
        </Reviews>
      </Details>
    </Item>
  );
}

export default SingleItem;
