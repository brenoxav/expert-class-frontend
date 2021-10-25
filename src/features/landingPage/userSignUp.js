import React, { useState } from 'react';
import styles from './userSignUp.module.css';

function UserSignUp() {
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = () => (
    alert('A name was submitted: ')
  );

  return (
    <div>
      <form>
        <button onClick={() => setShowForm(!showForm)} className={styles.button2} type="button">SignUp</button>
      </form>

      {showForm && (
      <form className={styles.signInForm} onSubmit={handleSubmit}>
        <input className={styles.formInput} type="text" name="username" id="username" placeholder="Please enter your username" />
        <input className={styles.nameInput} type="text" name="name" id="name" placeholder="Please enter your name" />
        <input className={styles.formSubmit} type="submit" value="Submit" />
      </form>
      )}
    </div>
  );
}

export default UserSignUp;
