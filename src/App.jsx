// src/App.jsx

import { Routes, Route } from 'react-router'; // Import React Router

import NavBar from './components/NavBar/NavBar';
// Import the SignUpForm component
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import { useContext } from 'react';
import { UserContext } from './contexts/UserContext';
import BusinessList from './components/BusinessList/BusinessList';
import BusinessDetail from './components/BusinessDetail/BusinessDetail';

const App = () => {
  const { user } = useContext(UserContext);

  return (
    <>
      <NavBar />

      <Routes>
        {
          user ?
          <>
            <Route path='/' element={<Dashboard/>}/>
            <Route path='/profile' element={<h1>{user.username}</h1>}/>
            <Route path='/businesses' element={<BusinessList />}/>
            <Route path='/businesses/:businessId' element={<BusinessDetail />}/>
          </>
            :
            <Route path='/' element={<Landing/>}/>
        }
        <Route path='/register' element={<SignUpForm />} />
        <Route path='/login' element={<SignInForm />} />
      </Routes>
    </>
  );
};

export default App;

