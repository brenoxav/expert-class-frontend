import React, { useState } from 'react';
import styles from './userSignUp.module.css';

function UserSignUp() {
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({ username: '', name: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  console.log(formData);

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
        <input className={styles.formInput} onChange={handleChange} value={formData.username} type="text" name="username" id="username" placeholder="Please enter your username" />
        <input className={styles.nameInput} onChange={handleChange} value={formData.name} type="text" name="name" id="name" placeholder="Please enter your name" />
        <input className={styles.formSubmit} type="submit" value="Submit" />
      </form>
      )}
    </div>
  );
}

export default UserSignUp;
