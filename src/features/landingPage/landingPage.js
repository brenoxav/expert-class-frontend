import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './landingPage.module.css';

export default function LandingPage() {
  const history = useHistory();

  const handleClick = (path) => {
    history.push(path);
  };

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

        <div className={styles.buttonsDiv}>
          <button className={styles.button1} type="button" onClick={() => handleClick('/sign-in')}>SignIn</button>
          <button className={styles.button2} type="button" onClick={() => handleClick('/sign-up')}>SignUp</button>
        </div>
      </div>
    </div>
  );
}
