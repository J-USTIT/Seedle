import { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance.js";
import CollectionPlantCard from "../components/CollectionPlantCard.jsx";
import CollectionModal from "../components/CollectionModal.jsx";
import LinkButton from "../components/LinkButton.jsx";
import "../styles/collection.css";

function PlantCollection() {
    const [allPlants, setAllPlants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [page, setPage] = useState(1);
    const [itemsPerPage] = useState(12);
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [filter, setFilter] = useState("all");
    const [sortBy, setSortBy] = useState("commonName");
    const [order, setOrder] = useState("asc");
    const [groupBy, setGroupBy] = useState("none");
    const [selectedItem, setSelectedItem] = useState(null);

    const fetchAllPlants = async () => {
        try {
            setLoading(true);
            setError("");
            const response = await axiosInstance.get(`/user/collection?collected=${filter}&sortBy=${sortBy}&order=${order}&search=${encodeURIComponent(debouncedSearch)}`);
            setAllPlants(response.data?.data || []);
            setPage(1);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to load collection.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 300);

        return () => clearTimeout(timer);
    }, [search]);

    useEffect(() => {
        fetchAllPlants();
    }, [filter, sortBy, order, debouncedSearch]);

    const openPlant = async (plant) => {
        if (!plant.collected) return;
        try {
            const response = await axiosInstance.get(`/user/collection/${plant._id}`);
            setSelectedItem(response.data);
        } catch (err) {
            console.error(err);
        }
    };

    const paginatedPlants = allPlants.slice((page - 1) * itemsPerPage, page * itemsPerPage);
    const totalPages = Math.ceil(allPlants.length / itemsPerPage);

    const groups = groupBy === "none"
        ? [{ title: "All plants", items: paginatedPlants }]
        : Object.entries(paginatedPlants.reduce((acc, plant) => {
            const key = groupBy === "family"
                ? (plant.family?.common_name || plant.family || "Unknown family")
                : (plant.collected ? "Collected" : "Uncollected");
            if (!acc[key]) acc[key] = [];
            acc[key].push(plant);
            return acc;
        }, {}))
            .sort((a, b) => a[0].localeCompare(b[0]))
            .map(([title, items]) => ({ title, items }));

    const renderPageButtons = () => {
        const buttons = [];
        for (let i = 1; i <= totalPages; i += 1) {
            buttons.push(
                <button
                    key={i}
                    type="button"
                    className={i === page ? "active" : ""}
                    disabled={i === page}
                    onClick={() => setPage(i)}
                >
                    {i}
                </button>
            );
        }
        return buttons;
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-8 animate-fade-in-up">
            <div className="flex flex-col gap-4 mb-6">
                <div className="flex flex-col gap-2">
                    <h1 className="text-4xl font-semibold text-emerald-900">My Collection 🪴</h1>
                    <p className="text-slate-600">View all backend plants with collected ones in color and uncollected ones greyed out. 🌿</p>
                </div>
                <LinkButton to="/home" className="flex items-center gap-2 justify-center max-w-fit">🏠 Back to Home</LinkButton>
            </div>

            <div className="collection-summary">
                <p>
                    Showing <strong>{paginatedPlants.length}</strong> of <strong>{allPlants.length}</strong> plants
                    {debouncedSearch ? ` for "${debouncedSearch}"` : ''}
                </p>

            </div>

            <div className="flex flex-col md:flex-row gap-4 mb-8 bg-white/50 p-4 rounded-2xl border border-emerald-100 shadow-sm w-full">
                <input
                    type="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search plants..."
                    aria-label="Search plant collection"
                    className="flex-[2] px-5 py-3 rounded-xl border border-emerald-200 bg-white/90 text-emerald-900 placeholder-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />

                <div className="flex flex-wrap md:flex-nowrap gap-4 flex-[3]">
                    <select value={filter} onChange={(e) => { setFilter(e.target.value); setPage(1); }} className="flex-1 px-4 py-3 rounded-xl border border-emerald-200 bg-white/90 text-emerald-900 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-400 cursor-pointer shadow-sm hover:bg-emerald-50 transition-colors">
                        <option value="all">All plants</option>
                        <option value="collected">Collected only</option>
                        <option value="uncollected">Uncollected only</option>
                    </select>
                    <select value={sortBy} onChange={(e) => { setSortBy(e.target.value); setPage(1); }} className="flex-1 px-4 py-3 rounded-xl border border-emerald-200 bg-white/90 text-emerald-900 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-400 cursor-pointer shadow-sm hover:bg-emerald-50 transition-colors">
                        <option value="commonName">Name A-Z</option>
                        <option value="scientificName">Scientific A-Z</option>
                        <option value="answeredAt">Collected date</option>
                        <option value="guessesUsed">Attempts</option>
                    </select>
                    <select value={order} onChange={(e) => { setOrder(e.target.value); setPage(1); }} className="w-32 px-4 py-3 rounded-xl border border-emerald-200 bg-white/90 text-emerald-900 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-400 cursor-pointer shadow-sm hover:bg-emerald-50 transition-colors">
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                    <select value={groupBy} onChange={(e) => setGroupBy(e.target.value)} className="flex-1 px-4 py-3 rounded-xl border border-emerald-200 bg-white/90 text-emerald-900 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-400 cursor-pointer shadow-sm hover:bg-emerald-50 transition-colors">
                        <option value="none">No grouping</option>
                        <option value="collected">Group by collected</option>
                        <option value="family">Group by family</option>
                    </select>
                </div>
            </div>

            {loading ? (
                <div className="collection-skeleton-grid">
                    {Array.from({ length: 8 }).map((_, index) => (
                        <article key={index} className="collection-card skeleton">
                            <div className="collection-card__image-wrapper skeleton-box" />
                            <div className="collection-card__body">
                                <div className="skeleton-line skeleton-title" />
                                <div className="skeleton-line" />
                                <div className="skeleton-line short" />
                            </div>
                        </article>
                    ))}
                </div>
            ) : error ? (
                <div className="text-red-600">{error}</div>
            ) : allPlants.length === 0 ? (
                <div className="collection-empty">
                    <h3>No plants found</h3>
                    <p>{debouncedSearch ? `No results found for "${debouncedSearch}". Try a different search term or reset the filters.` : 'Try a different filter or search term to find your plants.'}</p>
                </div>
            ) : (
                <>
                    {groups.map((group) => (
                        <div key={group.title}>
                            {groupBy !== "none" && (
                                <h2 className="collection-group-title">{group.title} ({group.items.length})</h2>
                            )}
                            <div className="collection-grid">
                                {group.items.map((plant) => (
                                    <CollectionPlantCard
                                        key={plant._id}
                                        plant={plant}
                                        collected={plant.collected}
                                        onClick={() => openPlant(plant)}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                    {totalPages > 1 && (
                        <div className="collection-pagination">
                            <button type="button" disabled={page <= 1} onClick={() => setPage(page - 1)}>Prev</button>
                            {renderPageButtons()}
                            <button type="button" disabled={page >= totalPages} onClick={() => setPage(page + 1)}>Next</button>
                        </div>
                    )}
                </>
            )}

            {selectedItem && (
                <CollectionModal item={selectedItem} onClose={() => setSelectedItem(null)} />
            )}
        </div>
    );
}

export default PlantCollection;
