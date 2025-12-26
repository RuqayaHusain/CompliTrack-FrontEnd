import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { createLicense, showLicense, updateLicense } from "../../services/licenseService";
import styles from "./LicenseForm.module.css";

const LicenseForm = () => {
    const { businessId, licenseId } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        issue_date: '',
        expiry_date: '',
        status: 'Valid',
    });
    const [validationMessage, setValidationMessage] = useState('');

    const isEditMode = Boolean(licenseId);

    useEffect(() => {
        const fetchLicense = async () => {
            if (licenseId) {
                const licenseData = await showLicense(businessId, licenseId);
                setFormData({
                    name: licenseData.name,
                    description: licenseData.description || '',
                    issue_date: licenseData.issue_date ? licenseData.issue_date.split('T')[0] : '',
                    expiry_date: licenseData.expiry_date ? licenseData.expiry_date.split('T')[0] : '',
                    status: licenseData.status,
                });
            }
        };
        fetchLicense();
    }, [businessId, licenseId]);

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

        if (isEditMode) {
            await updateLicense(businessId, licenseId, formData);
            navigate(`/businesses/${businessId}/licenses/${licenseId}`);
        } else {
            await createLicense(businessId, formData);
            navigate(`/businesses/${businessId}`, { state: { activeTab: 'licenses' } });
        }
    };

    const handleCancelButton = () => {
        if (isEditMode) {
            navigate(`/businesses/${businessId}/licenses/${licenseId}`);
        } else {
            navigate(`/businesses/${businessId}`, { state: { activeTab: 'licenses' } });
        }
    };

    return (
        <main className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.title}>{isEditMode ? 'Edit License' : 'Add License'}</h1>
                {validationMessage && <p className={styles.validation}>{validationMessage}</p>}

                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.field}>
                        <label htmlFor="name">Name</label>
                        <input id="name" name="name" value={formData.name} onChange={handleChange} required />
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="description">Description</label>
                        <textarea id="description" name="description" value={formData.description} onChange={handleChange} />
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="issue_date">Issue Date</label>
                        <input type="date" id="issue_date" name="issue_date" value={formData.issue_date} onChange={handleChange} required />
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="expiry_date">Expiry Date</label>
                        <input type="date" id="expiry_date" name="expiry_date" value={formData.expiry_date} onChange={handleChange} required />
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="status">Status</label>
                        <select id="status" name="status" value={formData.status} onChange={handleChange} required>
                            <option value="Valid">Valid</option>
                            <option value="Expired">Expired</option>
                            <option value="Pending Renewal">Pending Renewal</option>
                        </select>
                    </div>

                    <div className={styles.buttonGroup}>
                        <button type="submit" className={styles.submitButton}>Submit</button>
                        <button
                            type="button"
                            className={styles.cancelButton}
                            onClick={handleCancelButton}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
};



export default LicenseForm;