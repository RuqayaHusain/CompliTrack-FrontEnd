import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { UserContext } from "../../contexts/UserContext";
import { deleteLicense, showLicense } from "../../services/licenseService";
import styles from "./LicenseDetail.module.css";

const LicenseDetail = () => {
    const { businessId, licenseId } = useParams();
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const [license, setLicense] = useState(null);

    const handleEdit = () => {
        navigate(`/businesses/${businessId}/licenses/edit/${license.id}`);
    };

    const handleDelete = async () => {
        await deleteLicense(businessId, license.id);
        navigate(`/businesses/${businessId}`, { state: { activeTab: 'licenses' } });
    };

    useEffect(() => {
        const fetchLicense = async () => {
            const licenseData = await showLicense(businessId, licenseId);
            setLicense(licenseData);
        };
        if (businessId && licenseId) fetchLicense();
    }, [businessId, licenseId]);

    if (!license) return <h3>Loading ...</h3>

    const isOwner = user && license.business?.user_id === user.id;

    const getStatusClass = () => {
        switch (license.status) {
            case "Valid":
                return styles.valid;
            case "Expired":
                return styles.expired;
            case "Pending Renewal":
                return styles.pending;
            default:
                return "";
        }
    };

    return (
        <main className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>{license.name}</h1>
                {isOwner && (
                    <div className={styles.actions}>
                        <button className={`${styles.button} ${styles.edit}`} onClick={handleEdit}>
                            Edit
                        </button>
                        <button className={`${styles.button} ${styles.delete}`} onClick={handleDelete}>
                            Delete
                        </button>
                        <button
                            className={`${styles.button} ${styles.secondary}`}
                            onClick={() => navigate(`/businesses/${businessId}`, { state: { activeTab: 'licenses' } })}
                        >
                            Back to Business
                        </button>
                    </div>
                )}
            </div>

            <section className={styles.detailsSection}>
                <p className={styles.description}>{license.description || 'No description provided.'}</p>

                <p>
                    <strong>Status:</strong>{" "}
                    <span className={`${styles.statusBadge} ${getStatusClass()}`}>
                        {license.status}
                    </span>
                </p>

                <p>
                    <strong>Issue Date:</strong>{" "}
                    {license.issue_date ? new Date(license.issue_date).toLocaleDateString() : "N/A"}
                </p>

                <p>
                    <strong>Expiry Date:</strong>{" "}
                    {license.expiry_date ? new Date(license.expiry_date).toLocaleDateString() : "N/A"}
                </p>
            </section>
        </main>
    );
};

export default LicenseDetail;