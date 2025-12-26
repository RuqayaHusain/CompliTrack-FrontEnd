import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { showBusiness } from '../../services/businessService';
import { uploadImage } from '../../services/cloudinaryService';
import styles from './BusinessForm.module.css';

const BusinessForm = ({ handleAddBusiness, handleUpdateBusiness }) => {
    const { businessId } = useParams();

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        cr_number: '',
        industry: 'Retail',
        image_url: '',
    });
    const [validationMessage, setValidationMessage] = useState('');
    const [imageFile, setImageFile] = useState(null);

    const handleFileChange = (evt) => {
        setImageFile(evt.target.files[0]);
    };

    const handleChange = (evt) => {
        setFormData({
            ...formData,
            [evt.target.name]: evt.target.value,
        });
        setValidationMessage('');
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        setValidationMessage('');

        if (!formData.name.trim()) {
            return setValidationMessage('Business name is required');
        }

        if (!formData.cr_number.trim()) {
            return setValidationMessage('CR number is required');
        }

        if (!formData.industry) {
            return setValidationMessage('Industry is required');
        }

        let imageUrl = formData.image_url;

        if (imageFile) {
            imageUrl = await uploadImage(imageFile);
        }

        const updatedFormData = {
            ...formData,
            image_url: imageUrl,
        };

        if (businessId) {
            handleUpdateBusiness(businessId, updatedFormData);
        } else {
            handleAddBusiness(updatedFormData);
        }
    };


    useEffect(() => {
        const fetchBusiness = async () => {
            const businessData = await showBusiness(businessId);
            setFormData({
                name: businessData.name,
                description: businessData.description || '',
                cr_number: businessData.cr_number,
                industry: businessData.industry,
                image_url: businessData.image_url || '',
            });
        };

        if (businessId) fetchBusiness();
    }, [businessId]);

    return (
        <main className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.title}>{businessId ? 'Edit Business' : 'New Business'}</h1>

                {validationMessage && (
                    <p className={styles.validation}>{validationMessage}</p>
                )}
                <form onSubmit={handleSubmit} className={styles.form}>

                    <div className={styles.field}>
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="description">Description</label>
                        <textarea
                            name="description"
                            id="description"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="cr_number">CR Number</label>
                        <input
                            type="text"
                            name="cr_number"
                            id="cr_number"
                            value={formData.cr_number}
                            onChange={handleChange}
                            disabled={Boolean(businessId)}
                            required
                        />
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="industry">Industry</label>
                        <select
                            name="industry"
                            id="industry"
                            value={formData.industry}
                            onChange={handleChange}
                            required
                        >
                            <option value="Retail">Retail</option>
                            <option value="Food & Beverage">Food & Beverage</option>
                            <option value="Construction">Construction</option>
                            <option value="Healthcare">Healthcare</option>
                            <option value="Education">Education</option>
                            <option value="IT / Software">IT / Software</option>
                            <option value="Manufacturing">Manufacturing</option>
                            <option value="Logistics">Logistics</option>
                            <option value="Professional Services">
                                Professional Services
                            </option>
                        </select>
                    </div>

                    <div className={styles.field}>
                        <label>Business Image</label>
                        <div className={styles.imageUploadWrapper}>
                            <label htmlFor="image" className={styles.imageLabel}>
                                {imageFile || formData.image_url ? 'Change Image' : 'Upload Image'}
                            </label>
                            <input
                                type="file"
                                id="image"
                                name="image"
                                accept="image/*"
                                onChange={handleFileChange}
                                className={styles.hiddenInput}
                            />
                            {(imageFile || formData.image_url) && (
                                <img
                                    src={imageFile ? URL.createObjectURL(imageFile) : formData.image_url}
                                    alt="Preview"
                                    className={styles.imagePreview}
                                />
                            )}
                        </div>
                    </div>

                    <button type="submit">Submit</button>
                </form>
            </div>
        </main>
    );
};

export default BusinessForm;
