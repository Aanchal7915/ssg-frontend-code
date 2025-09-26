import { useEffect, useState } from "react";
import OrderItem from "./OrderItem";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import Spinner from "../../components/Spinner";
import axios from "axios";
import { useAuth } from "../../context/auth";
import SeoData from "../../SEO/SeoData";
import { useNavigate, useLocation } from "react-router-dom";

const PAGE_SIZE = 10;

const AdminOrders = () => {
    const { auth } = useAuth();
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [orders, setOrders] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    // Filter states
    const [status, setStatus] = useState("");
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");
    const [sort, setSort] = useState("desc");
    const [showFilters, setShowFilters] = useState(true); // NEW

    const navigate = useNavigate();
    const location = useLocation();

    // Sync filters with query params
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        setStatus(params.get("status") || "");
        setDateFrom(params.get("dateFrom") || "");
        setDateTo(params.get("dateTo") || "");
        setSort(params.get("sort") || "desc");
        setCurrentPage(Number(params.get("page")) || 1);
        setSearch(params.get("search") || "");
    }, [location.search]);

    useEffect(() => {
        // fetch orders from server
        const fetchOrders = async () => {
            try {
                setLoading(true);
                const params = new URLSearchParams();
                if (status) params.set("status", status);
                if (dateFrom) params.set("dateFrom", dateFrom);
                if (dateTo) params.set("dateTo", dateTo);
                if (sort) params.set("sort", sort);
                if (search) params.set("search", search);
                params.set("page", currentPage);
                params.set("limit", PAGE_SIZE);

                const response = await axios.get(
                    `${import.meta.env.VITE_SERVER_URL}/api/v1/user/admin-orders?${params.toString()}`,
                    {
                        headers: {
                            Authorization: auth?.token,
                        },
                    }
                );
                if (response?.data?.orders) {
                    setOrders(response.data.orders);
                    setTotalPages(response.data.pages || 1);
                    setLoading(false);
                }
            } catch (error) {
                setLoading(false);
            }
        };
        fetchOrders();
    }, [auth?.token, status, dateFrom, dateTo, sort, search, currentPage]);

    // Handle filter submit
    const handleFilter = (e) => {
        e && e.preventDefault();
        const params = new URLSearchParams();
        if (status) params.set("status", status);
        if (dateFrom) params.set("dateFrom", dateFrom);
        if (dateTo) params.set("dateTo", dateTo);
        if (sort) params.set("sort", sort);
        if (search) params.set("search", search);
        params.set("page", 1);
        navigate({ pathname: location.pathname, search: params.toString() });
    };

    // Handle pagination
    const handlePageChange = (page) => {
        const params = new URLSearchParams(location.search);
        params.set("page", page);
        navigate({ pathname: location.pathname, search: params.toString() });
    };

    // Handle search submit
    const handleSearch = (e) => {
        e.preventDefault();
        handleFilter();
    };

    // Add clear filter handler
    const handleClearFilters = () => {
        setStatus("");
        setDateFrom("");
        setDateTo("");
        setSort("desc");
        setSearch("");
        navigate({ pathname: location.pathname, search: "" });
    };

    return (
        <>
            <SeoData title="Admin Orders | Flipkart" />

            <main className="w-full min-h-screen bg-gradient-to-br from-[#e0f7fa] via-[#f1faff] to-[#f0f9ff] px-2 sm:px-6 py-4 text-[#334155]">
                <h2 className="max-w-6xl mx-auto text-lg sm:text-xl font-semibold text-[#1C0311] mb-1 p-2 sm:p-3 border-l-4 border-[#54B1CE] bg-white shadow rounded-tr-lg rounded-br-lg">
                    All Orders
                </h2>
                <div className="flex flex-col gap-4 w-full max-w-6xl mx-auto">
                    {/* Toggle Filter Button */}
                    <div className="flex justify-end mb-2">
                        <button
                            type="button"
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#38bdf8] to-[#0ea5e9] text-white font-semibold shadow hover:from-[#0ea5e9] hover:to-[#38bdf8] transition"
                            onClick={() => setShowFilters((prev) => !prev)}
                        >
                            <FilterListIcon />
                            {showFilters ? "Hide Filters" : "Show Filters"}
                        </button>
                    </div>
                    {/* Filter Panel */}
                    {showFilters && (
                        <form
                            onSubmit={handleFilter}
                            className="flex flex-wrap flex-col md:flex-row md:items-end gap-3 md:gap-6 bg-white/80 border border-[#bae6fd] rounded-xl shadow px-4 py-4 mb-2"
                        >
                            <div className="flex flex-col gap-1 w-full md:w-1/5">
                                <label className="text-xs font-medium text-[#2563eb]">
                                    Order Status
                                </label>
                                <select
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    className="px-3 py-2 rounded-lg border border-[#bae6fd] bg-[#f0f9ff] text-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#38bdf8] transition"
                                >
                                    <option value="">All</option>
                                    <option value="Shipped">Shipped</option>
                                    <option value="Out For Delivery">
                                        Out For Delivery
                                    </option>
                                    <option value="Delivered">Delivered</option>
                                    <option value="Received">Received</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-1 w-full md:w-1/5">
                                <label className="text-xs font-medium text-[#2563eb]">
                                    From
                                </label>
                                <input
                                    type="date"
                                    value={dateFrom}
                                    onChange={(e) => setDateFrom(e.target.value)}
                                    className="px-3 py-2 rounded-lg border border-[#bae6fd] bg-[#f0f9ff] text-[#334155] focus:outline-none focus:ring-2 focus:ring-[#38bdf8] transition"
                                />
                            </div>
                            <div className="flex flex-col gap-1 w-full md:w-1/5">
                                <label className="text-xs font-medium text-[#2563eb]">
                                    To
                                </label>
                                <input
                                    type="date"
                                    value={dateTo}
                                    onChange={(e) => setDateTo(e.target.value)}
                                    className="px-3 py-2 rounded-lg border border-[#bae6fd] bg-[#f0f9ff] text-[#334155] focus:outline-none focus:ring-2 focus:ring-[#38bdf8] transition"
                                />
                            </div>
                            <div className="flex flex-col gap-1 w-full md:w-1/5">
                                <label className="text-xs font-medium text-[#2563eb]">
                                    Sort By
                                </label>
                                <select
                                    value={sort}
                                    onChange={(e) => setSort(e.target.value)}
                                    className="px-3 py-2 rounded-lg border border-[#bae6fd] bg-[#f0f9ff] text-[#334155] focus:outline-none focus:ring-2 focus:ring-[#38bdf8] transition"
                                >
                                    <option value="desc">Newest</option>
                                    <option value="asc">Oldest</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-1 w-full max-w-md">
                                <label className="text-xs font-medium text-[#2563eb]">
                                    Search
                                </label>
                                <div className="flex">
                                    <input
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        type="search"
                                        name="search"
                                        placeholder="Order, buyer, product..."
                                        className="p-2 text-sm outline-none flex-1 rounded-l bg-[#f0f9ff] text-[#334155] border border-[#bae6fd]"
                                    />
                                    <button
                                        type="submit"
                                        className="h-full text-sm px-2 py-2 text-white bg-gradient-to-r from-[#38bdf8] to-[#0ea5e9] hover:from-[#0ea5e9] hover:to-[#38bdf8] rounded-r flex items-center gap-1"
                                    >
                                        <SearchIcon sx={{ fontSize: "20px" }} />
                                    </button>
                                </div>
                            </div>
                            {/* Clear Filter Button */}
                            <div className="flex flex-col gap-1 w-full md:w-auto md:ml-2">
                                <label className="text-xs font-medium text-transparent">
                                    Clear
                                </label>
                                <button
                                    type="button"
                                    onClick={handleClearFilters}
                                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#bae6fd] to-[#38bdf8] text-[#2563eb] font-semibold shadow hover:from-[#38bdf8] hover:to-[#bae6fd] border border-[#38bdf8] transition"
                                >
                                    Clear Filters
                                </button>
                            </div>
                        </form>
                    )}

                    <div className="flex gap-3.5 w-full">
                        {loading ? (
                            <Spinner />
                        ) : (
                            <div className="flex flex-col gap-3 w-full pb-5 overflow-hidden">
                                {orders?.length === 0 && (
                                    <div className="flex items-center flex-col gap-2 p-10 bg-gradient-to-br from-[#e0f7fa]/80 via-[#f1faff]/80 to-[#f0f9ff]/80 rounded-xl shadow-xl border border-[#bae6fd]">
                                        <img
                                            draggable="false"
                                            src="https://cdn-icons-png.flaticon.com/512/2748/2748558.png"
                                            alt="Empty Orders"
                                            className="w-32 h-32 object-contain mb-2"
                                        />
                                        <span className="text-lg font-medium text-[#2563eb]">
                                            Sorry, no orders found
                                        </span>
                                        <p className="text-sm text-[#64748b]">
                                            Get some orders first
                                        </p>
                                    </div>
                                )}

                                {orders
                                    ?.map((order) => {
                                        const {
                                            _id,
                                            orderStatus,
                                            buyer,
                                            createdAt,
                                            paymentId,
                                            shippingInfo,
                                            amount,
                                            products,
                                        } = order;
                                        return products.map((item, index) => (
                                            <OrderItem
                                                item={item}
                                                key={index}
                                                orderId={_id}
                                                orderStatus={orderStatus}
                                                createdAt={createdAt}
                                                paymentId={paymentId}
                                                buyer={buyer}
                                                shippingInfo={shippingInfo}
                                                amount={amount}
                                            />
                                        ));
                                    })}
                            </div>
                        )}
                    </div>

                    {/* Pagination */}
                    {!loading && totalPages > 1 && (
                        <div className="flex flex-col items-center mb-2">
                            <span className="text-sm text-[#2563eb] mb-1">
                                Page {currentPage} of {totalPages}
                            </span>
                            <nav className="flex gap-2">
                                {Array.from({ length: totalPages }, (_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handlePageChange(i + 1)}
                                        className={`px-3 py-1 rounded-lg border ${currentPage === i + 1
                                            ? "bg-gradient-to-r from-[#38bdf8] to-[#0ea5e9] text-white border-[#38bdf8]"
                                            : "bg-white text-[#2563eb] border-[#bae6fd] hover:bg-[#e0f7fa]"
                                            } font-semibold transition`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                            </nav>
                        </div>
                    )}
                </div>
            </main>
        </>
    );
};

export default AdminOrders;
