import { Link } from "react-router";

const BusinessCard = ({ business }) => {
    
    return (
        <Link key={business.id} to={`/businesses/${business.id}`}>
            <article>
                <header>
                    <div>
                        <h2>{business.name}</h2>
                        <span>{business.industry}</span>
                    </div>
                </header>
                <footer>
                    <p>
                        {business.licenses?.length || 0} licenses
                    </p>
                    <p>
                        {business.compliance_tasks?.length || 0} tasks
                    </p>
                    <p>View Details</p>
                </footer>
            </article>
        </Link>
    );
};

export default BusinessCard;