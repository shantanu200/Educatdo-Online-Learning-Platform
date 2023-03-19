import React, { useState } from "react";
import styled from "styled-components";
import { AiOutlineDown, AiOutlineUp} from "react-icons/all";

const Container = styled.section`
  padding: 1rem;
`;

const Title = styled.div`
  margin: 0.5rem 0;
  font-size: 1.2rem;
  font-weight: bold;
  margin: 0.5rem 0;
`;

const SingleLesson = styled.div`
  padding: 1rem;
  border: 1px solid black;
  margin: 0.5rem 0;

  &:hover {
    background-color: #6f38c5;
    color: white;
    transition: 0.3s all ease-in-out;
    cursor: pointer;
  }
`;

const ExpandedItem = styled.div`
  padding: 1rem;
  border: 1px solid black;
  margin: 0.5rem 0;
`;

const ItemTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: bold;
  font-size: 1.25rem;
`;

const VideoFrame = styled.video`
  margin: 1rem 0;
  width: 100%;
  height: 400px;
  border-radius: .3rem;
`;

const Description = styled.p`
  width: 100%;
  padding: 1rem;
  border: 1px solid black;
  margin: .5rem 0;
  border-radius: .3rem;
`;

const CourseAvail = styled.div`
  width: 100%;
  font-weight: bold;
  font-size: 1.5rem;
  text-align: center;
  border: 1px solid black;
  padding: 1rem;
`;

function LessonCatelog({ lesson }) {
  const [isOpen, setIsOpen] = useState(false);
  const [id, setID] = useState(-1);
  const handleItem = (id) => {
    setIsOpen(!isOpen);
    setID(id);
  };

  const renderSingleItem = () => {
    return (
      <>
        <ItemTitle>
          <span style={{fontWeight:"bold",fontSize:"1.5rem"}}>{lesson[id]?.title}</span> <AiOutlineUp style={{cursor:"pointer"}} />
        </ItemTitle>
        <Description>
          <b>Learning: </b> {lesson[id]?.description}
        </Description>
        <VideoFrame controls>
          <source src={lesson[id]?.url} />
        </VideoFrame>
      </>
    );
  };
  return (
    <Container>
      {lesson?.length === 0 ? (
        <CourseAvail>Course content is not available</CourseAvail>
      ) : isOpen ? (
        <>
          <Title>Course Content</Title>
          <ExpandedItem onClick={() => handleItem(id)}>
            {renderSingleItem()}
          </ExpandedItem>
        </>
      ) : (
        <>
          <Title>Course Content</Title>
          <div style={{ overflowY: "auto" }}>
            {lesson?.map((_, id) => {
              return (
                <SingleLesson key={id} onClick={() => handleItem(id)}>
                  <ItemTitle>
                    {_.title}
                    <AiOutlineDown style={{cursor:"pointer"}} />
                  </ItemTitle>
                </SingleLesson>
              );
            })}
          </div>
        </>
      )}
    </Container>
  );
}

export default LessonCatelog;
