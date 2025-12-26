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