import { Route, Routes } from "react-router-dom";
import { getLocalObject } from "./locallStorage/local";
import CoursePage from "./pages/Courses/CoursePage";
import Home from "./pages/Home";
import StudentCourse from "./pages/Student/StudentCourse";
import StudentLoginPage from "./pages/Student/StudentLoginPage";
import CourseDetail from "./pages/Teacher/Courses/CourseDetail";
import TeacherCourse from "./pages/Teacher/Courses/TeacherCourse";
import TeacherLoginPage from "./pages/Teacher/TeacherLoginPage";

function App() {
  const Teacher = getLocalObject("teacher");
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/student/:id" element={<StudentLoginPage />} />
      <Route path="/student/course/:id" element={<StudentCourse />} />
      <Route path="/teacher/:id" element={<TeacherLoginPage />} />
      <Route path="/courses" element={<CoursePage />} />
      <Route path="/teacher/course/:id" element={Teacher ? <TeacherCourse/> : <TeacherLoginPage />} />
      <Route path="/teacher/coursedetails/:id" element={Teacher ? <CourseDetail /> : <TeacherLoginPage />} />
    </Routes>
  );
}

export default App;
