import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { showAllBusinesses } from '../../services/businessService';
import { showAllLicenses } from '../../services/licenseService';
import { showAllComplianceTasks } from '../../services/complianceTaskService';
import { useNavigate } from 'react-router';
import styles from './Dashboard.module.css';

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

  if (loading) {
    return (
      <main className={styles.dashboard}>
        <h3 className={styles.empty}>Loading dashboard...</h3>
      </main>
    );
  }
  return (
    <main className={styles.dashboard}>
      
      <header className={styles.header}>
        <h1>Welcome, {user.username}</h1>
        <p>Dashboard Overview - {businesses.length} businesses tracked</p>
      </header>

      <section className={styles.section}>

        <div className={styles.sectionHeader}>
          <h2> Expired Licenses ({overdueLicenses.length})</h2>
        </div>

        {overdueLicenses.length > 0 ? (
          <div className={styles.cardGrid}>
            {overdueLicenses.map(license => (
              <article
                key={license.id}
                className={`${styles.card} ${styles.expired}`}
              >
                <h3>{license.name}</h3>
                <p>Business: {license.businessName}</p>
                <p>Status: {license.status}</p>
                <p>
                  Expired:{' '}
                  {new Date(license.expiry_date).toLocaleDateString()}
                </p>
                <button
                  className={styles.button}
                  onClick={() =>
                    navigate(`/businesses/${license.businessId}`)
                  }
                >
                  View Business
                </button>
              </article>
            ))}
          </div>
        ) : (
          <p className={styles.empty}>No overdue or expired licenses.</p>
        )}
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>Overdue Tasks ({overdueTasks.length})</h2>
        </div>

        {overdueTasks.length > 0 ? (
          <div className={styles.cardGrid}>
            {overdueTasks.map(task => (
              <article
                key={task.id}
                className={`${styles.card} ${styles.overdue}`}
              >
                <h3>{task.title}</h3>
                <p>Business: {task.businessName}</p>
                <p>Status: {task.status}</p>
                <p>
                  Due: {new Date(task.due_date).toLocaleDateString()}
                </p>
                <button
                  className={styles.button}
                  onClick={() =>
                    navigate(`/businesses/${task.businessId}`)
                  }
                >
                  View Business
                </button>
              </article>
            ))}
          </div>
        ) : (
          <p className={styles.empty}>No overdue tasks.</p>
        )}
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>
            Expiring Soon Licenses ({expiringSoonLicenses.length})
          </h2>
        </div>

        {expiringSoonLicenses.length > 0 ? (
          <div className={styles.cardGrid}>
            {expiringSoonLicenses.map(license => (
              <article
                key={license.id}
                className={`${styles.card} ${styles.warning}`}
              >
                <h3>{license.name}</h3>
                <p>Business: {license.businessName}</p>
                <p>Status: {license.status}</p>
                <p>
                  Expires:{' '}
                  {new Date(license.expiry_date).toLocaleDateString()}
                </p>
                <button
                  className={styles.button}
                  onClick={() =>
                    navigate(`/businesses/${license.businessId}`)
                  }
                >
                  View Business
                </button>
              </article>
            ))}
          </div>
        ) : (
          <p className={styles.empty}>No licenses expiring soon.</p>
        )}
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>Upcoming Tasks ({upcomingTasks.length})</h2>
        </div>

        {upcomingTasks.length > 0 ? (
          <div className={styles.cardGrid}>
            {upcomingTasks.map(task => (
              <article
                key={task.id}
                className={`${styles.card} ${styles.upcoming}`}
              >
                <h3>{task.title}</h3>
                <p>Business: {task.businessName}</p>
                <p>Status: {task.status}</p>
                <p>
                  Due: {new Date(task.due_date).toLocaleDateString()}
                </p>
                <button
                  className={styles.button}
                  onClick={() =>
                    navigate(`/businesses/${task.businessId}`)
                  }
                >
                  View Business
                </button>
              </article>
            ))}
          </div>
        ) : (
          <p className={styles.empty}>No upcoming tasks.</p>
        )}
      </section>
    </main>
  );
};

export default Dashboard;