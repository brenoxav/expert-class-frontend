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

  const handleRemove = (id) => async () => {
    await fetch(`http://localhost:3001/api/v1/courses/${id}`);
  };

  const classesList = classes.map((c) => (
    <tr key={c.id} className="class-item">
      <td>{c.title}</td>
      <td>{c.description}</td>
      <td>{c.instructor}</td>
      <td>{c.duration}</td>
      <td>
        <button type="button" className="remove_btn" onClick={handleRemove(c.id)}>Remove</button>
      </td>
    </tr>
  ));

  return (
    <div className="remove-class-container">
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Instructor</th>
            <th>Duration</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {classesList}
        </tbody>
      </table>
    </div>
  );
}

export default RemoveClassPage;
