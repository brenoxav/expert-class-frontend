import PropTypes from 'prop-types';
import styles from './formValidation.module.scss';

const FormValidation = ({ message }) => (
  <p className={[styles.errorMessage, styles['bottom-arrow']].join(' ')} data-testid="formValidation">
    {message}
  </p>
);

FormValidation.propTypes = {
  message: PropTypes.string.isRequired,
};

export default FormValidation;
