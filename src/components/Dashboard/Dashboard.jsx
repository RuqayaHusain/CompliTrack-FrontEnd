// src/components/Dashboard/Dashboard.jsx

import { useContext, useEffect , useState } from 'react';
import * as userService from '../../services/userService'
import { UserContext } from '../../contexts/UserContext';
import { showAllBusinesses } from '../../services/businessService';
import { showAllLicenses } from '../../services/licenseService';
import { showAllComplianceTasks } from '../../services/complianceTaskService';
import { useNavigate } from 'react-router';

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [businesses, setBusinesses] = useState([]);
  const [allLicenses, setAllLicenses] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
  const [loading, setLoading] = useState(true);

   