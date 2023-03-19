import React, { useState } from 'react'
import CourseCatelog from '../../../components/Teacher/Course/CourseCatelog';
import CourseForm from '../../../components/Teacher/Course/CourseForm';
import CreateCourse from '../../../components/Teacher/Course/CreateCourse'
import NavbarTeacherCourse from '../../../components/Teacher/Course/NavbarTeacherCourse'

const TeacherCourse = () => {
  const [isCreate,setIsCreate] = useState(false);
  return (
    <main>
        <NavbarTeacherCourse />
        <CreateCourse isCreate={isCreate} setIsCreate={setIsCreate} />
        {isCreate && <CourseForm setIsCreate={setIsCreate} />}
        <CourseCatelog />
    </main>
  )
}

export default TeacherCourse