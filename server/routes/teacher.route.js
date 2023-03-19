import express from "express";
import { createTeacher, getInstructorByID, loginTeacher, sendOTP } from "../controllers/teacher.controller.js";

const router = express.Router();

/* 
@Private Route : /
@Method : POST
@Function : Create teacher data
*/

router.route("/").post(createTeacher)

/*
@Private Route : /login
@Method : POST
@Function : Login Teacher User
*/

router.route("/sendOTP").post(sendOTP);

router.route("/login").post(loginTeacher);

router.route("/:id").get(getInstructorByID);




export default router;
