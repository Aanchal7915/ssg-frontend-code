/* eslint-disable react/jsx-key */
import Pagination from "@mui/material/Pagination";
import { useState, useEffect } from "react";
import MinCategory from "../../components/MinCategory";
import Product from "../../components/ProductListing/Product";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "./../../components/Spinner";
import axios from "axios";
import SeoData from "../../SEO/SeoData";
import SideFilter from "../../components/ProductListing/SideFilter";
import { useAuth } from "../../context/auth";

const Products = () => {
    const location = useLocation();
    const { auth, isAdmin } = useAuth();
    const [loading, setLoading] = useState(true);

    const [price, setPrice] = useState([0, 200000]);
    const [category, setCategory] = useState(
        location.search ? location.search.split("=")[1] : ""
    );
    const [ratings, setRatings] = useState(0);
    const [products, setProducts] = useState([]);
    const [wishlistItems, setWishlistItems] = useState([]);

    // pagination----->
    const [currentPage, setCurrentPage] = useState(1);
    const [productsCount, setProductsCount] = useState(products?.length);
    const productsPerPage = 8;
    // Calculate the total number of pages
    const totalPages = Math.ceil(productsCount / productsPerPage);
    // Calculate the range of products to display on the current page
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    //updating the products to display on current page
    const currentProducts = products.slice(startIndex, endIndex);

    // Handle page change
    const handlePageChange = (event, page) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        toast(
            "The backend is starting up, please wait for a minute if the loader is visible."
        );

        //fetching filtered products from sever
        const fetchFilteredData = async () => {
            try {
                setLoading(true);
                const res = await axios.get(
                    `${
                        import.meta.env.VITE_SERVER_URL
                    }/api/v1/product/filtered-products`,
                    {
                        params: {
                            category: category,
                            priceRange: [
                                parseInt(price[0].toFixed()),
                                parseInt(price[1].toFixed()),
                            ],
                            ratings: ratings,
                        },
                    }
                );
                // console.log(res.data);

                res.status === 404 &&
                    toast.error("No Products Found!", {
                        toastId: "productNotFound",
                    });

                res.status === 201 && setProducts(res.data.products);
                setLoading(false);
                setProductsCount(res.data.products.length);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);

                //server error
                error.response?.status === 500 &&
                    toast.error(
                        "Something went wrong! Please try after sometime.",
                        {
                            toastId: "error",
                        }
                    );
            }
        };
        fetchFilteredData();
    }, [price, category, ratings]);

    useEffect(() => {
        // getting user wishlist items from server
        const fetchWishlistItems = async () => {
            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_SERVER_URL}/api/v1/user/wishlist`,
                    {
                        headers: {
                            Authorization: auth?.token,
                        },
                    }
                );
                setWishlistItems(res.data.wishlistItems);
            } catch (error) {
                console.error(
                    "Error fetching data from wishlist product page:",
                    error
                );
                //server error
                error.response?.status === 500 &&
                    toast.error("Error in Fetching Wishlist Items!", {
                        toastId: "error",
                    });
            }
        };
        auth?.token && !isAdmin && fetchWishlistItems();
    }, [auth?.token, isAdmin]);

    // Mobile filter modal logic
    const [showMobileFilter, setShowMobileFilter] = useState(false);

    return (
        <>
            <SeoData title="All Products | SSG" />
            <MinCategory />
            <main className="w-full pt-2 pb-5 sm:mt-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 min-h-screen">
                <div className="flex gap-3 mt-2 sm:mt-2 sm:mx-3 m-auto">
                    {/* Sidebar filter for desktop */}
                    <SideFilter
                        price={price}
                        category={category}
                        ratings={ratings}
                        setPrice={setPrice}
                        setCategory={setCategory}
                        setRatings={setRatings}
                    />
                    {/* Mobile filter button */}
                    <button
                        className="fixed bottom-6 right-6 z-50 bg-indigo-600 text-white rounded-full shadow-lg p-4 flex items-center justify-center sm:hidden hover:bg-indigo-700 transition-all"
                        onClick={() => setShowMobileFilter(true)}
                        aria-label="Open Filters"
                    >
                        <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M10 18h4v-2h-4v2zm-7-8v2h18v-2H3zm3-6v2h12V4H6z"/>
                        </svg>
                    </button>
                    {/* Mobile filter modal */}
                    {showMobileFilter && (
                        <div className="fixed inset-0 z-50 bg-black/70 flex items-end sm:hidden">
                            <div className="w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 rounded-t-2xl p-4 shadow-2xl animate-slideUp">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-lg font-semibold text-indigo-300">Filters</span>
                                    <button
                                        className="text-indigo-400 font-bold text-xl"
                                        onClick={() => setShowMobileFilter(false)}
                                    >
                                        &times;
                                    </button>
                                </div>
                                <SideFilter
                                    price={price}
                                    category={category}
                                    ratings={ratings}
                                    setPrice={setPrice}
                                    setCategory={setCategory}
                                    setRatings={setRatings}
                                />
                                <button
                                    className="w-full mt-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold shadow hover:bg-indigo-700 transition-all"
                                    onClick={() => setShowMobileFilter(false)}
                                >
                                    Apply Filters
                                </button>
                            </div>
                            <style>
                                {`
                                    .animate-slideUp {
                                        animation: slideUp 0.5s cubic-bezier(.68,-0.55,.27,1.55) both;
                                    }
                                    @keyframes slideUp {
                                        from { opacity: 0; transform: translateY(100px);}
                                        to { opacity: 1; transform: translateY(0);}
                                    }
                                `}
                            </style>
                        </div>
                    )}
                    {/* Products grid */}
                    <div className="flex-1 relative">
                        {/* No products found */}
                        {!loading && products?.length === 0 && (
                            <div className="flex flex-col items-center justify-start gap-3 bg-gray-900 shadow-sm rounded-xl p-6 sm:p-16 sm:min-h-[750px] border border-gray-800">
                                <img
                                    draggable="true"
                                    className="w-1/2 h-44 object-contain"
                                    src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/error-no-search-results_2353c5.png"
                                    alt="Search Not Found"
                                />
                                <h1 className="text-2xl font-medium text-gray-100">
                                    Sorry, no results found!
                                </h1>
                                <p className="text-xl text-center text-indigo-300">
                                    Please check the spelling or try searching for something else.
                                </p>
                            </div>
                        )}

                        {loading ? (
                            <Spinner />
                        ) : (
                            products?.length !== 0 && (
                                <div className="flex flex-col gap-2 pb-4 justify-center items-center w-full overflow-hidden bg-transparent">
                                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full place-content-start overflow-hidden pb-4 min-h-[750px]">
                                        {currentProducts?.map((product) => (
                                            <Product
                                                key={product._id}
                                                {...product}
                                                wishlistItems={wishlistItems}
                                                setWishlistItems={setWishlistItems}
                                            />
                                        ))}
                                    </div>
                                    {productsCount > productsPerPage && (
                                        <Pagination
                                            count={totalPages}
                                            page={currentPage}
                                            onChange={handlePageChange}
                                            color="primary"
                                            sx={{
                                                "& .MuiPaginationItem-root": {
                                                    color: "#6366f1",
                                                },
                                            }}
                                        />
                                    )}
                                </div>
                            )
                        )}
                    </div>
                </div>
            </main>
        </>
    );
};

export default Products;
