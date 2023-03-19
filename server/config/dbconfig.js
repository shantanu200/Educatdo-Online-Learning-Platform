import mongoose from "mongoose";
import asyncHandler from "express-async-handler";

mongoose.set('strictQuery',true);

export const connectDB = asyncHandler(async () => {
  try {
    await mongoose
      .connect(process.env.dburl, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      })
      .then(() => console.log(`Database is connected to server application..`));
  } catch (error) {
    console.log(`Error :: ${error}`);
  }
});
