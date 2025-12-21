// src/App.jsx

import { Routes, Route, useNavigate } from 'react-router'; // Import React Router

import NavBar from './components/NavBar/NavBar';
// Import the SignUpForm component
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import { useContext, useState } from 'react';
import { UserContext } from './contexts/UserContext';
import BusinessList from './components/BusinessList/BusinessList';
import BusinessDetail from './components/BusinessDetail/BusinessDetail';
import BusinessForm from './components/BusinessForm/BusinessForm';
import { createBusiness, updateBusiness, deleteBusiness } from './services/businessService';
import LicenseList from './components/LicenseList/LicenseList';
import LicenseForm from './components/LicenseForm/LicenseForm';

const App = () => {
  const [businesses, setBusinesses] = useState([]);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleAddBusiness = async (businessFormData) => {
    const newBusiness = await createBusiness(businessFormData);
    setBusinesses([newBusiness, ...businesses]);
    navigate('/businesses');
  };

  const handleUpdateBusiness = async (businessId, businessFormData) => {
    const updatedBusiness = await updateBusiness(businessId, businessFormData);
    setBusinesses(businesses.map((business) => (businessId === business._id ? updatedBusiness : business)));
    navigate(`/businesses/${businessId}`);
  };

  const handleDeleteBusiness = async (businessId) => {
    const deletedBusiness = await deleteBusiness(businessId);
    setBusinesses(businesses.filter((business) => business._id !== deletedBusiness._id));
    navigate('/businesses');
  };

  return (
    <>
      <NavBar />

      <Routes>
        {
          user ?
            <>
              <Route path='/' element={<Dashboard />} />
              <Route path='/profile' element={<h1>{user.username}</h1>} />
              <Route path='/businesses' element={<BusinessList />} />
              <Route path='/businesses/:businessId' element={<BusinessDetail handleDeleteBusiness={handleDeleteBusiness} />} />
              <Route path='/businesses/new' element={<BusinessForm handleAddBusiness={handleAddBusiness} />} />
              <Route path='/businesses/edit/:businessId' element={<BusinessForm handleUpdateBusiness={handleUpdateBusiness} />} />
              <Route path='/businesses/:businessId/licenses' element={<LicenseList />} />
              <Route path='/businesses/:businessId/licenses/new' element={<LicenseForm />} />
            </>
            :
            <Route path='/' element={<Landing />} />
        }
        <Route path='/register' element={<SignUpForm />} />
        <Route path='/login' element={<SignInForm />} />
      </Routes>
    </>
  );
};

export default App;

