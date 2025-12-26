import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { createComplianceTask, showComplianceTask, updateComplianceTask } from "../../services/complianceTaskService";
import styles from "./ComplianceTaskForm.module.css";

const ComplianceTaskForm = () => {
    const { businessId, taskId } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        due_date: '',
        status: 'Pending',
        submission_date: '',
    });
    const isEditMode = Boolean(taskId);

    useEffect(() => {
        const fetchTask = async () => {
            if (taskId) {
                const taskData = await showComplianceTask(businessId, taskId);
                setFormData({
                    title: taskData.title,
                    description: taskData.description,
                    due_date: taskData.due_date ? taskData.due_date.split('T')[0] : '',
                    status: taskData.status,
                    submission_date: taskData.submission_date ? taskData.submission_date.split('T')[0] : '',
                });
            }
        };
        fetchTask();
    }, [businessId, taskId]);

    const handleChange = (evt) => {
        setFormData({
            ...formData,
            [evt.target.name]: evt.target.value
        });
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        handleAddTask(businessId, formData);
    };

    const handleAddTask = async (businessId, taskFormData) => {
        const formattedData = {
            ...taskFormData,
            due_date: new Date(taskFormData.due_date).toISOString(),
            submission_date: taskFormData.submission_date
                ? new Date(taskFormData.submission_date).toISOString()
                : null
        };

        if (isEditMode) {
            await updateComplianceTask(businessId, taskId, formattedData);
            navigate(`/businesses/${businessId}/compliance-tasks/${taskId}`);
        } else {
            await createComplianceTask(businessId, formattedData);
            navigate(`/businesses/${businessId}`, { state: { activeTab: 'tasks' } });
        }
    };

    const handleCancelButton = () => {
        if (isEditMode) {
            navigate(`/businesses/${businessId}/compliance-tasks/${taskId}`);
        } else {
            navigate(`/businesses/${businessId}`, { state: { activeTab: 'tasks' } });
        }
    };

    return (
        <main className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.title}>
                    {isEditMode ? 'Edit Compliance Task' : 'Add Compliance Task'}
                </h1>

                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.field}>
                        <label htmlFor="title">Title</label>
                        <input
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="due_date">Due Date</label>
                        <input
                            type="date"
                            id="due_date"
                            name="due_date"
                            value={formData.due_date}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="status">Status</label>
                        <select
                            id="status"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            required
                        >
                            <option value="Pending">Pending</option>
                            <option value="Submitted">Submitted</option>
                            <option value="Late">Late</option>
                        </select>
                    </div>

                    {formData.status === 'Submitted' && (
                        <div className={styles.field}>
                            <label htmlFor="submission_date">Submission Date</label>
                            <input
                                type="date"
                                name="submission_date"
                                id="submission_date"
                                value={formData.submission_date}
                                onChange={handleChange}
                            />
                        </div>
                    )}

                    <div className={styles.buttonGroup}>
                        <button type="submit" className={styles.submitButton}>Submit</button>
                        <button
                            type="button"
                            className={styles.cancelButton}
                            onClick={handleCancelButton}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default ComplianceTaskForm;