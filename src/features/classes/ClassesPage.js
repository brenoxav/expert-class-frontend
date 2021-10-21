import './ClassesPage.css';
import React from 'react';
import { useSelector } from 'react-redux';

export default function ClassesPage() {
  const { classes } = useSelector((state) => state.classes);

  const classesList = classes.map((c) => (
    <div key={c.id} className="class-item">
      <h3>{c.title}</h3>
      <h4>{c.instructor}</h4>
      <p>
        {c.duration}
        hours
      </p>
      <p>{c.description}</p>
    </div>
  ));

  return (
    <div>
      <h1>Classes Page</h1>
      {classesList}
    </div>
  );
}
