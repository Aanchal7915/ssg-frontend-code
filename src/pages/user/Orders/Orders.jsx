import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import OrderItem from "./OrderItem";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import MinCategory from "../../../components/MinCategory";
import Spinner from "../../../components/Spinner";
import axios from "axios";
import { useAuth } from "../../../context/auth";
import SeoData from "../../../SEO/SeoData";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const PAGE_SIZE = 10;

const Orders = () => {
  const { auth } = useAuth();
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const [status, setStatus] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [sort, setSort] = useState("desc");
  const [showFilters, setShowFilters] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

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
          `${import.meta.env.VITE_SERVER_URL}/api/v1/user/orders?${params.toString()}`,
          { headers: { Authorization: auth?.token } }
        );

        if (response?.data?.orders) {
          setOrders(response.data.orders);
          setTotalPages(response.data.totalPages || 1);
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchOrders();
  }, [auth?.token, status, dateFrom, dateTo, sort, search, currentPage]);

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

  const handlePageChange = (page) => {
    const params = new URLSearchParams(location.search);
    params.set("page", page);
    navigate({ pathname: location.pathname, search: params.toString() });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    handleFilter();
  };

  return (
    <>
      <SeoData title="My Orders | SSG" />
      <MinCategory />
      <main className="w-full min-h-screen bg-gradient-to-br from-[#e0f7fa] via-[#f1faff] to-[#f0f9ff] px-4 sm:px-10 py-6 text-[#334155] animate-fadeIn">
        <div className="flex flex-col gap-4 w-full max-w-6xl mx-auto">
          {/* Toggle Filter Button */}
          <h2 className="text-lg sm:text-xl font-semibold text-[#1C0311] mb-1 p-2 sm:p-3 border-l-4 border-[#54B1CE] bg-white shadow rounded-tr-lg rounded-br-lg">
            Your orders
          </h2>
          <div className="flex justify-end">
            <button
              type="button"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#38bdf8] to-[#0ea5e9] text-white font-semibold shadow hover:from-[#0ea5e9] hover:to-[#38bdf8] transition-all duration-300"
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
                  <option value="Out For Delivery">Out For Delivery</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Received">Received</option>
                </select>
              </div>

              <div className="flex flex-col gap-1 w-full md:w-1/5">
                <label className="text-xs font-medium text-[#2563eb]">From</label>
                <input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-[#bae6fd] bg-[#f0f9ff] text-[#334155] focus:outline-none focus:ring-2 focus:ring-[#38bdf8] transition"
                />
              </div>

              <div className="flex flex-col gap-1 w-full md:w-1/5">
                <label className="text-xs font-medium text-[#2563eb]">To</label>
                <input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-[#bae6fd] bg-[#f0f9ff] text-[#334155] focus:outline-none focus:ring-2 focus:ring-[#38bdf8] transition"
                />
              </div>

              <div className="flex flex-col gap-1 w-full md:w-1/5">
                <label className="text-xs font-medium text-[#2563eb]">Sort By</label>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-[#bae6fd] bg-[#f0f9ff] text-[#334155] focus:outline-none focus:ring-2 focus:ring-[#38bdf8] transition"
                >
                  <option value="desc">Newest</option>
                  <option value="asc">Oldest</option>
                </select>
              </div>

              <div className="flex flex-col gap-1 w-full max-w-sm">
                <label className="text-xs font-medium text-[#2563eb]">Search</label>
                <div className="flex">
                  <input
                    type="search"
                    placeholder="Search your orders"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="p-2 text-sm outline-none flex-1 rounded-l bg-[#f0f9ff] text-[#2563eb] border border-[#bae6fd]"
                  />
                  <button
                    type="submit"
                    className="h-full text-sm px-2 py-2 text-white bg-gradient-to-r from-[#38bdf8] to-[#0ea5e9] hover:from-[#0ea5e9] hover:to-[#38bdf8] rounded-r flex items-center gap-1"
                  >
                    <SearchIcon sx={{ fontSize: "20px" }} />
                  </button>
                </div>
              </div>
            </form>
          )}

          <div className="flex flex-col gap-4 w-full">
            {/* Back Button */}
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 px-4 py-2 w-fit text-[#2563eb] hover:text-[#0ea5e9] bg-white rounded-lg border border-[#bae6fd] shadow transition-all duration-200"
            >
              <ArrowBackIcon />
              <span className="font-medium">Back</span>
            </button>

            {loading ? (
              <Spinner />
            ) : orders?.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-4 p-10 bg-gradient-to-br from-[#e0f7fa]/80 via-[#f1faff]/80 to-[#f0f9ff]/80 rounded-xl shadow-xl border border-[#bae6fd]">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2748/2748558.png"
                  alt="Empty Orders"
                  className="w-32 h-32 object-contain"
                />
                <span className="text-lg font-medium text-[#2563eb]">
                  No Orders Found
                </span>
                <p className="text-sm text-[#64748b] text-center">
                  Looks like you haven’t placed any orders yet.
                </p>
                <Link
                  to="/products"
                  className="bg-gradient-to-r from-[#38bdf8] to-[#0ea5e9] py-2 px-4 mt-2 text-white uppercase shadow hover:shadow-lg rounded-lg text-sm border-2 border-[#38bdf8] transition-all duration-300 group relative"
                >
                  <span className="absolute inset-0 rounded-lg pointer-events-none border-2 border-[#38bdf8] opacity-0 group-hover:opacity-100 group-hover:shadow-[0_0_16px_2px_#38bdf8] transition-all duration-300"></span>
                  <span className="relative z-10">Shop Products</span>
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-3 w-full">
                {orders
                  ?.map((order) => {
                    const { _id, orderStatus, buyer, createdAt, paymentId, shippingInfo, amount, products } = order;
                    return products.map((item, index) => (
                      <OrderItem
                        key={index}
                        item={item}
                        orderId={_id}
                        orderStatus={orderStatus}
                        createdAt={createdAt}
                        paymentId={paymentId}
                        buyer={buyer}
                        shippingInfo={shippingInfo}
                        amount={amount}
                      />
                    ));
                  })
                  .reverse()}
              </div>
            )}

            {/* Pagination */}
            {!loading && totalPages > 1 && (
              <div className="flex flex-col items-center mt-4">
                <span className="text-sm text-[#2563eb] mb-1">
                  Page {currentPage} of {totalPages}
                </span>
                <nav className="flex gap-2">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => handlePageChange(i + 1)}
                      className={`px-3 py-1 rounded-lg border font-semibold transition ${
                        currentPage === i + 1
                          ? "bg-gradient-to-r from-[#38bdf8] to-[#0ea5e9] text-white border-[#38bdf8]"
                          : "bg-white text-[#2563eb] border-[#bae6fd] hover:bg-[#e0f7fa]"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </nav>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default Orders;
