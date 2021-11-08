import React from 'react';
import { Carousel as CarouselComponent } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { NavLink } from 'react-router-dom';
import SocialIcons from './socialIcons';
import styles from './Carousel.module.css';

export default function Carousel({ classes }) {
  const classesList = classes.map((c) => (
    <NavLink to={`/class/${c.id}`} key={c.id} className={styles.item}>
      <div className={styles.imageContainer}>
        <img className="image" src={c.course_image_url} alt="course" />
      </div>
      <div className={styles.textContainer}>
        <h3 className={styles.title}>{c.title}</h3>
        <p className={styles.instructor}>{c.instructor}</p>
        <SocialIcons />
      </div>
    </NavLink>
  ));

  return (
    <div className="carousel-wrapper">
        <CarouselComponent
        autoPlay centerMode showStatus showIndicators
        infiniteLoop useKeyboardArrows stopOnHover swipeable
        centerSlidePercentage={33} showThumbs={false}
        >
          {classesList}
        </CarouselComponent>
    </div>
  );
}
