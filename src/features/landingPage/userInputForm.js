import React, { useState } from 'react';
import styles from './userInputForm.module.css';

function UserInputForm() {
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({ username: '' });
  console.log(formData);

  const Change = (e) => setFormData({ ...formData, username: e.target.value });

  const handleSubmit = () => (
    alert('A name was submitted: ')
  );

  return (
    <div>
      <form>
        <button onClick={() => setShowForm(!showForm)} className={styles.button1} type="button">SignIn</button>
      </form>

      {showForm && (
      <form className={styles.signInForm} onSubmit={handleSubmit}>
        <input className={styles.formInput} onChange={Change} type="text" name="username" id="username" value={formData.username} placeholder="Please enter your username" />
        <input className={styles.formSubmit} type="submit" value="Submit" />
      </form>
      )}
    </div>
  );
}

export default UserInputForm;
