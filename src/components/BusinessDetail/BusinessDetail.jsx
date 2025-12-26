import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router";
import { UserContext } from "../../contexts/UserContext";
import { showBusiness } from "../../services/businessService";
import LicenseList from "../LicenseList/LicenseList";
import ComplianceTaskList from "../ComplianceTaskList/ComplianceTaskList";
import styles from './BusinessDetail.module.css';

const BusinessDetail = ({ handleDeleteBusiness }) => {
    const { businessId } = useParams();
    const { user } = useContext(UserContext);

    const [business, setBusiness] = useState(null);
    const location = useLocation();
    const [activeTab, setActiveTab] = useState(location.state?.activeTab || 'details'); const navigate = useNavigate();

    useEffect(() => {
        const fetchBusiness = async () => {
            const businessData = await showBusiness(businessId);
            setBusiness(businessData);
        };
        if (businessId) fetchBusiness();
    }, [businessId]);

    if (!business) return <h3 className={styles.loading}>Loading ...</h3>


    const isOwner = user && business.user_id === user.id;

    return (
        <main className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>{business.name}</h1>
                {isOwner && (
                    <div className={styles.actions}>
                        <button
                            className={`${styles.button} ${styles.edit}`}
                            onClick={() => navigate(`/businesses/edit/${businessId}`)}
                        >
                            Edit
                        </button>
                        <button
                            className={`${styles.button} ${styles.delete}`}
                            onClick={() => handleDeleteBusiness(businessId)}
                        >
                            Delete
                        </button>
                    </div>
                )}
            </div>

            <div className={styles.tabs}>
                <button
                    className={`${styles.tab} ${activeTab === 'details' ? styles.activeTab : ''}`}
                    onClick={() => setActiveTab('details')}
                >
                    Business Details
                </button>
                <button
                    className={`${styles.tab} ${activeTab === 'licenses' ? styles.activeTab : ''}`}
                    onClick={() => setActiveTab('licenses')}
                >
                    Licenses
                </button>
                <button
                    className={`${styles.tab} ${activeTab === 'tasks' ? styles.activeTab : ''}`}
                    onClick={() => setActiveTab('tasks')}
                >
                    Compliance Tasks
                </button>
            </div>

            {activeTab === 'details' && (
                <section className={styles.detailsSection}>
                    {business.image_url && (
                        <img
                            src={business.image_url}
                            alt={business.name}
                            className={styles.image}
                        />
                    )}
                    <p className={styles.description}>{business.description || 'No description provided.'}</p>
                    <p><strong>Industry:</strong> {business.industry}</p>
                    <p><strong>CR Number:</strong> {business.cr_number}</p>
                </section>
            )}

            {activeTab === 'licenses' && (
                <section className={styles.tabSection}>
                    <LicenseList businessId={businessId} />
                </section>
            )}

            {activeTab === 'tasks' && (
                <section className={styles.tabSection}>
                    <ComplianceTaskList />
                </section>
            )}
        </main>
    );
};

export default BusinessDetail;