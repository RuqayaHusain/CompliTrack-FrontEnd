import { Link } from "react-router";
import styles from "./ComplianceTaskCard.module.css";

const ComplianceTaskCard = ({ task, businessId }) => {
    const getStatusClass = () => {
        switch (task.status) {
            case "Pending":
                return styles.pending;
            case "Submitted":
                return styles.submitted;
            case "Late":
                return styles.late;
            default:
                return "";
        }
    };

    return (
        <Link
            to={`/businesses/${businessId}/compliance-tasks/${task.id}`}
            className={styles.link}
        >
            <article className={`${styles.card} ${getStatusClass()}`}>
                <div>
                    <h3 className={styles.title}>{task.title}</h3>
                    <p>
                        <strong>Due:</strong>{" "}
                        {task.due_date
                            ? new Date(task.due_date).toLocaleDateString()
                            : "N/A"}
                    </p>
                </div>

                <span className={styles.detailsButton}>View Details</span>
            </article>
        </Link>
    );
};

export default ComplianceTaskCard;