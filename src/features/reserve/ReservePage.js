import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styles from './ReservePage.module.scss';
import { currentUser, loggedInStatus } from '../../auth/sessionSlice';
import { reserveCourse } from './reservePageSlice';
import Dropdown from './dropdown';
import SpeechBubble from './speechBubble';

const ReservePage = () => {
  const dispatch = useDispatch();

  const history = useHistory();
  const user = useSelector(currentUser);
  const loggedIn = useSelector(loggedInStatus);
  const [formMessage, setFormMessage] = useState({ message: '', display: false });

  useEffect(() => {
    if (!loggedIn) {
      history.push('/');
    }
  }, []);

  const initialState = {
    user_id: user.id,
    course_id: null,
    city_id: null,
    date: null,
  };

  const [formData, setFormData] = useState(initialState);

  const handleFormChange = (key, id) => {
    const selection = {};
    selection[key] = id;
    setFormData((form) => ({ ...form, ...selection }));
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

      setFormMessage({ message, display: true });
    } else if (new Date(formData.date) < new Date()) {
      setFormMessage({ message: 'Please select a valid date.', display: true });
    } else {
      setFormMessage({ message: '', display: false });
      await dispatch(reserveCourse(formData));
    }
  };

  const cities = [
    {
      id: 13,
      name: 'Ciudad de Mexico, Mexico',
    },
    {
      id: 14,
      name: 'New York, USA',
    },
    {
      id: 15,
      name: 'Abuja, Nigeria',
    },
    {
      id: 16,
      name: 'São Paulo, Brasil',
    },
  ];

  const courses = [
    {
      id: 15, title: 'Urban Photography', description: 'Learn to take photos of urban landscapes.', duration: 4, instructor: 'Maria',
    },
    {
      id: 16, title: 'Modern Gardening', description: 'Learn to plant plants.', duration: 8, instructor: 'Mohammed',
    },
    {
      id: 17, title: 'Play the Piano', description: 'Learn to play the piano.', duration: 12, instructor: 'Yin',
    },
    {
      id: 18, title: 'Master Chef', description: 'Learn to cook delicious dishes.', duration: 12, instructor: 'Paola',
    },
  ];

  return (
    <div className={`${styles.formContainer}`}>
      <h1 className={`${styles.title}`}>Register for an Expert Class</h1>
      <p className={`${styles.para}`}>
        Register for an expert class with are world-reknown experts.
        We have classes for different topics, ranging from
        breakdancing to sculpting. Sign up today!
      </p>
      <form onSubmit={formSubmitHandler} className={`${styles.form}`}>
        { formMessage.display && <SpeechBubble message={formMessage.message} />}

        <Dropdown
          valueName="title"
          keyName="course_id"
          items={courses}
          title="Choose a Course"
          handleFormChange={handleFormChange}
        />

        <Dropdown
          valueName="name"
          keyName="city_id"
          items={cities}
          title="Choose a City"
          handleFormChange={handleFormChange}
        />

        <input type="date" onChange={dateHandler} />
        <input type="submit" value="Register" className={`${styles.submitBtn}`} />
      </form>
    </div>
  );
};

export default ReservePage;
