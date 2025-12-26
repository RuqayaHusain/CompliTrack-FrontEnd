import { Link } from "react-router";

const LicenseCard = ({ license, businessId }) => {
    return (
        <Link key={license.id} to={`/businesses/${businessId}/licenses/${license.id}`}>
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
                </div>
            </article>
        </Link>
    );
};

export default LicenseCard;