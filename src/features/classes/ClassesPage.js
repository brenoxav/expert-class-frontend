import './ClassesPage.css';
import '@brainhubeu/react-carousel/lib/style.css';
import Carousel, { slidesToShowPlugin, autoplayPlugin } from '@brainhubeu/react-carousel';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { fetchClassesData } from './classesSlice';
import { reloadClasses } from '../removeClass/removeClassSlice';
import SocialIcons from './socialIcons';

export default function ClassesPage() {
  const dispatch = useDispatch();

  const classes = useSelector((state) => state.classes.classes);

  useEffect(() => {
    dispatch(fetchClassesData());
    dispatch(reloadClasses());
  }, []);

  const classesList = classes.map((c) => (
    <NavLink to={`/class/${c.id}`} key={c.id} className="classes-item">
      <div className="image-container">
        <img className="image" src={c.course_image_url} alt="course" />
      </div>
      <div className="text-container">
        <h3 className="classes-title">{c.title}</h3>
        <p className="class-instructor">{c.instructor}</p>
        <SocialIcons />
      </div>
    </NavLink>
  ));

  return (
    <div className="classes-container">
      <h2 className="heading">Classes</h2>
      <Carousel
        plugins={[
          'centered',
          'infinite',
          'arrows',
          {
            resolve: slidesToShowPlugin,
            options: {
              numberOfSlides: 3,
            },
          },
          {
            resolve: autoplayPlugin,
            options: {
              interval: 3000,
            },
          },
        ]}
        animationSpeed={1000}
        className="carousel-component"
      >
        {classesList}
      </Carousel>
    </div>
  );
}
