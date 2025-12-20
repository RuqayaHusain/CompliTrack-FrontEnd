import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { showAllBusinesses } from '../../services/businessService';

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
                <button onClick={() => navigate('/api/businesses/new')}>Add Business</button>
            </div>

            <div>
                <h3>Filter Businesses</h3>
                <div>
                    <div>
                        <label htmlFor="name">Business Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={filter.name}
                            onChange={handleFilterChange}
                            placeholder="Search by name..."
                        />
                    </div>

                    <div>
                        <label htmlFor="industry">Industry:</label>
                        <select
                            id="industry"
                            name="industry"
                            value={filter.industry}
                            onChange={handleFilterChange}
                        >
                            <option value="">All Industries</option>
                            <option value="Retail">Retail</option>
                            <option value="Food & Beverage">Food & Beverage</option>
                            <option value="Construction">Construction</option>
                            <option value="Healthcare">Healthcare</option>
                            <option value="Education">Education</option>
                            <option value="IT / Software">IT / Software</option>
                            <option value="Manufacturing">Manufacturing</option>
                            <option value="Logistics">Logistics</option>
                            <option value="Professional Services">Professional Services</option>
                        </select>
                    </div>

                    <button onClick={handleClearFilters}>
                        Clear Filters
                    </button>
                </div>
            </div>

            {businesses.length === 0 ? (
                <div>
                    <p>No businesses found. {filter.name || filter.industry ? 'Try different filters.' : 'Create your first business!'}</p>
                    <button onClick={() => navigate('/api/businesses/new')}>
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
                                <div>
                                    <p>{business.description || 'No description available.'}</p>
                                    <div>
                                        <p><strong>CR Number:</strong> {business.cr_number}</p>
                                        <p><strong>Created:</strong> {new Date(business.created_at).toLocaleDateString()}</p>
                                    </div>
                                </div>
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