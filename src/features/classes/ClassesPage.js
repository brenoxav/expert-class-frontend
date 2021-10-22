import './ClassesPage.css';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClassesData } from './classesSlice';

export default function ClassesPage() {
  const dispatch = useDispatch();
  const { classes } = useSelector((state) => state.classes);

  useEffect(() => {
    dispatch(fetchClassesData());
  }, []);

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
