const Filter = ({ type, filter, handleFilterChange, handleClearFilters }) => {

    return (
        <div>
            {type === "business" && (
                <>
                    <h3>Filter Businesses</h3>
                    <div>
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={filter.name || ""}
                            onChange={handleFilterChange}
                            placeholder="Search by name..."
                        />
                    </div>

                    <div>
                        <label htmlFor="industry">Industry:</label>
                        <select
                            id="industry"
                            name="industry"
                            value={filter.industry || ""}
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
                </>
            )}

            {type === "license" && (
                <>
                    <h3>Filter Licenses</h3>

                    <div>
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={filter.name || ""}
                            onChange={handleFilterChange}
                            placeholder="Search by license name..."
                        />
                    </div>

                    <div>
                        <label htmlFor="license_status">Status:</label>
                        <select
                            id="license_status"
                            name="license_status"
                            value={filter.license_status || ""}
                            onChange={handleFilterChange}
                        >
                            <option value="">All Statuses</option>
                            <option value="Valid">Valid</option>
                            <option value="Expired">Expired</option>
                            <option value="Pending Renewal">Pending Renewal</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="expiry_before">Expiry Before:</label>
                        <input
                            type="date"
                            id="expiry_before"
                            name="expiry_before"
                            value={filter.expiry_before || ""}
                            onChange={handleFilterChange}
                        />
                    </div>

                    <div>
                        <label htmlFor="expiry_after">Expiry After:</label>
                        <input
                            type="date"
                            id="expiry_after"
                            name="expiry_after"
                            value={filter.expiry_after || ""}
                            onChange={handleFilterChange}
                        />
                    </div>
                </>
            )}

            {type === "task" && (
                <>
                    <h3>Filter Tasks</h3>

                    <div>
                        <label htmlFor="title">Title:</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={filter.title || ""}
                            onChange={handleFilterChange}
                            placeholder="Search by task title..."
                        />
                    </div>

                    <div>
                        <label htmlFor="task_status">Status:</label>
                        <select
                            id="task_status"
                            name="task_status"
                            value={filter.task_status || ""}
                            onChange={handleFilterChange}
                        >
                            <option value="">All Statuses</option>
                            <option value="Pending">Pending</option>
                            <option value="Submitted">Submitted</option>
                            <option value="Late">Late</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="due_before">Due Before:</label>
                        <input
                            type="date"
                            id="due_before"
                            name="due_before"
                            value={filter.due_before || ""}
                            onChange={handleFilterChange}
                        />
                    </div>

                    <div>
                        <label htmlFor="due_after">Due After:</label>
                        <input
                            type="date"
                            id="due_after"
                            name="due_after"
                            value={filter.due_after || ""}
                            onChange={handleFilterChange}
                        />
                    </div>
                </>
            )}

            <button onClick={handleClearFilters}>Clear Filters</button>
        </div>
    );
};

export default Filter;