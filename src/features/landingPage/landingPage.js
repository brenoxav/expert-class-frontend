import React from 'react';
// import expertClass02 from '../images/expertClass02.jpg';
// import { useSelector } from 'react-redux';
import styles from './landingPage.module.css';

export default function LandingPage() {
  const handleSubmit = () => (
    alert('A name was submitted: ')
  );
  return (
    <div className={styles.mainContainer}>
      <div className={styles.innerContainer}>
        <h1 className={styles.pageTitle}>OUR EXPERT CLASSES</h1>
        <p className={styles.caption}>
          There&apos;s Nothing Better Than Getting Better.
          Keep Growing With Unlimited Creative Classes.
          Grow Without Limits. Discover What You Can Create With Thousands of Inspiring Classes.
          Support of a Community.
          Prompts & Resources. Browse Projects.
          Offline viewing.
        </p>
        <div className={styles.buttons}>
          <button className={styles.button1} type="button">SignIn</button>
          <button className={styles.button2} type="button">SignUp</button>
        </div>
        <form className={styles.signInForm} onSubmit={handleSubmit}>
          <input className={styles.formInput} type="text" name="username" id="username" placeholder="Please enter your username" />
          <input className={styles.formSubmit} type="submit" value="Submit" />
        </form>
        <form className={styles.signInForm} onSubmit={handleSubmit}>
          <input className={styles.formInput} type="text" name="username" id="username" placeholder="Please enter your username" />
          <input className={styles.nameInput} type="text" name="name" id="name" placeholder="Please enter your name" />
          <input className={styles.formSubmit} type="submit" value="Submit" />
        </form>

      </div>
    </div>
  );
}
