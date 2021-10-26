import React, { useState } from 'react';
import styles from './signUpPage.module.css';

function SignUpPage() {
  const [formData, setFormData] = useState({ username: '', name: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => (
    alert('A name was submitted: ')
  );

  return (
    <div className={styles.mainContainer}>
      <div className={styles.innerContainer}>
        <h2 className={styles.title}>Sign Up</h2>

        <form className={styles.signInForm} onSubmit={handleSubmit}>
          <input className={styles.formInput} onChange={handleChange} value={formData.username} type="text" name="username" id="username" placeholder="Please enter your username" />
          <input className={styles.nameInput} onChange={handleChange} value={formData.name} type="text" name="name" id="name" placeholder="Please enter your name" />
          <input className={styles.formSubmit} type="submit" value="Sign up" />
        </form>
      </div>
    </div>
  );
}

export default SignUpPage;
