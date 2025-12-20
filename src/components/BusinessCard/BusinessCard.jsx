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
    );
};

export default BusinessCard;