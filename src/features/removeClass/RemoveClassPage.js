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
    fetch(`.../api/v1/remove_class/${id}`);
  };

  const classesList = classes.map((obj) => (
    <div key={obj.id} className="class_item">
      <h3>{obj.title}</h3>
      <h4>{obj.description}</h4>
      <p>{obj.instructor}</p>
      <p>{obj.duration}</p>
      <p>{obj.image}</p>

      <button type="button" className="remove_btn" onClick={handleRemove(obj.class_id)}>Remove</button>
    </div>
  ));

  return (
    <div>
      <h1>RemoveClassPage</h1>
      {classesList}
    </div>
  );
}

export default RemoveClassPage;
