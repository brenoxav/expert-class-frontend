import React from 'react';
import { useSelector } from 'react-redux';

export default function LandingPage() {
  const { classes } = useSelector((state) => state.classes);

  const classesList = classes.map((c) => (
    <div key={c.id} className="class-item">
      <img src="" alt="class instructor" />
      <h3>{c.title}</h3>
      <p>{c.description}</p>
      <ul>
        <li>facebook</li>
        <li>messenger</li>
        <li>twitter</li>
      </ul>
    </div>
  ));

  return (
    <div className="main-container" style={{ marginLeft: 400}}>
      <h1 className="page-title">OUR EXPERT CLASSES</h1>
      <p className="call-action">Please Select an Expert Class</p>
      <div className="class-display">
        <button className="side-buttons" type="button"> arrow </button>
        {classesList}
        <button className="side-buttons" type="button"> arrow </button>
      </div>
      <button type="button">SignIn</button>
      <button type="button">SignOut</button>
      <button type="button">SignUp</button>
    </div>
  );
}
