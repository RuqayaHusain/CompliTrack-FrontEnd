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

   useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const businessData = await showAllBusinesses();
        setBusinesses(businessData);

        const licenses = [];
        const tasks = [];

        for (const business of businessData) {
          const businessLicenses = await showAllLicenses(business.id);
          const businessTasks = await showAllComplianceTasks(business.id);
          
          licenses.push(...businessLicenses.map(l => ({ ...l, businessName: business.name, businessId: business.id })));
          tasks.push(...businessTasks.map(t => ({ ...t, businessName: business.name, businessId: business.id })));
        }

        setAllLicenses(licenses);
        setAllTasks(tasks);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    if (user) fetchDashboardData();
  }, [user]);

  