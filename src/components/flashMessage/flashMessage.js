import PropTypes from 'prop-types';
import styles from './flashMessage.module.scss';

const FlashMessage = ({ message, type }) => (
  <div className={[styles.speech, styles[type]].join(' ')}>
    {message}
  </div>
);

FlashMessage.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default FlashMessage;
