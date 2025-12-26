import { Link } from "react-router";

const ComplianceTaskCard = ({ task, businessId }) => {

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
                </div>
            </article>
        </Link>
    );
};

export default ComplianceTaskCard;