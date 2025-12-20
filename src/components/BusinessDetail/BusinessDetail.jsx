import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { UserContext } from "../../contexts/UserContext";
import { showBusiness, deleteBusiness } from "../../services/businessService";
const BusinessDetail = () => {
    const { businessId } = useParams();
    const { user } = useContext(UserContext);

    const [business, setBusiness] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBusiness = async () => {
            const businessData = await showBusiness(businessId);
            setBusiness(businessData);
        };
        if (businessId) fetchBusiness();
    }, [businessId]);

    if (!business) return <h3>Loading ...</h3>

    const handleDeleteBusiness = async () => {
        await deleteBusiness(businessId);
        navigate('/businesses');
    };

    const handleUpdateBusiness = () => {
        navigate(`/businesses/edit/${businessId}`);
    };

    const isOwner = user && business.user_id === user.id;

    return (
        <main>
            <header>
                <h1>{business.name}</h1>
                {isOwner && (
                    <div>
                        <button onClick={handleUpdateBusiness}>Edit</button>
                        <button onClick={handleDeleteBusiness}>Delete</button>
                    </div>
                )}
            </header>

            {business.image_url && (
                <img
                    src={business.image_url}
                    alt={business.name}
                />
            )}

            <section>
                <p>{business.description || 'No description provided.'}</p>
                <p><strong>Industry:</strong> {business.industry}</p>
                <p><strong>CR Number:</strong> {business.cr_number}</p>
            </section>

            <section>
                <h3>Licenses</h3>
                {business.licenses?.length > 0 ? (
                    <ul>
                        {business.licenses.map((license) => (
                            <li key={license.id}>
                                {license.name} — {license.status}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No licenses added yet.</p>
                )}
            </section>

            <section>
                <h3>Compliance Tasks</h3>
                {business.compliance_tasks?.length > 0 ? (
                    <ul>
                        {business.compliance_tasks.map((task) => (
                            <li key={task.id}>
                                {task.title} — {task.status}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No compliance tasks.</p>
                )}
            </section>
        </main>
    );


};

export default BusinessDetail;