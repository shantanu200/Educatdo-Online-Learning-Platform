import React, { useState } from "react";
import styled from "styled-components";
import { AiOutlineCloudUpload } from "react-icons/all";
import { Spinner } from "../../../utils/SpinnerItem";
import Swal from "sweetalert2";
import axios from "axios";
import LessonCatelog from "./LessonCatelog";

const Contianer = styled.section`
  margin: 0 1rem;
  width: 60%;

  @media (max-width: 768px) {
    margin: 1rem 0;
    width: 90%;
  }
`;

const LessonLength = styled.p`
  padding: 1rem;
  font-size: 2rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid black;
`;
const Upload = styled.button`
  padding: 0.8rem 1rem;
  background-color: #6f38c5;
  color: white;
  border: none;
  display: flex;
  align-items: center;
  font-size: 16px;

  &:hover {
    background-color: #87a2fb;
    color: black;
    transition: 0.3s all ease-in-out;
    cursor: pointer;
  }
`;

const UploadForm = styled.form`
  padding: 1rem;
  width: 100%;
`;

const Title = styled.div`
  font-size: 1.5rem;
  font-weight: bolder;
  color: #6f38c5;
`;

const InputField = styled.div`
  margin: 1rem 0;
`;

const Label = styled.label`
  font-size: 1rem;
  margin: 1rem 0;
  padding: 1rem 0;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem 1rem;
  margin: 0.5rem 0;
  &:focus {
    outline: none;
  }
`;

const TextArea = styled.textarea`
  resize: none;
  width: 100%;
  padding: 0.5rem 1rem;
  margin: 0.5rem 0;

  &:focus {
    outline: none;
  }
`;

const InputFile = styled.input`
  border: 1px solid black;
  padding: 0.5rem 1rem;
  width: 100%;
  margin: 0.5rem 0;
`;

const ButtonSection = styled.div`
  width: 100%;
`;

const SubmitButton = styled.button`
  padding: 0.8rem 1rem;
  background-color: #6f38c5;
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  width: 35%;

  &:hover {
    background-color: #87a2fb;
    color: black;
    transition: 0.3s all ease-in-out;
    cursor: pointer;
  }
`;

function CourseContent({ course }) {
  const [isUploading, setIsUploading] = useState(false);

  const [video, setVideo] = useState("");
  const [loading, setLoading] = useState(false);
  const [lesson, setLesson] = useState({
    title: "",
    description: "",
  });

  const handleVideo = (video) => {
    setLoading(true);

    if (video === undefined) {
      Swal.fire({
        title: "No Image",
        icon: "error",
        text: "Please Select an Image!",
      });
      return;
    }
    let fileSize = Math.round(video.size / (1024 * 1024));
    if (!lesson.description || !lesson.title) {
      Swal.fire({
        title: "Empty Fields",
        icon: "error",
        text: "Please fill all text field to upload lesson",
      });
      setLoading(false);
      return;
    } else if (fileSize > 10) {
      Swal.fire({
        title: "File Size Exceeds",
        icon: "error",
        text: "File size must be less than 10MB",
      });
      setLoading(false);
      return;
    } else {
      const data = new FormData();
      data.append("file", video);
      data.append("upload_preset", "educatdo");
      data.append("cloud_name", "dgrxzxtd8");
      fetch("https://api.cloudinary.com/v1_1/dgrxzxtd8/video/upload", {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setVideo(data.url.toString());
          console.log(data.url.toString());
          setLoading(false);
        });
    }
  };

  const handleSubmit = async () => {
    const postData = {
      title: lesson.title,
      description: lesson.description,
      url: video,
    };

    try {
      const { data } = await axios.post(
        `/course/lesson/${course?._id}`,
        postData
      );

      if (data) {
        Swal.fire({
          title: "Lesson Uploaded",
          icon: "success",
          text: data,
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Server Error",
        icon: "error",
        text: data,
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setLesson({
      ...lesson,
      [name]: value,
    });
  };

  return (
    <Contianer>
      <LessonLength>
        {" "}
        {course?.lessons?.length} Lessons Found{" "}
        <Upload onClick={() => setIsUploading(!isUploading)}>
          <AiOutlineCloudUpload style={{ marginRight: ".5rem" }} />
          Upload Lesson
        </Upload>
      </LessonLength>
      {isUploading ? (
        <UploadForm>
          <Title>Lesson Description</Title>
          <InputField>
            <Label>Lesson Title</Label>
            <Input
              name="title"
              onChange={handleChange}
              placeholder="Getting Started with NodeJS..."
            />
          </InputField>
          <InputField>
            <Label>Lesson Description</Label>
            <TextArea
              cols={40}
              rows={5}
              name="description"
              onChange={handleChange}
              placeholder="NodeJS is .........."
            ></TextArea>{" "}
          </InputField>
          <InputField>
            <Label>
              Upload Lesson{" "}
              <span style={{ color: "red", fontSize: "14px" }}>
                (File Maximum Size :: 10MB)
              </span>
            </Label>
            <InputFile
              type={"file"}
              accept="video/mp4,video/x-m4v,video/*"
              onChange={(e) => handleVideo(e.target.files[0])}
            />
          </InputField>
          <ButtonSection>
            <SubmitButton onClick={handleSubmit}>
              {loading ? (
                <>
                  <Spinner />
                  <span style={{ marginLeft: "1rem" }}>Lesson Uploading</span>
                </>
              ) : (
                "Submit"
              )}
            </SubmitButton>
          </ButtonSection>
        </UploadForm>
      ) : <LessonCatelog lesson={course?.lessons} />}
    </Contianer>
  );
}

export default CourseContent;
