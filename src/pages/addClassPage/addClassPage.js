import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import {
  addClass, classesStateStatus, classesErrorMessage, fetchClassesData,
} from '../classesPage/classesPageSlice';
import FlashMessage from '../../components/flashMessage/flashMessage';
import FormValidation from '../../components/formValidation/formValidation';
import './addClassPage.scss';

const AddClassPage = () => {
  const dispatch = useDispatch();
  const fetchStatus = useSelector(classesStateStatus);
  const errorMessage = useSelector(classesErrorMessage);

  useEffect(() => {
    if (fetchStatus === 'idle' || errorMessage === 'Error fetching data.') {
      dispatch(fetchClassesData());
    }
  }, []);

  const initialInputsState = {
    title: '',
    description: '',
    duration: '',
    instructor: '',
    image: null,
  };
  const initialFormMessage = { message: '', display: false, type: null };
  const initialValidationMessage = { message: '', display: false, id: null };

  const [inputs, setInputs] = useState(initialInputsState);
  const [formMessage, setFormMessage] = useState(initialFormMessage);
  const [validationMessage, setValidationMessage] = useState(initialValidationMessage);

  const flashMessageTimeout = () => setTimeout(() => setFormMessage(initialFormMessage), 4000);
  const formValidationTimeout = () => {
    setTimeout(() => setValidationMessage(initialValidationMessage), 3000);
  };

  useEffect(() => {
    if (formMessage.display) {
      flashMessageTimeout();
    }
    if (validationMessage.display) {
      formValidationTimeout();
    }
  }, [formMessage, validationMessage]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setInputs({
      ...inputs,
      [id]: (id === 'image' && true) || (value),
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const emptyField = Object.keys(inputs).find((key) => !inputs[key]);
    if (emptyField) {
      const message = (emptyField === 'image') ? 'Please upload a picture of the instructor.' : 'Please fill out this field.';

      setValidationMessage({ message, display: true, id: emptyField });
    } else {
      const formData = new FormData(event.target);
      try {
        const resultAction = await dispatch(addClass(formData));
        const originalPromiseResult = unwrapResult(resultAction);
        const { status, message } = originalPromiseResult;
        if (status === 'created') {
          setFormMessage({ message, display: true, type: 'success' });
          event.target.reset();
          setInputs(initialInputsState);
        } else {
          setFormMessage({ message, display: true, type: 'alert' });
        }
      } catch (rejectedValueOrSerializedError) {
        setFormMessage({ message: 'There was a problem connecting with the server. Please try again in a moment', display: true, type: 'alert' });
      }
    }
  };

  return (
    <>
      <div className="add-class-container private-page-container">
        { formMessage.display
          && <FlashMessage data-testid="flashMessage" message={formMessage.message} type={formMessage.type} />}

        <div className="main-container">
          <h2 className="heading">Add Class</h2>
          <form onSubmit={handleSubmit} data-testid="add-class-form" className="add-class-form">

            <div className="inputWrapper">
              <label htmlFor="title">
                <input id="title" onChange={handleChange} type="text" name="course[title]" className="add-class-title" placeholder="Title" value={inputs.title} />
                { validationMessage.display && validationMessage.id === 'title'
                && <FormValidation message={validationMessage.message} />}
              </label>
            </div>
            <div className="inputWrapper">
              <label htmlFor="description">
                <input id="description" onChange={handleChange} type="text" name="course[description]" className="class-description" placeholder="Description" value={inputs.description} />
                { validationMessage.display && validationMessage.id === 'description'
                && <FormValidation message={validationMessage.message} />}
              </label>
            </div>
            <div className="inputWrapper">
              <label htmlFor="duration">
                <input id="duration" onChange={handleChange} type="number" name="course[duration]" className="class-duration" placeholder="Duration" value={inputs.duration} />
                { validationMessage.display && validationMessage.id === 'duration'
                && <FormValidation message={validationMessage.message} />}
              </label>
            </div>
            <div className="inputWrapper">
              <label htmlFor="instructor">
                <input id="instructor" onChange={handleChange} type="text" name="course[instructor]" className="class-instructor" placeholder="Instructor" value={inputs.instructor} />
                { validationMessage.display && validationMessage.id === 'instructor'
                && <FormValidation message={validationMessage.message} />}
              </label>
            </div>
            <div className="upload-box inputWrapper">
              <span className="instruction">Upload Instructor Image</span>
              <input id="image" data-testid="imageInput" onChange={handleChange} type="file" name="course[image]" accept="image/png, image/jpeg" className="instructor-image" placeholder="Add image" />
              { validationMessage.display && validationMessage.id === 'image'
                && <FormValidation message={validationMessage.message} />}
            </div>
            <div>
              <input type="submit" value="Add" className="class-submit" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddClassPage;
