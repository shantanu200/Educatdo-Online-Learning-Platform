import React from 'react'
import styled from 'styled-components'

const Container = styled.section`
  
`

const Form = styled.form``;

const InputField = styled.div``;

const Input = styled.input``;

const Label = styled.label``;

function AssignmentForm() {
  return (
    <Container>
        <Form>
            <InputField>
                <Label>Assignment Title</Label>
                <Input />
            </InputField>
        </Form>
    </Container>
  )
}

export default AssignmentForm