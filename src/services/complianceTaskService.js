const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/businesses`;

const showAllComplianceTasks = async (businessId) => {
    try {
        const token = localStorage.getItem('token');

        const response = await fetch(`${BASE_URL}/${businessId}/compliance-tasks`, {
            headers: {
                'Authorization': token ? `Bearer ${token}` : ''
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json();
    } catch (error) {
        console.error('Error fetching compliance tasks:', error);
        throw error;
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
        console.error('Error fetching compliance task:', error);
        throw error;
    }
};
