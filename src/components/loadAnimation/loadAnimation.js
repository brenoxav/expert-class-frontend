import React from 'react';
import './loadAnimation.scss';

const sizing = {
  width: '14rem',
  height: '14rem',
};

const LoadAnimation = () => (
  <div className="my-custom-class spinner-border" role="status" style={sizing}>
    <span className="my-custom-class sr-only" data-testid="spinnerSpan">Loading...</span>
  </div>
);

export default LoadAnimation;
