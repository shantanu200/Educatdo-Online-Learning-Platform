import asyncHandler from "express-async-handler";
import Teacher from "../models/Teacher.js";
import { sendMailtoTeacher } from "../services/mail.js";
import { generateOTP } from "../services/otp.js";

export const createTeacher = asyncHandler(async (req, res) => {
  if (!req.body) {
    res.status(400);
    throw new Error("Invalid Query is passed");
  }

  const { name, email, password } = req.body;

  const teacherExists = await Teacher.findOne({ email });

  if (teacherExists) {
    res.status(400);
    throw new Error("Already Teacher Exists");
  }

  const teacher = Teacher.create({
    name,
    email,
    password,
  });

  if (teacher) {
    res.status(200).json({
      _id: teacher._id,
      name: teacher.name,
      email: teacher.email,
    });
  } else {
    res.status(400);
    throw new Error("404!!,Server Side Render Error!");
  }
});

export const sendOTP = asyncHandler(async (req, res) => {
  if (!req.body) {
    res.status(200);
    throw new Error("Invalid Query is Passed");
  }
  const { email } = req.body;
  const teacherExists = await Teacher.findOne({ email });

  if (teacherExists) {
    const otp = generateOTP();

    try {
      sendMailtoTeacher({
        to: email,
        OTP: otp,
      });

      teacherExists.otp = otp;

      teacherExists
        .save()
        .then(() => res.status(200).json(`OTP is send on email :: ${email}`))
        .catch((err) =>
          res.status(400).json(`Invalid Server Response :: ${err}`)
        );
    } catch (err) {
      res.status(400);
      throw new Error("Server side error ${err}");
    }
  }
});

export const loginTeacher = asyncHandler(async (req, res) => {
  if (!req.body) {
    res.status(200);
    throw new Error("Invalid Server Query");
  }

  const { email, otp } = req.body;

  const teacherExists = await Teacher.findOne({ email });

  if (teacherExists) {
    if (teacherExists.otp === otp) {
      res.status(200).json(teacherExists);
    } else {
      res.status(400);
      throw new Error("Invalid OTP is Entered");
    }
  } else {
    res.status(400);
    throw new Error("Invalid teacher Id is passed");
  }
});

export const getInstructorByID = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const instructor = await Teacher.find({_id:id});

  if (instructor) {
    res.status(200).json(instructor);
  } else {
    res.status(400);
    throw new Error("Invalid ID passed");
  }
});


