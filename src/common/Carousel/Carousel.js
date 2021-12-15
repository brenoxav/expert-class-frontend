import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import SocialIcons from './socialIcons';
import styles from './Carousel.module.scss';
import 'swiper/swiper.scss';
import 'swiper/modules/navigation/navigation.scss';
import 'swiper/modules/pagination/pagination.scss';
import './Swiper.scss';

SwiperCore.use([Navigation, Pagination, Autoplay]);

export default function Carousel({ classes }) {
  const classesList = classes.map((c) => (
    <SwiperSlide
      key={c.id}
      className={(classes.length >= 3) ? `${styles.swiperSlide}` : `${styles.swiperSlide} ${styles.swiperSlideSm}`}
    >
      <NavLink
        to={`/class/${c.id}`}
        className={styles.swiperCard}
        style={{
          background: `linear-gradient(to top, rgba(0, 0, 0, 1) 13%, transparent 40%),
          linear-gradient(to right bottom, rgba(255, 180, 0, 0.7) 5%, transparent 60%),
          linear-gradient(to right bottom, rgba(151, 191, 15, 1) 5%, transparent 10%),
          url(${c.course_image_url}) center center/cover no-repeat content-box, rgb(153, 140, 140)`,
        }}
      />
      <div className={styles.textContainer}>
        <h3 className={styles.title}>{c.title}</h3>
        <p className={styles.instructor}>{c.instructor}</p>
        <SocialIcons />
      </div>
    </SwiperSlide>
  ));

  const swiper = (totalClasses) => {
    if (totalClasses >= 3) {
      return (
        <Swiper
          id="swiper-container"
          slidesPerView={3}
          spaceBetween={30}
          loop
          loopFillGroupWithBlank
          autoplay={{
            delay: 3000,
            disableOnInteraction: true,
            waitForTransition: true,
          }}
          speed={1000}
          navigation
          className={styles.swiper}
        >
          {classesList}
        </Swiper>
      );
    }
    return (
      <Swiper
        id="swiper-container"
        slidesPerView={3}
        spaceBetween={30}
        centerInsufficientSlides
        className={styles.swiper}
      >
        {classesList}
      </Swiper>
    );
  };

  return (
    <>
      {swiper(classes.length)}
    </>
  );
}

Carousel.propTypes = {
  classes: PropTypes.arrayOf(PropTypes.shape({
    Object,
  })).isRequired,
};
