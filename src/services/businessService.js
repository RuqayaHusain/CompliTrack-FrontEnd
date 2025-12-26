const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/businesses`;

const showAllBusinesses = async (filters = {}) => {
    try {
        const params = new URLSearchParams();
        if (filters.name) params.append('name', filters.name);
        if (filters.industry) params.append('industry', filters.industry);

        const token = localStorage.getItem('token');

        const response = await fetch(`${BASE_URL}?${params.toString()}`, {
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

const showBusiness = async (businessId) => {
    try {
        const token = localStorage.getItem('token');

        const response = await fetch(`${BASE_URL}/${businessId}`, {
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

const createBusiness = async (businessFormData) => {
    try {
        const token = localStorage.getItem('token');

        const response = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Authorization': token ? `Bearer ${token}` : '',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(businessFormData),
        });

        return response.json();
    } catch (error) {
        throw new Error(error);
    }
};

const updateBusiness = async (businessId, businessFormData) => {
    try {
        const token = localStorage.getItem('token');

        const response = await fetch(`${BASE_URL}/${businessId}`, {
            method: 'PUT',
            headers: {
                'Authorization': token ? `Bearer ${token}` : '',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(businessFormData),
        });

        return response.json();
    } catch (error) {
        throw new Error(error);
    }
};

const deleteBusiness = async (businessId) => {
    try {
        const token = localStorage.getItem('token');

        const response = await fetch(`${BASE_URL}/${businessId}`, {
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
    showAllBusinesses,
    showBusiness,
    createBusiness,
    updateBusiness,
    deleteBusiness,
};