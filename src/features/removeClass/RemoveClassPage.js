import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeClass } from './removeClassSlice';
import './RemoveClassPage.css';

function RemoveClassPage() {
  const dispatch = useDispatch();
  const classes = useSelector((state) => state);
  console.log('casss..............', classes);

  const handleClick = (id) => {
    dispatch(removeClass(id));
  };

  const classesList = classes.map((c) => (
    <tr key={c.id} className="class-item">
      <td>{c.title}</td>
      <td>{c.description}</td>
      <td>{c.instructor}</td>
      <td>{c.duration}</td>
      <td>
        <button type="button" className="remove_btn" onClick={() => handleClick(c.id)}>Remove</button>
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
