import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { showAllBusinesses } from '../../services/businessService';
import Filter from "../Filter/Filter";

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
                    <button onClick={() => navigate('/businesses/new')}>
                        Add Business
                    </button>
                </div>
            ) : (
                <div>
                    {businesses.map((business) => (
                        <Link key={business.id} to={`/businesses/${business.id}`}>
                            <article>
                                <header>
                                    <div>
                                        <h2>{business.name}</h2>
                                        <span>{business.industry}</span>
                                    </div>
                                    {business.image_url && (
                                        <div>
                                            <img src={business.image_url} alt={business.name} />
                                        </div>
                                    )}
                                </header>
                                <footer>
                                    <span>
                                        {business.licenses?.length || 0} licenses
                                    </span>
                                    <p>View Details</p>
                                </footer>
                            </article>
                        </Link>
                    ))}
                </div>
            )}
        </main>
    );
}

export default BusinessList;