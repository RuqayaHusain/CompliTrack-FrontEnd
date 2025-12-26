import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { createComplianceTask, showComplianceTask, updateComplianceTask } from "../../services/complianceTaskService";

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

    return (
        <main>
            <h1>{isEditMode ? 'Edit Compliance Task' : 'Add Compliance Task'}</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title:</label>
                <input
                    type="text"
                    name="title"
                    id="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="description">Description:</label>
                <textarea
                    name="description"
                    id="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="due_date">Due Date:</label>
                <input
                    type="date"
                    name="due_date"
                    id="due_date"
                    value={formData.due_date}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="status">Status:</label>
                <select
                    name="status"
                    id="status"
                    value={formData.status}
                    onChange={handleChange}
                    required
                >
                    <option value="Pending">Pending</option>
                    <option value="Submitted">Submitted</option>
                    <option value="Late">Late</option>
                </select>

                {formData.status === 'Submitted' && (
                    <>
                        <label htmlFor="submission_date">Submission Date:</label>
                        <input
                            type="date"
                            name="submission_date"
                            id="submission_date"
                            value={formData.submission_date}
                            onChange={handleChange}
                        />
                    </>
                )}

                <button type="submit">Submit</button>
            </form>
        </main>
    );
};

export default ComplianceTaskForm;