import { Link, useNavigate } from "react-router";
import { deleteComplianceTask } from "../../services/complianceTaskService";

const ComplianceTaskCard = ({ task, businessId , onDelete }) => {
    const navigate = useNavigate();

    const handleEdit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        navigate(`/businesses/${businessId}/compliance-tasks/edit/${task.id}`);
    };

    const handleDelete = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        await deleteComplianceTask(businessId, task.id);
        if (onDelete) onDelete(task.id);
    };

    return (
        <Link key={task.id} to={`/businesses/${businessId}/compliance-tasks/${task.id}`}>
            <article>
                <div>
                    <h2>{task.title}</h2>
                    <span>Status: {task.status}</span>
                    <p>
                        Due:{" "}
                        {task.due_date
                            ? new Date(task.due_date).toLocaleDateString()
                            : "N/A"}
                    </p>
                </div>
                <div>
                    <p>View Details</p>
                     <button onClick={handleEdit}>Edit</button>
                    <button onClick={handleDelete}>Delete</button>
                </div>
            </article>
        </Link>
    );
};

export default ComplianceTaskCard;