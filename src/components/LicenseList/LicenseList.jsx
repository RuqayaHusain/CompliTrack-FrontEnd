import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { showAllLicenses } from "../../services/licenseService";
import Filter from "../Filter/Filter";
import LicenseCard from "../LicenseCard/LicenseCard";
import styles from "./LicenseList.module.css";

const LicenseList = () => {
    const { businessId } = useParams();
    const [licenses, setLicenses] = useState([]);
    const [filter, setFilter] = useState({
        name: '',
        license_status: '',
        expiry_before: '',
        expiry_after: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLicenses = async () => {
            const licenseData = await showAllLicenses(businessId, filter);
            setLicenses(licenseData);
        };
        if (businessId) fetchLicenses();
    }, [businessId, filter]);

    const handleFilterChange = (evt) => {
        const { name, value } = evt.target;
        setFilter((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleClearFilters = () => {
        setFilter({
            name: '',
            license_status: '',
            expiry_before: '',
            expiry_after: '',
        });
    };

    return (
        <section className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.title}>Licenses</h2>
                <button
                    className={styles.addButton}
                    onClick={() =>
                        navigate(`/businesses/${businessId}/licenses/new`)
                    }
                >
                    + Add License
                </button>
            </div>

            <Filter
                type="license"
                filter={filter}
                handleFilterChange={handleFilterChange}
                handleClearFilters={handleClearFilters}
            />

            {licenses.length === 0 ? (
                <div className={styles.empty}>
                    <p>No licenses found.</p>
                    {(filter.name ||
                        filter.license_status ||
                        filter.expiry_before ||
                        filter.expiry_after) && (
                            <small>Try adjusting your filters.</small>
                        )}
                </div>
            ) : (
                <div className={styles.grid}>
                    {licenses.map(license => (
                        <LicenseCard
                            key={license.id}
                            license={license}
                            businessId={businessId}
                        />
                    ))}
                </div>
            )}
        </section>
    );
};

export default LicenseList;