import PropTypes from 'prop-types';
import styles from './speechBubble.module.scss';

const SpeechBubble = ({ message, type }) => (
  <div className={[styles.speech, styles[type]].join(' ')}>
    {message}
  </div>
);

SpeechBubble.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default SpeechBubble;
