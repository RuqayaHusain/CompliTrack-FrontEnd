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
    