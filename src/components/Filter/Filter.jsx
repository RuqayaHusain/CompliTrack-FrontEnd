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

            <button onClick={handleClearFilters}>Clear Filters</button>
        </div>
    );
};

export default Filter;