import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { createLicense } from "../../services/licenseService";

const LicenseForm = () => {
    const { businessId } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        issue_date: '',
        expiry_date: '',
        status: 'Valid',
    });
    const [validationMessage, setValidationMessage] = useState('');

    const handleChange = (evt) => {
        setFormData({
            ...formData,
            [evt.target.name]: evt.target.value
        });
        setValidationMessage('');
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        if (!formData.name.trim()) return setValidationMessage('License name is required');
        if (!formData.status) return setValidationMessage('License status is required');
        if (!formData.issue_date) return setValidationMessage('License issue date is required');
        if (!formData.expiry_date) return setValidationMessage('License expiry date is required');
        const issueDate = new Date(formData.issue_date);
        const expiryDate = new Date(formData.expiry_date);

        if (expiryDate <= issueDate) return setValidationMessage('Expiry date must be after issue date');
                
        handleAddLicense(businessId, formData);
    };

    const handleAddLicense = async (businessId, licenseFormData) => {
        await createLicense(businessId, licenseFormData);
        navigate(`/businesses/${businessId}`);
    };

    return (
        <main>
            <h1>Add License</h1>
            {validationMessage && <p>{validationMessage}</p>}
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="description">Description:</label>
                <textarea
                    name="description"
                    id="description"
                    value={formData.description}
                    onChange={handleChange}
                />

                <label htmlFor="issue_date">Issue Date:</label>
                <input
                    type="date"
                    name="issue_date"
                    id="issue_date"
                    value={formData.issue_date}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="expiry_date">Expiry Date:</label>
                <input
                    type="date"
                    name="expiry_date"
                    id="expiry_date"
                    value={formData.expiry_date}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="status">Status:</label>
                <select
                    name="status"
                    id="status"
                    value={formData.status}
                    onChange={handleChange}
                    required
                >
                    <option value="Valid">Valid</option>
                    <option value="Expired">Expired</option>
                    <option value="Pending Renewal">Pending Renewal</option>

                </select>

                <button type="submit">Submit</button>
            </form>
        </main>
    );
};



export default LicenseForm;