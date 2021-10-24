import React, { useState } from 'react';
import axios from 'axios';
import getCSRFToken from '../../app/getCSRFToken';
import expertClassAPI from '../../app/expertClassAPI';

const AddClassPage = () => {
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
      <img src={c.course_image_url} alt="class instructor" />
      <h3>{c.title}</h3>
      <p>{c.description}</p>
    </div>
  ));

  const showClass = (c) => (
    <div key={c.id}>
      <img src={c.course_image_url} alt="class instructor" />
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
      <div style={{ marginLeft: 400 }}>
        <h1>Create a New Class</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">
            Title
            <input type="text" name="course[title]" />
          </label>
          <label htmlFor="description">
            Description
            <input type="text" name="course[description]" />
          </label>
          <label htmlFor="duration">
            Duration
            <input type="number" name="course[duration]" />
          </label>
          <label htmlFor="instructor">
            Instructor
            <input type="text" name="course[instructor]" />
          </label>
          <label htmlFor="image">
            Upload image of Instructor
            <input type="file" name="course[image]" accept="image/png, image/jpeg" />
          </label>
          <input type="submit" value="Upload" />
        </form>
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
