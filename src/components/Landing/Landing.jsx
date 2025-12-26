import { useNavigate } from "react-router";
import styles from './Landing.module.css';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <main className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Welcome to CompliTrack</h1>
        <p className={styles.subtitle}>
          Simplify business compliance management with our all-in-one tracking platform.
        </p>
        <ul className={styles.features}>
          <li>🏢 Add and manage multiple businesses effortlessly</li>
          <li>📋 Track licenses for each business</li>
          <li>📊 View your compliance status at a glance</li>
        </ul>
        <div className={styles.actions}>
          <button
            className={`${styles.button} ${styles.primary}`}
            onClick={() => navigate('/register')}
          >
            Sign Up
          </button>
          <button
            className={`${styles.button} ${styles.secondary}`}
            onClick={() => navigate('/login')}
          >
            Sign In
          </button>
        </div>
      </div>
    </main>
  );
};

export default Landing;