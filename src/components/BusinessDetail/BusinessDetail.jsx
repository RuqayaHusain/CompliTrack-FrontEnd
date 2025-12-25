import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { UserContext } from "../../contexts/UserContext";
import { showBusiness } from "../../services/businessService";
import LicenseList from "../LicenseList/LicenseList";
import ComplianceTaskList from "../ComplianceTaskList/ComplianceTaskList";
const BusinessDetail = ({ handleDeleteBusiness }) => {
    const { businessId } = useParams();
    const { user } = useContext(UserContext);

    const [business, setBusiness] = useState(null);
    const [activeTab, setActiveTab] = useState('details');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBusiness = async () => {
            const businessData = await showBusiness(businessId);
            setBusiness(businessData);
        };
        if (businessId) fetchBusiness();
    }, [businessId]);

    if (!business) return <h3>Loading ...</h3>


    const isOwner = user && business.user_id === user.id;

    return (
        <main>
            <h1>{business.name}</h1>

            <div>
                <button onClick={() => setActiveTab('details')}>Business Details</button>
                <button onClick={() => setActiveTab('licenses')}>Licenses</button>
                <button onClick={() => setActiveTab('tasks')}>Compliance Tasks</button>
            </div>

            {activeTab === 'details' && (
                <section>
                    {business.image_url && (
                        <img
                            src={business.image_url}
                            alt={business.name}
                        />
                    )}
                    <p>{business.description || 'No description provided.'}</p>
                    <p><strong>Industry:</strong> {business.industry}</p>
                    <p><strong>CR Number:</strong> {business.cr_number}</p>
                    {isOwner && (
                        <div>
                            <button onClick={() => navigate(`/businesses/edit/${businessId}`)}>Edit</button>
                            <button onClick={() => handleDeleteBusiness(businessId)}>Delete</button>
                        </div>
                    )}
                </section>
            )}

            {activeTab === 'licenses' && (
                <section>
                    <div>
                        <h3>Licenses</h3>
                        {isOwner && (
                            <button onClick={() => navigate(`/businesses/${businessId}/licenses/new`)}>
                                Add License
                            </button>
                        )}
                    </div>
                    <LicenseList businessId={businessId} />
                </section>
            )}

           {activeTab === 'tasks' && (
             <section>
                  <ComplianceTaskList />
             </section>
            )}
        </main>
    );


};

export default BusinessDetail;