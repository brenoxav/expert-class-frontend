import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { fetchClassDetails } from './classDetailsSlice';
import './ClassDetails.css';

function ClassDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  let c = useSelector((state) => state.classObj);
  c = {};

  useEffect(() => {
    dispatch(fetchClassDetails(id));
  }, []);

  return (
    <div className="details-container">
      <div className="details-col-1">
        <img src="https://images.accentuate.io/?image=https%3A%2F%2Fcdn.accentuate.io%2F79494840488%2F1614860217790%2FMEM-Antenatal-Classes-1080x1080px-03.png%3Fv%3D1616764534551&c_options=dpr_2.0,c_fill" alt="expert class" />
      </div>
      <div className="details-col-2">
        <div className="title">
          <h2>
            Title
            {c.title}
          </h2>
          <h3>
            Instructor
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
