import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { showAllBusinesses } from '../../services/businessService';
import Filter from "../Filter/Filter";
import BusinessCard from "../BusinessCard/BusinessCard";

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
        <main>
            <div>
                <h1>Businesses</h1>
                <button onClick={() => navigate('/businesses/new')}>Add Business</button>
            </div>

            <div>
                <Filter
                    type='business'
                    filter={filter}
                    handleFilterChange={handleFilterChange}
                    handleClearFilters={handleClearFilters}
                />
            </div>

            {businesses.length === 0 ? (
                <div>
                    <p>No businesses found. {filter.name || filter.industry ? 'Try different filters.' : 'Create your first business!'}</p>
                </div>
            ) : (
                <div>
                    {businesses.map((business) => (
                        <BusinessCard
                            key={business.id}
                            business={business}
                        />
                    ))}
                </div>
            )}
        </main>
    );
}

export default BusinessList;