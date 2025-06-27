import React from "react";
import "./MeetTheTeacher.css";
import bulbIcon from "../../assets/ideaIcon.png";  // Replace with the actual path to your teacher image
import teacher_img from "../../assets/subhadeepshome.png";  // Replace with the actual path to your teacher image


export default function MeetTheTeacher({
  name ,
  photo ,
  text 
}) {
    // const [before, after] = text.split(name);
  return (
    <section className="sow-wrapper my-5">
      {/* Header */}
      <div className="sow-header-wrapper">
        <div className="sow-header">
          <div className="sow-badge">
            <img src={bulbIcon} alt="" />
          </div>
          <h2 className="sow-title">Meet The Teacher</h2>
        </div>
      </div>

      <div className="main_meetTeacher">
          {/* Circular photo */}
          <div className="left_teacher_details">
              <div className="top_Teacher_Name_section">
                {/* <h2>{name}</h2> */}
                <h2>Suvadeep Shome</h2>
                <p>Let's get to know our teacher! Share some fun information including:</p>
                <ul>
                  <li>Favorite subject: Math</li>
                  <li>Years of experience: 15+</li>
                  <li>Hobbies: Reading, Hiking</li>
                </ul>
              </div>
              <div className="bottom_Teacher_Contact_section">
                <h2>Contact Information</h2>
                <p>+91 7003 416 272</p>
              </div>
          </div>
          <div className="right_teacher_photo">
             <img src={teacher_img} alt="" />
          </div>
      </div>  
    </section>
  );
}
