const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/businesses`;

const showAllBusinesses = async (filters = {}) => {
    try {
        const params = new URLSearchParams();
        if (filters.name) params.append('name', filters.name);
        if (filters.industry) params.append('industry', filters.industry);
        
        const token = localStorage.getItem('token');
        
        const response = await fetch(`${BASE_URL}?${params.toString()}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token ? `Bearer ${token}` : ''
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error fetching businesses:', error);
        throw error;
    }
};

export{
    showAllBusinesses
};