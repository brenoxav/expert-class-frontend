import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { fetchClassDetails } from './classDetailsSlice';
import './ClassDetails.css';

function ClassDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const c = useSelector((state) => state.classDetails.classObj);

  useEffect(() => {
    dispatch(fetchClassDetails(id));
  }, []);

  return (
    <div className="details-container">
      <div className="details-col-1">
        <img src={c.course_image_url} alt="expert class" />
      </div>
      <div className="details-col-2">
        <div className="title">
          <h2>
            {c.title}
          </h2>
          <h3>
            {c.instructor}
          </h3>
        </div>
        <div>
          <h4>
            Description:
            {c.description}
          </h4>
          <h4>
            Duration:
            {c.duration}
          </h4>
        </div>
      </div>
    </div>
  );
}

export default ClassDetails;
