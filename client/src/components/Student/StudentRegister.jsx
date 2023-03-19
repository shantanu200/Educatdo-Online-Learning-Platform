import React, { useState } from "react";
import "./style.css";
import studentLogin from "../../images/StudentLogin.svg";
import Swal from "sweetalert2";
import axios from "axios";
import {Spinner} from "../../utils/SpinnerItem";
import { useNavigate } from "react-router-dom";

const StudentRegister = () => {
  const navigate = useNavigate();
  const [student, setStudent] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const [pic, setPic] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setStudent({
      ...student,
      [name]: value,
    });
  };

  const handleFile = (post) => {
    setLoading(true);

    if (post === undefined) {
      Swal.fire({
        title: "No Image",
        icon: "error",
        text: "Please Select an Image!",
      });
      return;
    }

    if (post.type === "image/jpeg" || post.type === "image/png") {
      const data = new FormData();
      data.append("file", post);
      data.append("upload_preset", "educatdo");
      data.append("cloud_name", "dgrxzxtd8");
      fetch("https://api.cloudinary.com/v1_1/dgrxzxtd8/image/upload", {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(data.url.toString());
          setLoading(false);
        });
    } else {
      Swal.fire({
        title: "Image not found",
        icon: "warning",
        text: "Please Select an Image!",
      });
      setLoading(false);
      return;
    }
  };

  const handleClick = async () => {
    if (!student.name || !student.email || !student.password || !pic) {
      Swal.fire({
        title: "Empty Fields",
        text: "Please fill all fields",
        icon: "error",
      });
      return;
    }

    try {
      const postData = {
        name: student.name,
        email: student.email,
        password: student.password,
        profilepic: pic,
      };
    
      const resData = await axios.post("/student/register", postData);
      window.localStorage.setItem(
        "LoggedStudent",
        JSON.stringify(resData.data)
      );
      navigate(`/student/${resData.data._id}`);
    } catch (error) {
      Swal.fire({
        title: "Server Side Error",
        icon: "error",
        text: error.message,
      });
    }
  };

  return (
    <div className="registerBox">
      <div className="formBox">
        <div className="title">Welcome Student</div>
        <form className="form" onSubmit={(e) => e.preventDefault()}>
          <div className="inputBox">
            <label>Name</label>
            <br />
            <input
              className="inputField"
              name="name"
              placeholder="e.g. John Doe"
              onChange={handleChange}
            />
          </div>
          <div className="inputBox">
            <label>Email</label>
            <br />
            <input
              name="email"
              className="inputField"
              placeholder="e.g. johndoe@gmail.com"
              onChange={handleChange}
            />
          </div>
          <div className="inputBox">
            <label>Password</label>
            <br />
            <input
              name="password"
              className="inputField"
              placeholder="*********"
              onChange={handleChange}
            />
          </div>
          <div className="inputBox">
            <label>Profile Pic</label>
            <br />
            <input
              type={"file"}
              className="inputField"
              onChange={(e) => handleFile(e.target.files[0])}
              accept="image/x-png,image/jpeg"
            />
          </div>
          <div className="inputBox">
            <button
              onClick={handleClick}
              disabled={loading ? "disabled" : null}
            >
              {loading ? <Spinner /> : "Submit"}
            </button>
          </div>
        </form>
        <div className="msg">
          <p>
            Already Account Exists,<a href="/student/login"> Login Here</a>
          </p>
        </div>
      </div>
      <div className="border"></div>
      <div className="image">
        <img src={studentLogin} />
      </div>
    </div>
  );
};

export default StudentRegister;
