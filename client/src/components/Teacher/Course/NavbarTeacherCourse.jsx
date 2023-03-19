import React from "react";
import styled from "styled-components";
import { getLocalObject } from "../../../locallStorage/local";

const Navbar = styled.div`
  width: 100%;
  position: sticky;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #6f38c5;
`;

const TextContent = styled.div`
  color: white;
`;

const Heading = styled.h1``;

const SubHeading = styled.p``;

const NavContent = styled.div``;

const ListGroup = styled.ul`
  display: flex;
  align-items: center;
  margin-right: 2rem;
`;

const List = styled.li`
  color: white;
  padding: 0 2rem;
  list-style: none;
  font-size: 1.2rem;

  &:hover {
    scale: 1.1;
    transition: 0.3s all ease-out;
  }
`;
const LinkItem = styled.a`
  text-decoration: none;
  color: white;

  &:hover {
    text-decoration: underline;
  }
`;

const Profile = styled.a`
  &:hover {
    scale: 1.1;
    transition: 0.3s all ease-out;
  }
`;
const Icon = styled.img`
  width: 2rem;
  border-radius: 100%;

  &:hover {
    cursor: pointer;
  }
`;

const NavbarTeacherCourse = () => {
  const Teacher = getLocalObject("teacher");
  return (
    <Navbar>
      <TextContent>
        <Heading>Sell Course</Heading>
        <SubHeading>
          Innovative Teaching Strategies for Student Empowerment
        </SubHeading>
      </TextContent>
      <NavContent>
        <ListGroup>
          <List>
            <LinkItem href="/">Courses</LinkItem>
          </List>
          <List>
            <LinkItem href="#">Quiz</LinkItem>
          </List>
          <List>
            <LinkItem href="#">Discussion</LinkItem>
          </List>
          <Profile href={`/teacher/profile/${Teacher._id}`}>
            <Icon alt="" src={Teacher?.profilepic} />
          </Profile>
        </ListGroup>
      </NavContent>
    </Navbar>
  );
};

export default NavbarTeacherCourse;
