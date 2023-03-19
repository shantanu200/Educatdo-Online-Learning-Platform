import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  instructor: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
  domain: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number,
  },
  topics: {
    type: [String],
    required: true,
  },
  enrolledUsers: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Student",
  },
  lessons: [
    {
      type:Object,
    },
  ],
  reviews: [
    {
      student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
      rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true,
      },
      comment: String,
    },
  ],
  coverImage: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  assignment:{
    type:[Object],  
  }
});

export default mongoose.model("Course", courseSchema);
