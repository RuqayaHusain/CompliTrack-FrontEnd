import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { showComplianceTask, deleteComplianceTask } from "../../services/complianceTaskService";
import styles from "./ComplianceTaskDetail.module.css";

const ComplianceTaskDetail = () => {
    const { businessId, taskId } = useParams();
    const navigate = useNavigate();
    const [task, setTask] = useState(null);

    const handleEdit = () => {
        navigate(`/businesses/${businessId}/compliance-tasks/edit/${task.id}`);
    };

    const handleDelete = async () => {
        await deleteComplianceTask(businessId, taskId);
        navigate(`/businesses/${businessId}`, { state: { activeTab: 'tasks' } });
    };

    useEffect(() => {
        const fetchTask = async () => {
            const taskData = await showComplianceTask(businessId, taskId);
            setTask(taskData);
        };
        if (businessId && taskId) fetchTask();
    }, [businessId, taskId]);

    if (!task) return <h3>Loading...</h3>;

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
        <main className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>{task.title}</h1>
                <div className={styles.actions}>
                    <button className={`${styles.button} ${styles.edit}`} onClick={handleEdit}>
                        Edit
                    </button>
                    <button className={`${styles.button} ${styles.delete}`} onClick={handleDelete}>
                        Delete
                    </button>
                    <button
                        className={`${styles.button} ${styles.secondary}`}
                        onClick={() => navigate(`/businesses/${businessId}`, { state: { activeTab: 'tasks' } })}
                    >
                        Back to Business
                    </button>
                </div>
            </div>

            <section className={styles.detailsSection}>
                <p className={styles.description}>{task.description || 'No description provided.'}</p>

                <p>
                    <strong>Status:</strong>{" "}
                    <span className={`${styles.statusBadge} ${getStatusClass()}`}>
                        {task.status}
                    </span>
                </p>

                <p><strong>Due Date:</strong> {task.due_date ? new Date(task.due_date).toLocaleDateString() : 'N/A'}</p>
                {task.submission_date && task.status == 'Submitted' && (
                    <p><strong>Submission Date:</strong> {new Date(task.submission_date).toLocaleDateString()}</p>
                )}
            </section>
        </main>
    );
};

export default ComplianceTaskDetail;