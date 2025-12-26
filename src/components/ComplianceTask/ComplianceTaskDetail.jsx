import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { showComplianceTask, deleteComplianceTask } from "../../services/complianceTaskService";

const ComplianceTaskDetail = () => {
    const { businessId, taskId } = useParams();
    const navigate = useNavigate();
    const [task, setTask] = useState(null);

    useEffect(() => {
        const fetchTask = async () => {
            const taskData = await showComplianceTask(businessId, taskId);
            setTask(taskData);
        };
        if (businessId && taskId) fetchTask();
    }, [businessId, taskId]);

    const handleDelete = async () => {
        await deleteComplianceTask(businessId, taskId);
        navigate(`/businesses/${businessId}`, { state: { activeTab: 'tasks' } });
    };

    if (!task) return <h3>Loading...</h3>;
     return (
        <main>
            <h1>{task.title}</h1>
            
            <section>
                <p><strong>Description:</strong></p>
                <p>{task.description}</p>
                
                <p><strong>Due Date:</strong> {new Date(task.due_date).toLocaleDateString()}</p>
                
                <p><strong>Status:</strong> {task.status}</p>
                
                {task.submission_date && (
                    <p><strong>Submission Date:</strong> {new Date(task.submission_date).toLocaleDateString()}</p>
                )}
                
                <p><strong>Created:</strong> {new Date(task.created_at).toLocaleDateString()}</p>
            </section>

            <div>
                <button onClick={() => navigate(`/businesses/${businessId}/compliance-tasks/edit/${taskId}`)}>
                    Edit
                </button>
                <button onClick={handleDelete}>
                    Delete
                </button>
                <button onClick={() => navigate(`/businesses/${businessId}`, { state: { activeTab: 'tasks' } })}>
                    Back to Business
                </button>
            </div>
        </main>
    );
};

export default ComplianceTaskDetail;