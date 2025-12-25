import { Link, useNavigate } from "react-router";
import { deleteLicense } from "../../services/licenseService";

const LicenseCard = ({ license ,businessId, onDelete }) => {
    const navigate = useNavigate();

    const handleEdit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        navigate(`/businesses/${businessId}/licenses/edit/${license.id}`);
    };

    const handleDelete = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        await deleteLicense(businessId, license.id);
        if (onDelete) onDelete(license.id);
    };

    return (
        <Link key={license.id} to={`licenses/${license.id}`}>
            <article>
                <div>
                    <h2>{license.name}</h2>
                    <span>Status: {license.status}</span>
                    <p>
                        Expiry:{" "}
                        {license.expiry_date
                            ? new Date(license.expiry_date).toLocaleDateString()
                            : "N/A"}
                    </p>
                </div>
                <div>
                    <p>View Details</p>
                     <button onClick={handleEdit}>Edit</button>
                    <button onClick={handleDelete}>Delete</button>
                </div>
            </article>
        </Link>
    );
};

export default LicenseCard;