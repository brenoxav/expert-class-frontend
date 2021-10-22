import React from 'react';

const ClassDetails = () => {
  const classObj = {
    title: 'Setup Redux',
    description: 'Learn how to set up Redux on a React app.',
    instructor: 'Breno',
    duration: 4,
    image: 'image-url',
  };

  return (
    <>
      <div>
        Image:
        {classObj.image}
      </div>
      <div>
        Title:
        {classObj.title}
      </div>
      <div>
        Description:
        {classObj.description}
      </div>
      <div>
        Instructor:
        {classObj.instructor}
      </div>
      <div>
        Duration:
        {classObj.duration}
      </div>
    </>
  );
};

export default ClassDetails;
