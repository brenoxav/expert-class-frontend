import React from 'react';
import { useDispatch } from 'react-redux';
import { addClass } from '../classesPage/classesPageSlice';
import './addClassPage.css';

const AddClassPage = () => {
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    dispatch(addClass(formData));
    event.target.reset();
  };

  return (
    <>
      <div className="add-class-container">
        <div className="main-container">
          <h2 className="heading">Add Class</h2>
          <form onSubmit={handleSubmit} className="add-class-form">
            <div>
              <label htmlFor="title">
                <input type="text" name="course[title]" className="add-class-title" placeholder="Title" required />
              </label>
            </div>
            <div>
              <label htmlFor="description">
                <input type="text" name="course[description]" className="class-description" placeholder="Description" required />
              </label>
            </div>
            <div>
              <label htmlFor="duration">
                <input type="number" name="course[duration]" className="class-duration" placeholder="Duration" required />
              </label>
            </div>
            <div>
              <label htmlFor="instructor">
                <input type="text" name="course[instructor]" className="class-instructor" placeholder="Instructor" required />
              </label>
            </div>
            <div className="upload-box">
              <span className="instruction">Upload Instructor Image</span>
              <input type="file" name="course[image]" accept="image/png, image/jpeg" className="instructor-image" placeholder="Add image" required />
            </div>
            <div>
              <input type="submit" value="Upload" className="class-submit" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddClassPage;
