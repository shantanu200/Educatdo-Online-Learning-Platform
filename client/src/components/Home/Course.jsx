import React from "react";
import { courses } from "../../data/course";
import "./Course.css";
import CourseCard from "./CourseCard";

const Course = () => {
  return (
    <section className="course">
      <div className="title">
        <h3>Our Featured Courses</h3>
        <p>
          Our Featured Course is designed to provide comprehensive knowledge and
          practical skills to help you achieve your career goals and succeed in
          today's competitive job market.
        </p>
      </div>
      <div className="course-catelog">
        {courses.map((_, id) => {
          return <CourseCard key={id} CourseItem={_} />;
        })}
      </div>
    </section>
  );
};

export default Course;
