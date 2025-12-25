import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { createComplianceTask } from "../../services/complianceTaskService";

const ComplianceTaskForm = () => {
    const { businessId } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        due_date: '',
        status: 'Pending',
        submission_date: '',
    });
    const [validationMessage, setValidationMessage] = useState('');

    const handleChange = (evt) => {
        setFormData({
            ...formData,
            [evt.target.name]: evt.target.value
        });
        setValidationMessage('');
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        if (!formData.title.trim()) return setValidationMessage('Task title is required');
        if (!formData.description.trim()) return setValidationMessage('Task description is required');
        if (!formData.due_date) return setValidationMessage('Due date is required');
        if (!formData.status) return setValidationMessage('Status is required');
                
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
    
    await createComplianceTask(businessId, formattedData);
    navigate(`/businesses/${businessId}`);
};

    return (
        <main>
            <h1>Add Compliance Task</h1>
            {validationMessage && <p>{validationMessage}</p>}
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