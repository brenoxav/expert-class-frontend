import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import getCSRFToken from '../../app/getCSRFToken';
import expertClassAPI from '../../app/expertClassAPI';
import { loggedInStatus } from '../../auth/sessionSlice';
import './AddClassPage.css';

const AddClassPage = () => {
  const history = useHistory();
  const loggedIn = useSelector(loggedInStatus);

  useEffect(() => {
    if (!loggedIn) {
      history.push('/');
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    await axios.post('http://localhost:3001/api/v1/courses',
      formData,
      {
        withCredentials: true,
        headers: {
          'X-CSRF-Token': getCSRFToken(),
          'content-type': 'multipart/form-data',
        },
      });
  };

  const [classes, setClasses] = useState(null);

  const [course, setCourse] = useState(null);

  const classesList = (courses) => courses.map((c) => (
    <div key={c.id}>
      <img
        src={c.course_image_url}
        alt="class instructor"
        style={{
          width: 300,
        }}
      />
      <h3>{c.title}</h3>
      <p>{c.description}</p>
    </div>
  ));

  const showClass = (c) => (
    <div key={c.id}>
      <img
        src={c.course_image_url}
        alt="class instructor"
        style={{
          width: 300,
        }}
      />
      <h3>{c.title}</h3>
      <p>{c.description}</p>
    </div>
  );

  const fetchClasses = async () => {
    const response = await expertClassAPI.get('/api/v1/courses');
    setClasses(classesList(response.data));
  };

  const fetchClass = async () => {
    const response = await expertClassAPI.get('/api/v1/courses/16');
    setCourse(showClass(response.data));
  };

  return (
    <>
      <div className="add-class-container">
        <div className="main-container">
          <h2 className="heading">Add Class</h2>
          <form onSubmit={handleSubmit} className="add-class-form">
            <div>
              <label htmlFor="title">
                <input type="text" name="course[title]" className="add-class-title" placeholder="Title" />
              </label>
            </div>
            <div>
              <label htmlFor="description">
                <input type="text" name="course[description]" className="class-description" placeholder="Description" />
              </label>
            </div>
            <div>
              <label htmlFor="duration">
                <input type="number" name="course[duration]" className="class-duration" placeholder="Duration" />
              </label>
            </div>
            <div>
              <label htmlFor="instructor">
                <input type="text" name="course[instructor]" className="class-instructor" placeholder="Instructor" />
              </label>
            </div>
            <div className="upload-box">
              <span className="instruction">Upload Instructor Image</span>
              <input type="file" name="course[image]" accept="image/png, image/jpeg" className="instructor-image" placeholder="Add image" />
            </div>
            <div>
              <input type="submit" value="Upload" className="class-submit" />
            </div>
          </form>

        </div>
      </div>

      <div style={{
        width: 600, marginLeft: 400, marginTop: 100, minHeight: 200,
      }}
      >
        <button type="button" onClick={fetchClasses}>Fetch Classes</button>
        {classes}
      </div>
      <div style={{
        width: 600, marginLeft: 400, marginTop: 100, minHeight: 200,
      }}
      >
        <button type="button" onClick={fetchClass}>Fetch One Class</button>
        {course}
      </div>
    </>
  );
};

export default AddClassPage;
