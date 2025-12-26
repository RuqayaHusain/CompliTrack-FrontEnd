import { Link } from "react-router";
import styles from './BusinessCard.module.css';

const BusinessCard = ({ business }) => {

    return (
        <Link key={business.id} to={`/businesses/${business.id}`} className={styles.link}>
            <article className={styles.card}>
                <div className={styles.header}>
                    <h2 className={styles.name}>{business.name}</h2>
                    <span className={styles.industry}>{business.industry}</span>
                </div>
                <div className={styles.stats}>
                    <span className={styles.badge}>
                        {business.licenses?.length || 0} Licenses
                    </span>
                    <span className={styles.badge}>
                        {business.compliance_tasks?.length || 0} Tasks
                    </span>
                </div>
                <div className={styles.footer}>
                    <button className={styles.detailsButton}>View Details</button>
                </div>
            </article>
        </Link>
    );
};

export default BusinessCard;