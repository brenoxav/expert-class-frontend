import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import styles from './reservePage.module.scss';
import { currentUser } from '../../auth/sessionSlice';
import { reserveCourse, fetchReservations, reservationsState } from '../reservationsPage/reservationsPageSlice';
import { fetchCities, citiesState } from './citiesSlice';
import { currentClasses, fetchClassesData, classesStateStatus } from '../classesPage/classesPageSlice';
import Dropdown from '../../components/dropdown/dropdown';
import SpeechBubble from '../../components/speechBubble/speechBubble';

const ReservePage = () => {
  const dispatch = useDispatch();
  const user = useSelector(currentUser);
  const classes = useSelector(currentClasses);
  const classesStatus = useSelector(classesStateStatus);
  const { cities } = useSelector(citiesState);
  const { status: citiesStatus } = useSelector(citiesState);
  const { status: reservationsStatus } = useSelector(reservationsState);
  const intialDdState = { course_id: false, city_id: false };

  const [formMessage, setFormMessage] = useState({ message: '', display: false, type: null });

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

  const [formData, setFormData] = useState(initialFormState);

  const [open, setOpen] = useState(intialDdState);

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

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    let emptyField = Object.keys(formData).find((key) => !formData[key]);
    if (emptyField) {
      emptyField = emptyField.replace(/_[a-zA-Z]*/, '');
      const message = `Please select a ${emptyField}.`;

      setFormMessage({ message, display: true, type: 'alert' });
    } else if (new Date(formData.date) < new Date()) {
      setFormMessage({ message: 'Please select a valid date.', display: true, type: 'alert' });
    } else {
      try {
        const resultAction = await dispatch(reserveCourse(formData));
        const originalPromiseResult = unwrapResult(resultAction);
        const { status, message } = originalPromiseResult;
        if (status === 200) {
          setFormMessage({ message, display: true, type: 'success' });
          setFormData(initialFormState);
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
          && <SpeechBubble message={formMessage.message} type={formMessage.type} />}

        <Dropdown
          valueName="title"
          keyName="course_id"
          items={classes}
          title="Choose a Course"
          handleFormChange={handleFormChange}
          toggleDropdownMenu={toggleDropdownMenu}
          open={open}
        />
        <Dropdown
          valueName="name"
          keyName="city_id"
          items={cities}
          title="Choose a City"
          handleFormChange={handleFormChange}
          toggleDropdownMenu={toggleDropdownMenu}
          open={open}
        />
        <input type="date" onChange={dateHandler} />
        <input type="submit" value="Register" className={`${styles.submitBtn}`} />
      </form>
    </div>
  );
};

export default ReservePage;
