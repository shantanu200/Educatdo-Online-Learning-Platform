import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AssignmentDetails from "./AssignmentDetails";
import AssignmentForm from "./AssignmentForm";

const Container = styled.section`
  width: 80%;
  margin: 1rem auto;
`;

const Title = styled.div`
  font-size: 1.5rem;
  padding: 1rem;
  background-color: #6f38c5;
  color: white;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const PopulateButton = styled.button`
  padding: 0.5rem;
  background-color: #87a2fb;
  border: none;
  border-radius: 0.3rem;
  cursor: pointer;
  color: white;

  &:hover {
    color: black;
    transition: 0.3s all ease-in-out;
  }
`;

const Empty = styled.p`
  padding: 2rem;
  text-align: center;
  font-weight: bold;
  font-size: 1.5rem;
  border: 1px solid black;
  margin: 0.5rem 0;
`;

function CreateAssignement() {
  const path = window.location.pathname.split("/")[2];
  const [assignment, setAssignment] = useState(["dummy"]);
  const [isUpload, setIsUpload] = useState(true);

  useEffect(() => {
    async function getData() {
      const { data } = await axios.get(`/course/assingnment/${path}`);
      setAssignment(data);
    }

    getData();
  }, [path]);

  return (
    <Container>
      <Title>
        Assignment Section
        <PopulateButton>Upload Assignment</PopulateButton>
      </Title>
      {assignment.length > 0 ? (
        isUpload ? <AssignmentForm /> : <AssignmentDetails />
      ) : (
        <Empty>Assignment Not Found for these course.</Empty>
      )}
    </Container>
  );
}

export default CreateAssignement;
