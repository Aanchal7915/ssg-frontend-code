/* eslint-disable react/jsx-key */
import Pagination from "@mui/material/Pagination";
import { useState, useEffect } from "react";
import MinCategory from "../../components/MinCategory";
import Product from "../../components/ProductListing/Product";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner";
import axios from "axios";
import SeoData from "../../SEO/SeoData";
import SideFilter from "../../components/ProductListing/SideFilter";
import { useAuth } from "../../context/auth";

const Products = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") || "68d32a5528bd1c6bc2577be6";

  const { auth, isAdmin } = useAuth();
  const [loading, setLoading] = useState(true);

  const [price, setPrice] = useState([0, 200000]);
  const [subcategoryList, setSubcategoryList] = useState([]);
  const [subcategory, setSubcategory] = useState("");
  const [ratings, setRatings] = useState(0);
  const [products, setProducts] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [productsCount, setProductsCount] = useState(products?.length);
  const productsPerPage = 8;
  const totalPages = Math.ceil(productsCount / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  const handlePageChange = (event, page) => setCurrentPage(page);

  // Fetch subcategories
  useEffect(() => {
    const fetchSubcategory = async () => {
      if (!category) return setSubcategoryList([]);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/v1/product/get-subcategory/${category}`
        );
        const catObj = res.data;
        if (catObj?.subCategories?.length > 0) {
          setSubcategoryList(catObj.subCategories);
          setSubcategory(catObj.subCategories[0]._id);
        } else {
          setSubcategoryList([]);
        }
      } catch {
        setSubcategoryList([]);
      }
    };
    fetchSubcategory();
  }, [category]);

  // Fetch products
  useEffect(() => {
    const fetchFilteredData = async () => {
      // if (!subcategory) return;
      try {
        setLoading(true);
        const res = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/v1/product/filtered-products`,
          {
            params: {
              category,
              subcategory,
              priceRange: [parseInt(price[0]), parseInt(price[1])],
              ratings,
            },
          }
        );
        res.status === 404 &&
          toast.error("No Products Found!", { toastId: "productNotFound" });
        res.status === 201 && setProducts(res.data.products);
        setProductsCount(res.data.products.length);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        error.response?.status === 500 &&
          toast.error("Something went wrong! Please try later.", {
            toastId: "error",
          });
      }
    };
    fetchFilteredData();
  }, [price, subcategory, ratings, category]);

  // Fetch wishlist
  useEffect(() => {
    const fetchWishlistItems = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/v1/user/wishlist`,
          { headers: { Authorization: auth?.token } }
        );
        setWishlistItems(res.data.wishlistItems);
      } catch (error) {
        error.response?.status === 500 &&
          toast.error("Error in Fetching Wishlist Items!", { toastId: "error" });
      }
    };
    auth?.token && !isAdmin && fetchWishlistItems();
  }, [auth?.token, isAdmin]);

  const [showFilter, setShowFilter] = useState(false);

  return (
    <>
      <SeoData title="All Products | SSG" />
      <MinCategory />
      <main className="w-full pt-2 pb-5 sm:mt-0 bg-gradient-to-br from-white via-white/95 to-white min-h-screen">
        <div className="flex flex-col gap-3 mt-2 sm:mt-2 sm:mx-3 m-auto">
          <h2 className="text-lg sm:text-xl font-semibold text-[#1C0311] mb-1 p-2 sm:p-3 border-l-4 border-[#54B1CE] bg-white shadow rounded-tr-lg rounded-br-lg">
            Products
          </h2>
          {/* Filter Button */}
          <div className="w-full flex justify-end mb-3 lg:hidden">
            <button
              className="bg-[#54B1CE] text-white rounded-lg shadow-lg px-5 py-2 flex items-center gap-2 hover:bg-[#3a92b0] transition-all"
              onClick={() => setShowFilter(true)}
              aria-label="Toggle Filters"
            >
              <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
                <path d="M10 18h4v-2h-4v2zm-7-8v2h18v-2H3zm3-6v2h12V4H6z" />
              </svg>
              Filters
            </button>
          </div>
          
          <div className="flex gap-3">
            {/* Sidebar for large screens */}
            <div className="hidden lg:flex">
              <SideFilter
                subcategoryList={subcategoryList}
                price={price}
                subcategory={subcategory}
                ratings={ratings}
                setPrice={setPrice}
                setSubcategory={setSubcategory}
                setRatings={setRatings}
              />
            </div>

            {/* Floating sidebar for small screens */}
            {showFilter && (
              <>
                <div
                  className="fixed inset-0 z-40 bg-black bg-opacity-30 transition-opacity duration-300"
                  onClick={() => setShowFilter(false)}
                />
                <div
                  className="fixed top-0 right-0 z-50 h-full w-11/12 max-w-xs sm:max-w-sm bg-white shadow-2xl border-l border-gray-300 transition-transform duration-300 ease-in-out translate-x-0 flex flex-col"
                  style={{ minWidth: "260px" }}
                >
                  <div className="flex items-center justify-between px-4 py-3 border-b border-gray-300">
                    <span className="text-lg font-semibold text-[#54B1CE]">Filters</span>
                    <button
                      className="text-[#54B1CE] hover:text-[#3a92b0] text-3xl"
                      onClick={() => setShowFilter(false)}
                      aria-label="Close Filters"
                    >
                      &times;
                    </button>
                  </div>
                  <div className="flex-1 overflow-y-auto">
                    <SideFilter
                      subcategoryList={subcategoryList}
                      price={price}
                      subcategory={subcategory}
                      ratings={ratings}
                      setPrice={setPrice}
                      setSubcategory={setSubcategory}
                      setRatings={setRatings}
                      floating={true}
                    />
                  </div>
                </div>
              </>
            )}

            {/* Products grid */}
            <div className="flex-1 relative p-2">
              {!loading && products?.length === 0 && (
                <div className="flex flex-col items-center justify-start gap-3 bg-white shadow rounded-xl p-6 sm:p-16 sm:min-h-[750px] md:min-h-[850px] border border-gray-300">
                  <img
                    draggable="true"
                    className="w-1/2 h-44 object-contain"
                    src="/no-product-found.png"
                    alt="Search Not Found"
                  />
                  <h1 className="text-2xl font-medium text-gray-800 text-center">
                    Sorry, no products found!
                  </h1>
                  <p className="text-base text-center text-[#54B1CE] max-w-md">
                    Please try searching for something else.
                  </p>
                </div>
              )}

              {loading ? (
                <Spinner />
              ) : (
                products?.length !== 0 && (
                  <div className="flex flex-col gap-2 pb-4 justify-center items-center w-full overflow-hidden bg-transparent">
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 w-full place-content-start overflow-hidden pb-4 min-h-[750px]">
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
                        sx={{
                          "& .MuiPaginationItem-root": {
                            color: "#54B1CE",
                          },
                        }}
                      />
                    )}
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Products;
