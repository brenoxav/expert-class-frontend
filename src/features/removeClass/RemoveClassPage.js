import React from 'react';
// import { useSelector } from 'react-redux';
import './RemoveClassPage.css';

function RemoveClassPage() {
  // const { classes } = useSelector((state) => state.classes);
  const classes = [
    {
      id: 1,
      title: 'Setup Redux',
      description: 'Learn how to set up Redux on a React app.',
      instructor: 'Breno',
      duration: 4,
      image: 'image-url',
    },
    {
      id: 2,
      title: 'Setup Redux',
      description: 'Learn how to set up Redux on a React app.',
      instructor: 'Breno',
      duration: 4,
      image: 'image-url',
    },
    {
      id: 3,
      title: 'Setup Redux',
      description: 'Learn how to set up Redux on a React app.',
      instructor: 'Breno',
      duration: 4,
      image: 'image-url',
    },
  ];

  const handleRemove = (id) => {
    fetch(`.../endpoint/${id}`);
  };

  const classesList = classes.map((c) => (
    <div key={c.id} className="class_item">
      <h3>{c.title}</h3>
      <h4>{c.description}</h4>
      <p>{c.instructor}</p>
      <p>{c.duration}</p>
      <p>{c.image}</p>

      <button type="button" className="remove_btn" onClick={handleRemove(c.class_id)}>Remove</button>
    </div>
  ));

  return (
    <div>
      <h1>Remove Class Page</h1>
      {classesList}
    </div>
  );
}

export default RemoveClassPage;
