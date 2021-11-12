import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import styles from './reservePage.module.scss';
import { currentUser } from '../../auth/sessionSlice';
import { reserveCourse, fetchReservations, reservationsState } from '../reservationsPage/reservationsPageSlice';
import { fetchCities, citiesState } from './citiesSlice';
import { currentClasses, fetchClassesData, classesStateStatus } from '../classesPage/classesPageSlice';
import Dropdown from '../../components/dropdown/dropdown';
import FlashMessage from '../../components/flashMessage/flashMessage';
import FormValidation from '../../components/formValidation/formValidation';

const ReservePage = () => {
  const dispatch = useDispatch();
  const user = useSelector(currentUser);
  const classes = useSelector(currentClasses);
  const classesStatus = useSelector(classesStateStatus);
  const { cities } = useSelector(citiesState);
  const { status: citiesStatus } = useSelector(citiesState);
  const { status: reservationsStatus } = useSelector(reservationsState);

  useEffect(() => {
    if (reservationsStatus === 'idle') {
      dispatch(fetchReservations());
    }
    if (classesStatus === 'idle') {
      dispatch(fetchClassesData());
    }
    if (citiesStatus === 'idle') {
      dispatch(fetchCities());
    }
  }, []);

  const initialFormState = {
    user_id: user.id,
    course_id: null,
    city_id: null,
    date: null,
  };
  const initialFormMessage = { message: '', display: false, type: null };
  const initialValidationMessage = { message: '', display: false, id: null };
  const intialDdState = { course_id: false, city_id: false };

  const [formMessage, setFormMessage] = useState(initialFormMessage);
  const [validationMessage, setValidationMessage] = useState(initialValidationMessage);
  const [formData, setFormData] = useState(initialFormState);
  const [open, setOpen] = useState(intialDdState);
  const [resetForm, setResetForm] = useState(false);

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

  const toggleDropdownMenu = (keyName) => {
    const newState = {};
    newState[keyName] = !open[keyName];
    setOpen((open) => ({ ...open, ...newState }));
  };

  const handleFormChange = (key, id) => {
    const selection = {};
    selection[key] = id;
    setFormData((form) => ({ ...form, ...selection }));
  };

  const handleOutsideClick = (event) => {
    const parentCourseId = document.querySelector('#course_id');
    const parentCityId = document.querySelector('#city_id');
    if (!parentCourseId.contains(event.target)) {
      if (open.course_id) {
        toggleDropdownMenu('course_id');
      }
    }
    if (!parentCityId.contains(event.target)) {
      if (open.city_id) {
        toggleDropdownMenu('city_id');
      }
    }
  };

  const dateHandler = (event) => {
    const date = event.target.value;
    setFormData((form) => ({ ...form, date }));
  };

  const toggleResetForm = () => {
    setResetForm(!resetForm);
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    const emptyField = Object.keys(formData).find((key) => !formData[key]);
    if (emptyField) {
      const field = emptyField.replace(/_[a-zA-Z]*/, '');
      const message = `Please select a ${field}.`;

      setValidationMessage({ message, display: true, id: emptyField });
    } else if (new Date(formData.date) < new Date()) {
      setValidationMessage({ message: 'Please select a valid date.', display: true, id: 'date' });
    } else {
      try {
        const resultAction = await dispatch(reserveCourse(formData));
        const originalPromiseResult = unwrapResult(resultAction);
        const { status, message } = originalPromiseResult;
        if (status === 200) {
          setFormMessage({ message, display: true, type: 'success' });
          setFormData(initialFormState);
          toggleResetForm();
          event.target.reset();
        } else {
          setFormMessage({ message, display: true, type: 'alert' });
        }
      } catch (rejectedValueOrSerializedError) {
        setFormMessage({ message: 'There was a problem connecting with the server. Please try again in a moment', display: true, type: 'alert' });
      }
    }
  };

  return (
    <div className={`${styles.formContainer}`} onClickCapture={handleOutsideClick}>
      <h1 className={`${styles.title}`}>Register for an Expert Class</h1>
      <p className={`${styles.para}`}>
        Register for an expert class with are world-reknown experts.
        We have classes for different topics, ranging from
        breakdancing to sculpting. Sign up today!
      </p>
      <form onSubmit={formSubmitHandler} className={`${styles.form}`}>
        { formMessage.display
        && <FlashMessage message={formMessage.message} type={formMessage.type} />}

        <div className={styles.inputWrapper}>
          <Dropdown
            valueName="title"
            keyName="course_id"
            items={classes}
            title="Choose a Course"
            handleFormChange={handleFormChange}
            toggleDropdownMenu={toggleDropdownMenu}
            open={open}
            reset={resetForm}
            toggleResetForm={toggleResetForm}
            validationMessage={validationMessage}
          />
          { validationMessage.display && validationMessage.id === 'course_id'
            && <FormValidation message={validationMessage.message} />}
        </div>

        <div className={styles.inputWrapper}>
          <Dropdown
            valueName="name"
            keyName="city_id"
            items={cities}
            title="Choose a City"
            handleFormChange={handleFormChange}
            toggleDropdownMenu={toggleDropdownMenu}
            open={open}
            reset={resetForm}
            toggleResetForm={toggleResetForm}
            validationMessage={validationMessage}
          />
          { validationMessage.display && validationMessage.id === 'city_id'
            && <FormValidation message={validationMessage.message} />}
        </div>

        <div className={styles.inputWrapper}>
          <input id="datePicker" type="date" onChange={dateHandler} />
          { validationMessage.display && validationMessage.id === 'date'
          && <FormValidation message={validationMessage.message} />}
        </div>

        <input type="submit" value="Register" className={`${styles.submitBtn}`} />
      </form>
    </div>
  );
};

export default ReservePage;
