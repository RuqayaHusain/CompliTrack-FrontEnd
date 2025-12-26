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

  const isExpiringSoon = (date) => {
    const today = new Date();
    const expiryDate = new Date(date);
    const daysUntilExpiry = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry > 0 && daysUntilExpiry <= 30;
  };

  const isOverdue = (date) => {
    const today = new Date();
    const targetDate = new Date(date);
    return targetDate < today;
  };

  const overdueLicenses = allLicenses.filter(l => 
    l.status === 'Expired' || isOverdue(l.expiry_date)
  );

  const expiringSoonLicenses = allLicenses.filter(l => 
    l.status !== 'Expired' && isExpiringSoon(l.expiry_date)
  );

  const overdueTasks = allTasks.filter(t => 
    (t.status === 'Pending' || t.status === 'Late') && isOverdue(t.due_date)
  );

  const upcomingTasks = allTasks.filter(t => 
    t.status === 'Pending' && !isOverdue(t.due_date)
  ).slice(0, 5);

  if (loading) return <main><h3>Loading dashboard...</h3></main>;

  return (
    <main>
      <h1>Welcome, {user.username}</h1>
      <p>Dashboard Overview - {businesses.length} businesses tracked</p>

      <section>
        <h2> Expired Licenses ({overdueLicenses.length})</h2>
        {overdueLicenses.length > 0 ? (
          overdueLicenses.map(license => (
            <article key={license.id}>
              <h3>{license.name}</h3>
              <p>Business: {license.businessName}</p>
              <p>Status: {license.status}</p>
              <p>Expired: {new Date(license.expiry_date).toLocaleDateString()}</p>
              <button onClick={() => navigate(`/businesses/${license.businessId}`)}>View Business</button>
            </article>
          ))
        ) : (
          <p>No overdue or expired licenses.</p>
        )}
      </section>

      <section>
        <h2> Overdue Tasks ({overdueTasks.length})</h2>
        {overdueTasks.length > 0 ? (
          overdueTasks.map(task => (
            <article key={task.id}>
              <h3>{task.title}</h3>
              <p>Business: {task.businessName}</p>
              <p>Status: {task.status}</p>
              <p>Due: {new Date(task.due_date).toLocaleDateString()}</p>
              <button onClick={() => navigate(`/businesses/${task.businessId}`)}>View Business</button>
            </article>
          ))
        ) : (
          <p>No overdue tasks.</p>
        )}
      </section>

      <section>
        <h2> Expiring Soon Licenses ({expiringSoonLicenses.length})</h2>
        {expiringSoonLicenses.length > 0 ? (
          expiringSoonLicenses.map(license => (
            <article key={license.id}>
              <h3>{license.name}</h3>
              <p>Business: {license.businessName}</p>
              <p>Status: {license.status}</p>
              <p>Expires: {new Date(license.expiry_date).toLocaleDateString()}</p>
              <button onClick={() => navigate(`/businesses/${license.businessId}`)}>View Business</button>
            </article>
          ))
        ) : (
          <p>No licenses expiring soon.</p>
        )}
      </section>

      <section>
        <h2>Upcoming Tasks ({upcomingTasks.length})</h2>
        {upcomingTasks.length > 0 ? (
          upcomingTasks.map(task => (
            <article key={task.id}>
              <h3>{task.title}</h3>
              <p>Business: {task.businessName}</p>
              <p>Status: {task.status}</p>
              <p>Due: {new Date(task.due_date).toLocaleDateString()}</p>
              <button onClick={() => navigate(`/businesses/${task.businessId}`)}>View Business</button>
            </article>
          ))
        ) : (
          <p>No upcoming tasks.</p>
        )}
      </section>
    </main>
  );
};

export default Dashboard;