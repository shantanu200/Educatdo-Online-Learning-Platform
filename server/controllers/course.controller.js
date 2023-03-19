import asyncHandler from "express-async-handler";
import Course from "../models/Course.js";

export const getCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find({});

  if (courses) {
    res.status(200).json(courses);
  } else {
    res.status(400);
    throw new Error("No Courses Found");
  }
});

export const createCourse = asyncHandler(async (req, res) => {
  if (!req.body) {
    res.status(400);
    throw new Error("Invalid Query is passed");
  }

  const {
    title,
    description,
    language,
    level,
    domain,
    instructor,
    price,
    topics,
    coverImage,
  } = req.body;

  const course = await Course.create({
    title,
    description,
    language,
    level,
    domain,
    instructor,
    price,
    topics,
    coverImage,
  });

  if (course) {
    res.status(201).json("Course Created by Instructor");
  } else {
    res.status(400);
    throw new Error("Server Side error occured");
  }
});

export const getCourseByInstructor = asyncHandler(async (req, res) => {
  let id = req.params.id;

  const course = await Course.find({ instructor: id });

  if (course) {
    res.status(200).json(course);
  } else {
    res.status(400);
    throw new Error("No Courses found");
  }
});

export const getCourseByID = asyncHandler(async (req, res) => {
  let id = req.params.id;

  const course = await Course.findById(id);

  if (course) {
    res.status(200).json(course);
  } else {
    res.status(400);
    throw new Error("No Courses found");
  }
});

export const SearchCourse = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { title: { $regex: req.query.search, $options: "i" } },
          { domain: { $regex: req.query.search, $options: "i" } },
          { topics: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};
  const courses = await Course.find(keyword);

  if (courses) {
    res.status(200).json(courses);
  } else {
    res.status(400);
    throw new Error("Invalid Queries");
  }
});

export const createLesson = asyncHandler(async (req, res) => {
  let id = req.params.id;

  const course = await Course.find({ _id: id });

  if (!req.body) {
    res.status(400);
    throw new Error("Invalid Query is passed");
  }

  let lesson = req.body;

  const data = { $push: { lessons: lesson } };

  const newCourse = await Course.updateOne(course, data);

  if (newCourse) {
    res.status(201).json(newCourse);
  } else {
    res.status(400);
    throw new Error("Error");
  }
});

export const createAssignment = asyncHandler(async (req, res) => {
  let id = req.params.id;

  const course = await Course.findById(id);

  if (!req.body) {
    res.status(400);
    throw new Error("Invalid Query is passed");
  }

  if (course) {
    let assign = { $push: { assignment: req.body } };

    const updateCoure = await Course.updateOne(course, assign);

    if (updateCoure) {
      res.status(200).json("Assignment is added to course");
    } else {
      res.status(400);
      throw new Error("Server Side Error occured");
    }
  }
});
