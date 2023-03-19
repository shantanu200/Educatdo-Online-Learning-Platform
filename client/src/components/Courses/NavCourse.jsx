import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineBell,
} from "react-icons/ai";

//styled Components
const Navbar = styled.div`
  width: 100%;
  position: sticky;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #6f38c5;
`;

const Search = styled.div`
  width: 45%;
  text-align: right;
`;

const SearchBar = styled.input`
  width: 100%;
  padding: 0.8rem 1rem;
  border-radius: 0.2rem;
  border: none;
  font-size: 1rem;

  &:focus {
    outline: none;
  }
`;

const TextContent = styled.div`
  width: 15%;
`;

const Text = styled.p`
  font-size: 2rem;
  font-weight: bold;
  color: white;
  user-select: none;
`;

const Action = styled.div`
  width: 30%;
  display: flex;
  align-items: center;
`;

const Item = styled.li`
  width: 30%;
  list-style: none;
`;

const SubItem = styled.a`
  text-decoration: none;
  color: white;
`;

const Icons = styled.li`
  width: 70%;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
  color: white;
`;

const LoginButton = styled.button`
  padding: .5rem;
  width: 25%;
  background-color: #87a2fb;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 1rem;

  &:hover{
    color: black;
    transition: .3s all ease-in-out;
  }
`;

const NavCourse = ({ setCourses, setQuery, query }) => {
  useEffect(() => {
    async function getData() {
      const { data } =
        query !== ""
          ? await axios.get(`/course/searchCourse/?search=${query}`)
          : [];
      setCourses(data);
    }
    getData();
  }, [query]);

  return (
    <Navbar>
      <TextContent>
        <Text>Educatdo</Text>
      </TextContent>
      {/* <TextContent>
        <Text>Invest in Learning: Unlock Your Potential!</Text>
      </TextContent> */}
      <Search>
        <SearchBar
          placeholder="Search for Course...."
          onChange={(e) => setQuery(e.target.value)}
        />
      </Search>
      <Action>
        <Item>
          <SubItem href="#">My Learning</SubItem>
        </Item>
        <Icons>
          <AiOutlineShoppingCart />
          <AiOutlineBell />
          <AiOutlineHeart />
          {<LoginButton>Sign In</LoginButton>}
        </Icons>
      </Action>
    </Navbar>
  );
};

export default NavCourse;
