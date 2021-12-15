import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import {
  addClass, classesStateStatus, classesErrorMessage, fetchClassesData,
} from '../classesPage/classesPageSlice';
import FlashMessage from '../../components/flashMessage/flashMessage';
import FormValidation from '../../components/formValidation/formValidation';
import styles from './addClassPage.module.scss';

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

  useEffect(() => {
    let timeoutActive = true;
    if (formMessage.display) {
      setTimeout(() => {
        if (timeoutActive) {
          setFormMessage(initialFormMessage);
        }
      }, 4000);
    }
    if (validationMessage.display) {
      setTimeout(() => {
        if (timeoutActive) {
          setValidationMessage(initialValidationMessage);
        }
      }, 3000);
    }
    return () => {
      timeoutActive = false;
    };
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
    fetchStatus === 'fulfilled'
    && (
    <>
      <div className={`${styles.formContainer} private-page-container`}>
        { formMessage.display
          && <FlashMessage data-testid="flashMessage" message={formMessage.message} type={formMessage.type} />}

        <h2 className={`${styles.title}`}>Add Class</h2>
        <form onSubmit={handleSubmit} data-testid="add-class-form" className={`${styles.form}`}>

          <div className={styles.inputWrapper}>
            <input id="title" className={styles.formInput} onChange={handleChange} type="text" name="course[title]" placeholder="Title" value={inputs.title} />
            { validationMessage.display && validationMessage.id === 'title'
                && <FormValidation message={validationMessage.message} />}
          </div>
          <div className={styles.inputWrapper}>
            <input id="description" className={styles.formInput} onChange={handleChange} type="text" name="course[description]" placeholder="Description" value={inputs.description} />
            { validationMessage.display && validationMessage.id === 'description'
                && <FormValidation message={validationMessage.message} />}
          </div>
          <div className={styles.inputWrapper}>

            <input id="duration" className={styles.formInput} onChange={handleChange} type="number" name="course[duration]" placeholder="Duration" value={inputs.duration} />
            { validationMessage.display && validationMessage.id === 'duration'
                && <FormValidation message={validationMessage.message} />}

          </div>
          <div className={styles.inputWrapper}>

            <input id="instructor" className={styles.formInput} onChange={handleChange} type="text" name="course[instructor]" placeholder="Instructor" value={inputs.instructor} />
            { validationMessage.display && validationMessage.id === 'instructor'
                && <FormValidation message={validationMessage.message} />}

          </div>
          <div className={`${styles.inputWrapper} ${styles.uploadBox}`}>
            <span className={styles.imageLabel}>Upload Instructor Image</span>
            <input id="image" data-testid="imageInput" onChange={handleChange} type="file" name="course[image]" accept="image/png, image/jpeg" className={`${styles.instructorImage}`} />
            { validationMessage.display && validationMessage.id === 'image'
                  && <FormValidation message={validationMessage.message} />}

          </div>
          <div>
            <input type="submit" value="Add" className="button-white" />
          </div>
        </form>

      </div>
    </>
    )
  );
};

export default AddClassPage;
