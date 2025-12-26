import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { showAllBusinesses } from '../../services/businessService';
import Filter from "../Filter/Filter";
import BusinessCard from "../BusinessCard/BusinessCard";
import styles from './BusinessList.module.css';

const BusinessList = () => {
    const [businesses, setBusinesses] = useState([]);
    const [filter, setFilter] = useState({
        name: '',
        industry: '',
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBusinesses = async () => {
            const businessData = await showAllBusinesses(filter);
            setBusinesses(businessData);
        };
        fetchBusinesses();
    }, [filter]);

    const handleFilterChange = (evt) => {
        const { name, value } = evt.target;
        setFilter((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleClearFilters = () => {
        setFilter({
            name: '',
            industry: '',
        });
    };

    return (
        <main className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Businesses</h1>
                <button
                    className={`${styles.button} ${styles.primary}`}
                    onClick={() => navigate('/businesses/new')}
                >
                    Add Business
                </button>
            </div>

            <div className={styles.filterWrapper}>
                <Filter
                    type='business'
                    filter={filter}
                    handleFilterChange={handleFilterChange}
                    handleClearFilters={handleClearFilters}
                />
            </div>

            <div className={styles.list}>
                {businesses.length === 0 ? (
                    <p className={styles.message}>
                        No businesses found.
                        {filter.name ||
                            filter.industry ?
                            'Try different filters.'
                            : 'Create your first business!'}
                    </p>
                ) : (
                    businesses.map((business) => (
                        <BusinessCard key={business.id} business={business} />
                    ))
                )}
            </div>

        </main>
    );
}

export default BusinessList;