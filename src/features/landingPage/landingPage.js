import React from 'react';
// import expertClass02 from '../images/expertClass02.jpg';
// import { useSelector } from 'react-redux';
import UserInputForm from './userInputForm';
import UserSignUp from './userSignUp';
import styles from './landingPage.module.css';

export default function LandingPage() {
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
        <div className={styles.forms}>
          <UserInputForm />
          <UserSignUp />
        </div>

      </div>
    </div>
  );
}
