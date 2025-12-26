import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { UserContext } from "../../contexts/UserContext";
import { deleteLicense, showLicense } from "../../services/licenseService";

const LicenseDetail = () => {
    const { businessId, licenseId } = useParams();
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const [license, setLicense] = useState(null);

    const handleEdit = () => {
        navigate(`/businesses/${businessId}/licenses/edit/${license.id}`);
    };

    const handleDelete = async () => {
        await deleteLicense(businessId, license.id);
        navigate(`/businesses/${businessId}/licenses`);
    };

    useEffect(() => {
        const fetchLicense = async () => {
            const licenseData = await showLicense(businessId, licenseId);
            setLicense(licenseData);
        };
        if (businessId && licenseId) fetchLicense();
    }, [businessId, licenseId]);

    if (!license) return <h3>Loading ...</h3>

    const isOwner = user && license.business?.user_id === user.id;

    return (
        <main>
            <h1>{license.name}</h1>

            <p>{license.description || 'No description provided.'}</p>
            <p><strong>Status:</strong> {license.status}</p>
            <p>
                <strong>Issue Date:</strong>{" "}
                {license.issue_date
                    ? new Date(license.issue_date).toLocaleDateString()
                    : "N/A"}
            </p>
            <p>
                <strong>Expiry Date:</strong>{" "}
                {license.expiry_date
                    ? new Date(license.expiry_date).toLocaleDateString()
                    : "N/A"}
            </p>
            {isOwner && (
                <div>
                    <button onClick={handleEdit}>Edit</button>
                    <button onClick={handleDelete}>Delete</button>
                    <button onClick={() => navigate(`/businesses/${businessId}`, { state: { activeTab: 'licenses' } })}>
                        Back to Business
                    </button>
                </div>
            )}
        </main>
    );

};

export default LicenseDetail;