import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import CreateAssignement from '../../../components/Teacher/Assignment/CreateAssignement';
import CourseInfo from '../../../components/Teacher/Course/CourseInfo';
import SingleCourseDetail from '../../../components/Teacher/Course/CourseInfo';

function CourseDetail() {
  const location = useLocation();
  const id = location.pathname.split("/")[3];
  const [course,setCourse] = useState({});

  useEffect(() => {
    async function getData(){
        const {data} = await axios.get(`/course/coursedetails/${id}`);
        setCourse(data);
    };
    getData();
  },[id]);
  return (
    <main>
        <CourseInfo course={course} />
        <CreateAssignement />
    </main>
  )
}

export default CourseDetail