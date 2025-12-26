// src/components/NavBar/NavBar.jsx

// Import the useContext hook
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router';

// Import the UserContext object
import { UserContext } from '../../contexts/UserContext';

import styles from './NavBar.module.css';

const NavBar = () => {
  // Pass the UserContext object to the useContext hook to access:
  // - The user state (which we use here).
  // - The setUser function to update the user state (which we aren't using).
  //
  // Destructure the object returned by the useContext hook for easy access
  // to the data we added to the context with familiar names.
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignOut = () => {
    // Clear the token from localStorage
    localStorage.removeItem('token');
    // Clear the user state
    setUser(null);
    navigate('/');
  };

  return (
    <nav className={styles.navbar}>
      {user ? (
        <ul className={styles.navList}>
          <div className={styles.left}>
            <li className={styles.brand}>
              {user.username}
            </li>

            <li>
              <Link
                to="/"
                className={`${styles.navButton} ${styles.primary}`}
              >
                Dashboard
              </Link>
            </li>

            <li>
              <Link
                to="/businesses"
                className={`${styles.navButton} ${styles.secondary}`}
              >
                Businesses
              </Link>
            </li>
          </div>

          <div className={styles.right}>
            <li>
              <button
                onClick={handleSignOut}
                className={`${styles.navButton} ${styles.signOut}`}
              >
                Sign Out
              </button>
            </li>
          </div>
        </ul>
      ) : (
        <ul className={styles.navList}>
          <div className={styles.left}>
            <li>
              <Link
                to="/"
                className={`${styles.navButton}`}
              >
                Home
              </Link>
            </li>
          </div>

          <div className={styles.right}>
            <li>
              <Link
                to="/register"
                className={`${styles.navButton}`}
              >
                Sign Up
              </Link>
            </li>

            <li>
              <Link
                to="/login"
                className={`${styles.navButton}`}
              >
                Sign In
              </Link>
            </li>
          </div>
        </ul>
      )}
    </nav>
  );
};

export default NavBar;

