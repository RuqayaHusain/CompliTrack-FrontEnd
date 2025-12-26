const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/businesses`;

const showAllComplianceTasks = async (businessId, filters = {}) => {
    try {
        const params = new URLSearchParams();
        if (filters.title) params.append('title', filters.title);
        if (filters.task_status) params.append('task_status', filters.task_status);
        if (filters.due_before) params.append('due_before', new Date(filters.due_before).toISOString());
        if (filters.due_after) params.append('due_after', new Date(filters.due_after).toISOString());

        const token = localStorage.getItem('token');

        const response = await fetch(`${BASE_URL}/${businessId}/compliance-tasks?${params.toString()}`, {
            headers: {
                'Authorization': token ? `Bearer ${token}` : ''
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json();
    } catch (error) {
        throw new Error(error);
    }
};

const showComplianceTask = async (businessId, taskId) => {
    try {
        const token = localStorage.getItem('token');

        const response = await fetch(`${BASE_URL}/${businessId}/compliance-tasks/${taskId}`, {
            headers: {
                'Authorization': token ? `Bearer ${token}` : ''
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json();
    } catch (error) {
        throw new Error(error);
    }
};

const createComplianceTask = async (businessId, taskFormData) => {
    try {
        const token = localStorage.getItem('token');

        const response = await fetch(`${BASE_URL}/${businessId}/compliance-tasks`, {
            method: 'POST',
            headers: {
                'Authorization': token ? `Bearer ${token}` : '',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(taskFormData),
        });

        return response.json();
    } catch (error) {
        throw new Error(error);
    }
};


const updateComplianceTask = async (businessId, taskId, taskFormData) => {
    try {
        const token = localStorage.getItem('token');

        const response = await fetch(`${BASE_URL}/${businessId}/compliance-tasks/${taskId}`, {
            method: 'PUT',
            headers: {
                'Authorization': token ? `Bearer ${token}` : '',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(taskFormData),
        });

        return response.json();
    } catch (error) {
        throw new Error(error);
    }
};

const deleteComplianceTask = async (businessId, taskId) => {
    try {
        const token = localStorage.getItem('token');

        const response = await fetch(`${BASE_URL}/${businessId}/compliance-tasks/${taskId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': token ? `Bearer ${token}` : '',
            },
        });

        return response.json();
    } catch (error) {
        throw new Error(error);
    }
};

export {
    showAllComplianceTasks,
    showComplianceTask,
    createComplianceTask,
    updateComplianceTask,
    deleteComplianceTask,
};