import { Link } from "react-router";
import styles from "./LicenseCard.module.css";

const LicenseCard = ({ license, businessId }) => {
    const getStatusClass = () => {
        switch (license.status) {
            case "Expired":
                return styles.expired;
            case "Pending Renewal":
                return styles.pending;
            case "Valid":
                return styles.valid;
            default:
                return "";
        }
    };
    return (
        <Link
            to={`/businesses/${businessId}/licenses/${license.id}`}
            className={styles.link}
        >
            <article className={`${styles.card} ${getStatusClass()}`}>
                <div>
                    <h3 className={styles.name}>{license.name}</h3>

                    <p>
                        <strong>Status:</strong> {license.status}
                    </p>

                    <p>
                        <strong>Expiry:</strong>{" "}
                        {license.expiry_date
                            ? new Date(license.expiry_date).toLocaleDateString()
                            : "N/A"}
                    </p>
                </div>

                <span className={styles.detailsButton}>View Details</span>
            </article>
        </Link>
    );
};

export default LicenseCard;