import { useState, useEffect } from "react";
import Product from "./Product";
import MinCategory from "../../../components/MinCategory";
import axios from "axios";
import { useAuth } from "../../../context/auth";
import Spinner from "../../../components/Spinner";
import { toast } from "react-toastify";
import SeoData from "../../../SEO/SeoData";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const Wishlist = () => {
  const { auth, isAdmin } = useAuth();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWishlist = async (page) => {
      try {
        setIsLoading(true);
        const res = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/v1/user/wishlist-products?page=${page}&pageSize=${pageSize}`,
          { headers: { Authorization: auth.token } }
        );
        setWishlistItems((prev) => [...prev, ...res.data.wishlistItems]);
        setCount(res.data.totalItems);
        setIsLoading(false);
        setIsLoadMore(false);
      } catch (error) {
        console.error("Error fetching wishlist items:", error);
        setIsLoading(false);
      }
    };
    auth.token && !isAdmin && fetchWishlist(page);
  }, [page, auth.token, isAdmin]);

  const handleLoadMore = () => {
    setIsLoadMore(true);
    setPage((prev) => {
      const nextPage = prev + 1;
      if (nextPage <= Math.ceil(count / pageSize)) return nextPage;
      return prev;
    });
  };

  const updateWishlist = async (productId) => {
    try {
      setIsLoading(true);
      await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/user/update-wishlist`,
        { productId, type: "remove" },
        { headers: { Authorization: auth.token } }
      );
      toast.success("Product Removed From Wishlist");
      setWishlistItems((prev) => prev.filter((item) => item._id !== productId));
      setCount((prev) => prev - 1);
      setIsLoading(false);
    } catch (error) {
      console.error("Error updating wishlist:", error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <SeoData title="My Wishlist" />
      <MinCategory />

      {isLoading && page === 1 ? (
        <Spinner />
      ) : (
        <main className="w-full pt-5 bg-gradient-to-br from-[#e0f7fa] via-[#f1faff] to-[#f0f9ff] min-h-screen text-[#334155] animate-fadeIn">
          <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-11/12 m-auto pb-10">
            <div className="flex-1 bg-white/80 shadow-xl rounded-xl border border-[#bae6fd] overflow-hidden">
              {/* Back Button */}
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 px-4 py-2 m-4 text-[#2563eb] bg-white rounded-lg border border-[#bae6fd] shadow hover:scale-[1.03] transition-transform"
              >
                <ArrowBackIcon />
                <span className="font-medium">Back</span>
              </button>

              {/* Wishlist Header */}
              <div className="px-4 sm:px-8 py-4 border-b border-[#bae6fd] text-[#2563eb] font-medium text-lg">
                My Wishlist ({count})
              </div>

              {/* Empty State */}
              {wishlistItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-4 my-8 pb-10">
                  <img
                    draggable="false"
                    src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
                    alt="Empty Wishlist"
                    className="w-52 h-44 object-contain"
                  />
                  <span className="text-lg font-semibold text-[#2563eb]">
                    Empty Wishlist
                  </span>
                  <p className="text-sm text-[#64748b] text-center">
                    You have no items in your wishlist. Start adding your favorite products!
                  </p>
                </div>
              ) : (
                <div className="flex flex-col divide-y divide-[#bae6fd]">
                  {wishlistItems.map((item, idx) => (
                    <Product key={idx} {...item} func={updateWishlist} />
                  ))}
                </div>
              )}

              {/* Load More Button */}
              {count > wishlistItems.length && (
                <div className="flex justify-center py-6">
                  <button
                    onClick={handleLoadMore}
                    disabled={isLoadMore}
                    className="relative group bg-gradient-to-r from-[#38bdf8] to-[#0ea5e9] text-white font-medium px-6 py-2 rounded-lg shadow hover:shadow-lg transition-all duration-300 overflow-hidden"
                  >
                    <span className="absolute inset-0 bg-[#0ea5e9] opacity-0 group-hover:opacity-20 rounded transition-all duration-300"></span>
                    <span className="relative z-10">
                      {isLoadMore ? "Loading..." : "Load More Items"}
                    </span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export default Wishlist;
