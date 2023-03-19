import React from "react";
import { courses } from "../../data/course";
import "./Course.css";
import {MdPlayLesson} from "react-icons/md";
import {HiUsers} from "react-icons/hi";
import {IoEnterOutline} from "react-icons/io5";
import coverImage from "../Home/CoverImages/ReactBootCamp.jpg";
import { AiFillStar } from "react-icons/ai";

const CourseCard = ({CourseItem}) => {
  return (
    <div className="course-card">
      <div className="image">
        <img alt="" src={coverImage} />
      </div>
      <div className="item">
        <div className="course-tags">
          {CourseItem?.techTags.map((_, id) => {
            return <p className="tags">{_}</p>;
          })}
        </div>
        <div className="price">$ {CourseItem?.price}</div>
      </div>
      <div className="course-name">
        {CourseItem?.name}
      </div>
      <div className="item-2">
        <p className="sub-item"><MdPlayLesson className="icon" />{CourseItem?.lessons} Lessons</p>
        <p className="sub-item"><HiUsers className="icon" />{CourseItem?.students} Students</p>
      </div>
      <div className="course-btn">
        <div className="rating"><AiFillStar className="star" />{CourseItem?.rating} Stars</div>
        <button><IoEnterOutline className="icon-btn" />Enroll Now</button>
      </div>
    </div>
  );
};

export default CourseCard;
