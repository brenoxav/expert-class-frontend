import React, { useState } from 'react';
import styles from './signInPage.module.css';

function SignInPage() {
  const [formData, setFormData] = useState({ username: '' });

  const Change = (e) => setFormData({ ...formData, username: e.target.value });

  const handleSubmit = () => (
    alert('A name was submitted: ')
  );

  return (
    <div className={styles.mainContainer}>
      <div className={styles.innerContainer}>
        <h2 className={styles.title}>Sign In</h2>

        <form className={styles.signInForm} onSubmit={handleSubmit}>
          <input
            className={styles.formInput}
            onChange={Change}
            type="text"
            name="username"
            id="username"
            value={formData.username}
            placeholder="Please enter your username"
          />
          <input className={styles.formSubmit} type="submit" value="Sign in" />
        </form>
      </div>
    </div>
  );
}

export default SignInPage;
