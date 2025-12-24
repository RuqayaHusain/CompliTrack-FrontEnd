import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { showAllLicenses } from "../../services/licenseService";
import Filter from "../Filter/Filter";
import LicenseCard from "../LicenseCard/LicenseCard";

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
        <main>
            <div>
                <h2>Licenses</h2>
                <button
                    onClick={() =>
                        navigate(`/businesses/${businessId}/licenses/new`)
                    }
                >
                    Add License
                </button>
            </div>

            <div>
                <Filter
                    type='license'
                    filter={filter}
                    handleFilterChange={handleFilterChange}
                    handleClearFilters={handleClearFilters}
                />
            </div>

            {licenses.length === 0 ? (
                <div>
                    <p>
                        No licenses found.
                        {filter.name ||
                            filter.license_status ||
                            filter.expiry_before ||
                            filter.expiry_after
                            ? " Try different filters."
                            : " Add your first license!"}
                    </p>
                    <button
                        onClick={() =>
                            navigate(`/businesses/${businessId}/licenses/new`)
                        }
                    >
                        Add License
                    </button>
                </div>
            ) : (
                <div>
                    {licenses.map((license) => (
                        <LicenseCard
                            key={license.id}
                            license={license}
                        />
                    ))}
                </div>
            )}
        </main>
    );
};

export default LicenseList;