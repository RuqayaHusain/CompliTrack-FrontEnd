import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { showAllComplianceTasks } from "../../services/complianceTaskService";
import ComplianceTaskCard from "../ComplianceTaskCard/ComplianceTaskCard";
import Filter from "../Filter/Filter";
import styles from "./ComplianceTaskList.module.css";


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
        <section className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.title}>Compliance Tasks</h2>
                <button
                    className={styles.addButton}
                    onClick={() =>
                        navigate(`/businesses/${businessId}/compliance-tasks/new`)
                    }
                >
                    + Add Compliance Task
                </button>
            </div>

            <Filter
                type='task'
                filter={filter}
                handleFilterChange={handleFilterChange}
                handleClearFilters={handleClearFilters}
            />

            {tasks.length === 0 ? (
                <div className={styles.empty}>
                    <p>No compliance tasks found.</p>
                    {(filter.title ||
                        filter.task_status ||
                        filter.due_before ||
                        filter.due_after) && (
                            <small>Try adjusting your filters.</small>
                        )}
                </div>
            ) : (
                <div className={styles.grid}>
                    {tasks.map((task) => (
                        <ComplianceTaskCard
                            key={task.id}
                            task={task}
                            businessId={businessId}
                        />
                    ))}
                </div>
            )}
        </section>
    );
};

export default ComplianceTaskList;