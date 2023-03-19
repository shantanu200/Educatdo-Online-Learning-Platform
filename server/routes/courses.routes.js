import express from "express";
import { createAssignment, createCourse, createLesson, getCourseByID, getCourses, SearchCourse } from "../controllers/course.controller.js";

const router = express.Router();

router.route("/").get(getCourses).post(createCourse)

router.route("/courses/:id").get(getCourses);

router.route("/coursedetails/:id").get(getCourseByID);

router.route("/searchCourse").get(SearchCourse);

router.route("/lesson/:id").post(createLesson);

router.route("/assignment/:id").post(createAssignment);

export default router;