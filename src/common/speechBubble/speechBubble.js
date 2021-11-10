import PropTypes from 'prop-types';
import styles from './speechBubble.module.scss';

const SpeechBubble = ({ message }) => (
  <div className={styles.speech}>
    {message}
  </div>
);

SpeechBubble.propTypes = {
  message: PropTypes.string.isRequired,
};

export default SpeechBubble;
