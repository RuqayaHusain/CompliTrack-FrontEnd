// Import the useContext hook
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router';

import { signUp } from '../../services/authService';

// Import the UserContext object
import { UserContext } from '../../contexts/UserContext';

import styles from './SignUpForm.module.css';

const SignUpForm = () => {
  const navigate = useNavigate();
  // Pass the UserContext object to the useContext hook to access:
  // - The user state (which we're not using here).
  // - The setUser function to update the user state (which we are using).
  //
  // Destructure the object returned by the useContext hook for easy access
  // to the data we added to the context with familiar names.
  const { setUser } = useContext(UserContext);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    passwordConf: '',
  });


  const { username, email, password, passwordConf } = formData;

  const handleChange = (evt) => {
    setMessage('');
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

 const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const newUser = await signUp(formData);
      // Call the setUser function to update the user state, just like normal.

      setUser(newUser);
      // Take the user to the (non-existent) home page after they sign up.
      // We'll get to this shortly!
      navigate('/');
    } catch (err) {
      setMessage(err.message);
    }
  };

  const isFormInvalid = () => {
    return !(username && email && password && password === passwordConf);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Sign Up</h1>
        <p className={styles.message}>{message}</p>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label htmlFor='username'>Username:</label>
            <input
              type='text'
              id='username'
              name='username'
              value={username}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.field}>
            <label htmlFor='email'>Email:</label>
            <input
              type='email'
              id='email'
              name='email'
              value={email}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.field}>
            <label htmlFor='password'>Password:</label>
            <input
              type='password'
              id='password'
              name='password'
              value={password}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.field}>
            <label htmlFor='passwordConf'>Confirm Password:</label>
            <input
              type='password'
              id='passwordConf'
              name='passwordConf'
              value={passwordConf}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.actions}>
            <button className={`${styles.button} ${styles.primary} ${isFormInvalid() ? styles.disabled : ''}`} disabled={isFormInvalid()}>
              Sign Up
            </button>
            <button
              type='button'
              className={`${styles.button} ${styles.secondary}`}
              onClick={() => navigate('/')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
