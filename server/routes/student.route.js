import express from "express";
import { deleteStudent, loginStudent, registerStudent, sendOTP, updateStudent } from "../controllers/student.controller.js";
const router = express.Router();

/* 
@Private Route : /register
@Method : POST
@Function : Create student data
*/
router.route("/register").post(registerStudent);

/* 
@Private Route : /sendOTP
@Method : POST
@Function : Send OTP on email
*/
router.route("/sendOTP").post(sendOTP);

/* 
@Private Route : /login
@Method : POST
@Function : Login Student
*/
router.route("/login").post(loginStudent);


/* 
@Private Route : /update/:id
@Method : POST
@Function : Update Student details
*/
router.route("/update/:id").post(updateStudent);


/* 
@Private Route : /delete/:id
@Method : POST
@Function : Delete Student details
*/
router.route("/delete/:id").post(deleteStudent);



export default router;