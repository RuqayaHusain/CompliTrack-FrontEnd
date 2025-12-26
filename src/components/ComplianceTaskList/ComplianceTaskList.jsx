import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { showAllComplianceTasks } from "../../services/complianceTaskService";
import ComplianceTaskCard from "../ComplianceTaskCard/ComplianceTaskCard";
import Filter from "../Filter/Filter";


const ComplianceTaskList = () => {
    const { businessId } = useParams();
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState({
        title: '',
        task_status: '',
        due_before: '',
        due_after: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTasks = async () => {
            const taskData = await showAllComplianceTasks(businessId, filter);
            setTasks(taskData);
        };
        if (businessId) fetchTasks();
    }, [businessId, filter]);

    const handleFilterChange = (evt) => {
        const { name, value } = evt.target;
        setFilter((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleClearFilters = () => {
        setFilter({
            title: '',
            task_status: '',
            due_before: '',
            due_after: '',
        });
    };

    return (
        <main>
            <div>
                <h2>Compliance Tasks</h2>
                <button
                    onClick={() =>
                        navigate(`/businesses/${businessId}/compliance-tasks/new`)
                    }
                >
                    Add Compliance Task
                </button>
            </div>

            <div>
                <Filter
                    type='task'
                    filter={filter}
                    handleFilterChange={handleFilterChange}
                    handleClearFilters={handleClearFilters}
                />
            </div>


            {tasks.length === 0 ? (
                <div>
                    <p>
                        No compliance tasks found.
                        {filter.title ||
                            filter.task_status ||
                            filter.due_before ||
                            filter.due_after
                            ? " Try different filters."
                            : " Add your first task!"}
                    </p>
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