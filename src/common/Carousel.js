import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import SocialIcons from './socialIcons';
import styles from './Carousel.module.css';
import 'swiper/swiper.scss';
import 'swiper/modules/navigation/navigation.scss';
import 'swiper/modules/pagination/pagination.scss';
import './Swiper.css';

SwiperCore.use([Navigation, Pagination, Autoplay]);

export default function Carousel({ classes }) {
  // const history = useHistory();

  // const handleClick = (id) => {
  //   (<Redirect to={{ pathname: `/class/${id}`}} />)

  //   // history.push(`/class/${id}`)
  // };

  const classesList = classes.map((c) => (
    <SwiperSlide key={c.id} className={styles.swiperSlide}>
      <NavLink
        to={`/class/${c.id}`}
        className={styles.swiperCard}
      >
        <div className={styles.swiperImgContainer}>
          <img className={styles.swiperImg} src={c.course_image_url} alt="course instructor" />
        </div>
        <div className={styles.textContainer}>
          <h3 className={styles.title}>{c.title}</h3>
          <p className={styles.instructor}>{c.instructor}</p>
          <SocialIcons />
        </div>
      </NavLink>
    </SwiperSlide>
  ));

  return (
    <>
      <Swiper
        id="swiper-container"
        slidesPerView={3}
        spaceBetween={30}
        // slidesPerGroup={}
        loop
        loopFillGroupWithBlank
        autoplay={{
          delay: 3000,
          disableOnInteraction: true,
          waitForTransition: true,
        }}
        speed={1000}
        pagination={{
          clickable: true,
        }}
        navigation
        className={styles.swiper}
      >
        {classesList}
      </Swiper>
    </>
  );
}

Carousel.propTypes = {
  classes: PropTypes.arrayOf(PropTypes.shape({
    Object,
  })).isRequired,
};
