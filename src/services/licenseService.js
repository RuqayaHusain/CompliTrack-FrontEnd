const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/businesses`;

const showAllLicenses = async (businessId, filters = {}) => {
    try {
        const params = new URLSearchParams();
        if (filters.name) params.append('name', filters.name);
        if (filters.license_status) params.append('license_status', filters.license_status);
        if (filters.expiry_before) params.append('expiry_before', new Date(filters.expiry_before).toISOString());
        if (filters.expiry_after) params.append('expiry_after', new Date(filters.expiry_after).toISOString());

        const token = localStorage.getItem('token');

        const response = await fetch(`${BASE_URL}/${businessId}/licenses?${params.toString()}`, {
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

const showLicense = async (businessId, licenseId) => {
    try {
        const token = localStorage.getItem('token');

        const response = await fetch(`${BASE_URL}/${businessId}/licenses/${licenseId}`, {
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

const createLicense = async (businessId, licenseFormData) => {
    try {
        const token = localStorage.getItem('token');

        const response = await fetch(`${BASE_URL}/${businessId}/licenses`, {
            method: 'POST',
            headers: {
                'Authorization': token ? `Bearer ${token}` : '',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(licenseFormData),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json();
    } catch (error) {
        throw new Error(error);
    }
};

const updateLicense = async (businessId, licenseId, licenseFormData) => {
    try {
        const token = localStorage.getItem('token');

        const response = await fetch(`${BASE_URL}/${businessId}/licenses/${licenseId}`, {
            method: 'PUT',
            headers: {
                'Authorization': token ? `Bearer ${token}` : '',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(licenseFormData),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json();
    } catch (error) {
        throw new Error(error);
    }
};

const deleteLicense = async (businessId, licenseId) => {
    try {
        const token = localStorage.getItem('token');

        const response = await fetch(`${BASE_URL}/${businessId}/licenses/${licenseId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': token ? `Bearer ${token}` : '',
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

export {
    showAllLicenses,
    showLicense,
    createLicense,
    updateLicense,
    deleteLicense
};