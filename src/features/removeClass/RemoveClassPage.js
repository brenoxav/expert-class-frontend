import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './RemoveClassPage.css';
import { reloadClasses, removeClass } from './removeClassSlice';

function RemoveClassPage() {
  const dispatch = useDispatch();
  const classes = useSelector((state) => state.classesObj.classObj);

  useEffect(() => {
    dispatch(reloadClasses());
  }, []);

  const handleClick = (id) => {
    dispatch(removeClass(id));
    dispatch(reloadClasses());
  };

  const classesList = classes.map((c) => (
    <tr key={c.id} className="class-item">
      <td>{c.title}</td>
      <td>{c.description}</td>
      <td>{c.instructor}</td>
      <td>{c.duration}</td>
      <td>
        <button type="button" className="remove_btn" onClick={() => handleClick(c.id)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
            <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
          </svg>
        </button>
      </td>
    </tr>
  ));

  return (
    <div className="remove-class-container">
      <div className="heading">Remove Class</div>
      <table className="reservations-table">
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
