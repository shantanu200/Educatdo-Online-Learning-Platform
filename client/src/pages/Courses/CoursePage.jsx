import React, { useState } from 'react'
import AllCourses from '../../components/Courses/AllCourses';
import CoursesCatelog from '../../components/Courses/CoursesCatelog';
import NavCourse from '../../components/Courses/NavCourse'
import { LargeSpinner } from '../../utils/SpinnerItem';

const CoursePage = () => {
  const [courses,setCourses] = useState([]);
  const [query,setQuery] = useState("");
  return (
    <main>
        <NavCourse setCourses={setCourses} query={query} setQuery={setQuery} />
        {query ? <CoursesCatelog courses={courses} query={query} /> : <AllCourses />}
    </main>
  )
}

export default CoursePage