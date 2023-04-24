import React from "react";
import styled from "styled-components";

const Container = styled.section`
  padding: 0.5rem 1rem;
`;

const Form = styled.form``;

const InputField = styled.div``;

const Input = styled.input`
  padding: 0.5rem 1rem;
  width: 100%;
  margin: 1rem 0;

  &:hover{
    outline: none;
  }
`;

const Label = styled.label`
  margin: 1rem 0;
`;

function AssignmentForm() {
  return (
    <Container>
      <Form>
        <InputField>
          <Label>
            Assignment Title
            <Input />
          </Label>
        </InputField>
      </Form>
    </Container>
  );
}

export default AssignmentForm;
