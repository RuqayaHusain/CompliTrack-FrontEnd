import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { showAllComplianceTasks } from "../../services/complianceTaskService";
import ComplianceTaskCard from "../ComplianceTaskCard/ComplianceTaskCard";


const ComplianceTaskList = () => {
    const { businessId } = useParams();
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTasks = async () => {
            const taskData = await showAllComplianceTasks(businessId);
            setTasks(taskData);
        };
        if (businessId) fetchTasks();
    }, [businessId]);

    return (
        <main>
            <div>
                <h1>Compliance Tasks</h1>
                <button
                    onClick={() =>
                        navigate(`/businesses/${businessId}/compliance-tasks/new`)
                    }
                >
                    Add Compliance Task
                </button>
            </div>

            {tasks.length === 0 ? (
                <div>
                    <p>No compliance tasks found. Add your first task!</p>
                    <button
                        onClick={() =>
                            navigate(`/businesses/${businessId}/compliance-tasks/new`)
                        }
                    >
                        Add Compliance Task
                    </button>
                </div>
            ) : (
                <div>
                    {tasks.map((task) => (
                        <ComplianceTaskCard
                            key={task.id}
                            task={task}
                            businessId={businessId}
                        />
                    ))}
                </div>
            )}
        </main>
    );
};

export default ComplianceTaskList;