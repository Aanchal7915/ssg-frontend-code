
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";
import Slider from "react-slick";
import { NextBtn, PreviousBtn } from "../../pages/Home/Banner/Banner.jsx";
import ProductSlider from "../../pages/Home/ProductsListing/ProductSlider.jsx";
import Spinner from "../../components/Spinner";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import StarIcon from "@mui/icons-material/Star";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import CachedIcon from "@mui/icons-material/Cached";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Rating from "@mui/material/Rating";
import TextField from "@mui/material/TextField";
import { getDeliveryDate, getDiscount } from "../../utils/functions";
import MinCategory from "../../components/MinCategory";
import axios from "axios";
import { useAuth } from "../../context/auth";
import { fashionProducts } from "../../utils/fashion";
import { electronicProducts } from "../../utils/electronics";
import ScrollToTopOnRouteChange from "../../utils/ScrollToTopOnRouteChange";
import { useCart } from "../../context/cart.jsx";
import SeoData from "../../SEO/SeoData";
import "react-toastify/dist/ReactToastify.css";

const ProductDetails = () => {
    const navigate = useNavigate();
    const { auth, setAuth, LogOut, isAdmin, isContextLoading } = useAuth();
    const [cartItems, setCartItems, addItems] = useCart();
    const [open, setOpen] = useState(false);
    const [viewAll, setViewAll] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [wishlistItems, setWishlistItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState({});

    const settings = {
        autoplay: true,
        autoplaySpeed: 3000,
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: <PreviousBtn />,
        nextArrow: <NextBtn />,
    };

    const { productId } = useParams();

    const reviewSubmitHandler = async () => {
        if (rating === 0 || !comment.trim()) {
            toast.error("Empty Review", { toastClassName: "custom-toast" });
            return;
        }

        const formData = new FormData();
        formData.set("rating", rating);
        formData.set("comment", comment);
        formData.set("productId", productId);

        try {
            const { data } = await axios.post(
                `${import.meta.env.VITE_SERVER_URL}/api/v1/user/rating-review`, 
                formData,
                { headers: { Authorization: auth.token } }
            );

            if (data.success) {
                toast.success("Review submitted!", { toastClassName: "custom-toast" });
            } else {
                toast.error(data.message || "Failed to submit review", { toastClassName: "custom-toast" });
            }
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Error submitting review",
                { toastClassName: "custom-toast" }
            );
        }

        setOpen(false);
    };

    const addToCartHandler = () => {
        const item = {
            productId: product._id,
            name: product.name,
            stock: product.stock,
            image: product.images[0].url,
            brandName: product.brand.name,
            price: product.price,
            discountPrice: product.discountPrice,
            seller: product.seller,
        };
        addItems(item, 1);
    };

    const handleDialogClose = () => {
        setOpen(!open);
    };

    const itemInCart = cartItems.some((item) => item.productId === productId);

    const goToCart = () => {
        navigate("/cart");
    };

    const buyNow = () => {
        addToCartHandler();
        navigate("/cart");
    };

    useEffect(() => {
        const fetchWishlistItems = async () => {
            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_SERVER_URL}/api/v1/user/wishlist`,
                    {
                        headers: {
                            Authorization: auth.token,
                        },
                    }
                );
                setWishlistItems(res.data.wishlistItems);
            } catch (error) {
                console.error("Error fetching wishlist items:", error);
            }
        };
        auth.token && !isAdmin && fetchWishlistItems();
    }, [isContextLoading, auth.token, auth, isAdmin]);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_SERVER_URL}/api/v1/product/${productId}`
                );
                res.status === 201 && setProduct(res.data.product);
                setLoading(false);
            } catch (error) {
                console.error("Error:", error);
                setLoading(false);
                error.response?.status === 404 &&
                    toast.error("Product Not Found!", { toastClassName: "custom-toast" });
                error.response?.status === 500 &&
                    toast.error(
                        "Something went wrong! Please try after sometime.",
                        { toastClassName: "custom-toast" }
                    );
            }
        };
        fetchProduct();
    }, [productId]);

    let itemInWishlist = wishlistItems?.find((id) => id === productId);

    const updateWishlistUI = (add) => {
        setWishlistItems((prev) =>
            add
                ? [...prev, product._id]
                : prev.filter((item) => item !== product._id)
        );
    };

    const addToWishlistHandler = async () => {
        if(auth?.token === undefined){
            toast.error("Please login!", { toastClassName: "custom-toast" });
            return;
        }
        let type = itemInWishlist ? "remove" : "add";
        try {
            updateWishlistUI(type === "add");
            const res = await axios.post(
                `${import.meta.env.VITE_SERVER_URL}/api/v1/user/update-wishlist`,
                {
                    productId: productId,
                    type,
                },
                {
                    headers: {
                        Authorization: auth.token,
                    },
                }
            );
            res.status === 201 &&
                toast.success(
                    type === "add"
                        ? "Product Added To Wishlist"
                        : "Product Removed From Wishlist",
                    { toastClassName: "custom-toast" }
                );
        } catch (error) {
            console.log(error);
            updateWishlistUI(type !== "add");
            toast.error("Something went wrong!", { toastClassName: "custom-toast" });
        }
    };

    const handleShareProduct = async () => {
        const shareUrl = `${window.location.origin}/product/${productId}`;
        if (navigator.share) {
            try {
                await navigator.share({
                    title: product?.name,
                    url: shareUrl,
                });
            } catch (err) {
                // toast.error("Share cancelled or failed.", {
                //     toastClassName: "custom-toast",
                // });
            }
        } else {
            try {
                await navigator.clipboard.writeText(shareUrl);
                toast.success("Product link copied!", { toastClassName: "custom-toast" });
            } catch (err) {
                // toast.error("Failed to copy link.", {
                //     toastClassName: "custom-toast",
                // });
            }
        }
    };

    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            {loading ? (
                <Spinner />
            ) : (
                <>
                    <SeoData title={product?.name} />
                    <ScrollToTopOnRouteChange />
                    <MinCategory />
                    <main className="w-full pt-2 pb-5 sm:mt-0 bg-[#FFFFFF] min-h-screen text-[#333333]">
                        <div className="w-full flex flex-col lg:flex-row bg-[#FFFFFF] sm:p-2 rounded-xl shadow-xl border border-[#54B1CE]">
                            {/* Image Section */}
                            <div className="w-full lg:w-2/5 lg:sticky top-16 lg:h-screen">
                                <div className="flex flex-col gap-3 m-3">
                                    <div className="relative group w-full lg:w-[450px] h-full pb-6">
                                        <div className="absolute inset-0 rounded-xl pointer-events-none border-2 border-[#54B1CE] transition-all duration-300 group-hover:shadow-[0_0_24px_4px_#54B1CE]"></div>
                                        <div className="border border-[#54B1CE] rounded-xl relative bg-[#FFFFFF] transition-all duration-300">
                                            <Slider {...settings}>
                                                {product?.images.length > 1 ? (
                                                    product?.images?.map(
                                                        (item, i) => (
                                                            <img
                                                                draggable="false"
                                                                className="w-full h-96 object-contain rounded-xl"
                                                                src={item.url}
                                                                alt={product.name}
                                                                key={i}
                                                            />
                                                        )
                                                    )
                                                ) : (
                                                    <img
                                                        draggable="false"
                                                        className="w-full h-96 object-contain rounded-xl"
                                                        src={product?.images[0]?.url}
                                                        alt={product?.name}
                                                    />
                                                )}
                                            </Slider>
                                            <div
                                                className={`absolute top-4 right-4 shadow-lg bg-[#FFFFFF] w-9 h-9 border border-[#54B1CE] flex items-center justify-center rounded-full ${isAdmin ? "hidden" : ""}`}
                                            >
                                                <span
                                                    onClick={addToWishlistHandler}
                                                    className={`${itemInWishlist
                                                            ? "text-red-400"
                                                            : "hover:text-red-400 text-[#54B1CE]"
                                                        } cursor-pointer transition-colors duration-300`}
                                                >
                                                    <FavoriteIcon sx={{ fontSize: "18px" }} />
                                                </span>
                                            </div>
                                            <div className="absolute top-16 right-4 shadow-lg bg-[#FFFFFF] w-9 h-9 border border-[#54B1CE] flex items-center justify-center rounded-full">
                                                <span
                                                    onClick={handleShareProduct}
                                                    className="text-[#54B1CE] hover:text-[#3A8AA3] cursor-pointer transition-colors duration-300"
                                                    title="Share this product"
                                                >
                                                    <ShareIcon sx={{ fontSize: "18px" }} />
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full flex gap-3">
                                        {product.stock > 0 && (
                                            <button
                                                onClick={itemInCart ? goToCart : addToCartHandler}
                                                disabled={isAdmin}
                                                className="disabled:cursor-not-allowed p-2 sm:p-4 w-1/2 flex items-center justify-center gap-2 text-[#FFFFFF] bg-[#54B1CE] rounded-lg shadow hover:shadow-xl hover:bg-[#3A8AA3] transition-all duration-300 hover:scale-105 border-2 border-[#54B1CE]"
                                            >
                                                <ShoppingCartIcon />
                                                {itemInCart ? "GO TO CART" : "ADD TO CART"}
                                            </button>
                                        )}
                                        <button
                                            onClick={buyNow}
                                            disabled={isAdmin || product.stock < 1}
                                            className={`disabled:cursor-not-allowed flex items-center justify-center gap-2 text-[#FFFFFF] rounded-lg shadow p-4 transition-all duration-300 relative overflow-hidden border-2
                                                ${product.stock < 1
                                                    ? "w-full bg-red-600 border-red-400 cursor-not-allowed"
                                                    : "w-1/2 bg-[#54B1CE] border-[#54B1CE] hover:bg-[#3A8AA3]"
                                                }
                                                group
                                            `}
                                        >
                                            <span className="absolute inset-0 rounded-lg pointer-events-none border-2 border-[#54B1CE] opacity-0 group-hover:opacity-100 group-hover:shadow-[0_0_24px_4px_#54B1CE] transition-all duration-300"></span>
                                            <span className="relative flex items-center gap-2 z-10">
                                                <FlashOnIcon />
                                                {product?.stock < 1 ? "OUT OF STOCK" : "BUY NOW"}
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            {/* Product Details Section */}
                            <div className="py-2 px-3 w-full">
                                <div className="flex flex-col gap-3 mb-4">
                                    <h2 className="text-lg sm:text-2xl font-bold text-[#333333]">{product?.name}</h2>
                                    <span className="text-md text-[#333333] font-medium flex gap-2 items-center">
                                        <span className="text-xs px-1.5 py-0.5 bg-[#54B1CE] rounded-sm text-[#FFFFFF] flex items-center gap-0.5">
                                            {product?.ratings?.toFixed(1)}
                                            <StarIcon sx={{ fontSize: "12px" }} />
                                        </span>
                                        <span>
                                            {product?.numOfReviews} Reviews
                                        </span>
                                    </span>
                                    <div className="flex flex-col text-3xl">
                                        <span className="text-[#54B1CE] text-sm font-medium">
                                            Special Price
                                        </span>
                                        <div className="flex items-baseline gap-2 text-3xl font-medium">
                                            <span className="text-[#333333]">
                                                ₹{(product?.price - product?.discountPrice)?.toLocaleString()}
                                            </span>
                                            <span className="text-base text-gray-500 line-through">
                                                ₹{product?.price?.toLocaleString()}
                                            </span>
                                            <span className="text-base text-[#54B1CE]">
                                                {getDiscount(product?.price, product?.discountPrice)}%&nbsp;off
                                            </span>
                                        </div>
                                    </div>
                                    {product?.stock <= 10 && product?.stock > 0 && (
                                        <span className="text-red-400 text-sm font-medium">
                                            Hurry, Only {product.stock} left!
                                        </span>
                                    )}
                                    <div className="flex gap-8 mt-2 items-center text-sm">
                                        <img
                                            draggable="false"
                                            className="w-20 h-8 p-0.5 border border-[#54B1CE] object-contain rounded"
                                            src={product.brand?.logo.url}
                                            alt={product?.brand?.name}
                                        />
                                        <span className="text-[#333333]">
                                            {product?.warranty === 0
                                                ? "No Warranty"
                                                : `${product?.warranty} Year Brand Warranty`}
                                        </span>
                                    </div>
                                    <div className="flex gap-16 mt-4 items-center text-sm font-medium">
                                        <p className="text-[#333333]">Delivery</p>
                                        <span className="text-[#333333]">
                                            Delivery by {getDeliveryDate()} | ₹40
                                        </span>
                                    </div>
                                    <div className="flex flex-col sm:flex-row justify-between">
                                        <div className="flex gap-16 mt-4 items-stretch text-sm">
                                            <p className="text-[#333333] font-medium">
                                                Highlights
                                            </p>
                                            <ul className="list-disc flex flex-col gap-2 w-64 text-[#333333]">
                                                {product?.highlights?.map((highlight, i) => (
                                                    <li key={i}>
                                                        <p>{highlight}</p>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="flex gap-16 mt-4 mr-6 items-stretch text-sm">
                                            <p className="text-[#333333] font-medium">
                                                Services
                                            </p>
                                            <ul className="flex flex-col gap-2 text-[#333333]">
                                                <li>
                                                    <p className="flex items-center gap-3">
                                                        <span className="text-[#54B1CE]">
                                                            <VerifiedUserIcon sx={{ fontSize: "18px" }} />
                                                        </span>{" "}
                                                        {product?.warranty} Year Brand Warranty
                                                    </p>
                                                </li>
                                                <li>
                                                    <p className="flex items-center gap-3">
                                                        <span className="text-[#54B1CE]">
                                                            <CachedIcon sx={{ fontSize: "18px" }} />
                                                        </span>{" "}
                                                        7 Days Replacement Policy
                                                    </p>
                                                </li>
                                                <li>
                                                    <p className="flex items-center gap-3">
                                                        <span className="text-[#54B1CE]">
                                                            <CurrencyRupeeIcon sx={{ fontSize: "18px" }} />
                                                        </span>{" "}
                                                        Cash on Delivery available
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="flex gap-16 mt-4 items-center text-sm font-medium">
                                        <p className="text-[#333333]">Seller</p>
                                        <Link className="font-medium text-[#54B1CE] ml-3" to="/">
                                            {product?.brand?.name}
                                        </Link>
                                    </div>
                                    <div className="flex flex-col sm:flex-row gap-1 sm:gap-14 mt-4 items-stretch text-sm">
                                        <p className="text-[#333333] font-medium">
                                            Description
                                        </p>
                                        <span className="text-[#333333]">{product?.description}</span>
                                    </div>
                                    <div className="w-full mt-4 pb-4 rounded-xl border border-[#54B1CE] bg-[#FFFFFF] flex flex-col">
                                        <h1 className="px-6 py-4 border-b border-[#54B1CE] text-2xl font-[600] text-[#333333]">
                                            Specifications
                                        </h1>
                                        <h1 className="px-6 py-3 text-lg text-[#333333]">
                                            General
                                        </h1>
                                        {product?.specifications?.map((spec, i) => (
                                            <div className="px-6 py-2 flex items-center text-sm" key={i}>
                                                <p className="text-[#333333] w-3/12">{spec.title}</p>
                                                <p className="flex-1 text-[#333333]">{spec.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="w-full mt-4 rounded-xl border border-[#54B1CE] bg-[#FFFFFF] flex flex-col">
                                        <div className="flex justify-between items-center border-b border-[#54B1CE] px-6 py-4">
                                            <h1 className="text-2xl font-medium text-[#333333]">
                                                Ratings & Reviews
                                            </h1>
                                            <button
                                                onClick={handleDialogClose}
                                                className="shadow bg-[#54B1CE] font-[500] px-4 py-2 rounded-lg hover:shadow-md hover:bg-[#3A8AA3] border border-[#54B1CE] text-[#FFFFFF]"
                                            >
                                                Rate Product
                                            </button>
                                        </div>

                                        <Dialog
                                            aria-labelledby="review-dialog"
                                            open={open}
                                            onClose={handleDialogClose}
                                        >
                                            <DialogTitle className="border-b text-[#333333] bg-[#FFFFFF]">
                                                Submit Review
                                            </DialogTitle>
                                            <DialogContent className="flex flex-col m-1 gap-4 bg-[#FFFFFF] text-[#333333]">
                                                <Rating
                                                    onChange={(e) => setRating(e.target.value)}
                                                    value={rating}
                                                    size="large"
                                                    precision={0.5}
                                                />
                                                <TextField
                                                    label="Review"
                                                    multiline
                                                    rows={3}
                                                    sx={{ width: 400, input: { color: '#333333' }, label: { color: '#54B1CE' } }}
                                                    size="small"
                                                    variant="outlined"
                                                    value={comment}
                                                    onChange={(e) => setComment(e.target.value)}
                                                    InputProps={{ style: { borderColor: '#54B1CE' } }}
                                                />
                                            </DialogContent>
                                            <DialogActions className="bg-[#FFFFFF]">
                                                <button
                                                    onClick={handleDialogClose}
                                                    className="py-2 px-6 rounded shadow bg-[#FFFFFF] border border-red-500 hover:bg-red-100 text-red-600 uppercase"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    onClick={reviewSubmitHandler}
                                                    className="py-2 px-6 rounded bg-[#54B1CE] hover:bg-[#3A8AA3] text-[#FFFFFF] shadow uppercase"
                                                >
                                                    Submit
                                                </button>
                                            </DialogActions>
                                        </Dialog>

                                        <div className="flex items-center border-b border-[#54B1CE]">
                                            <h1 className="px-6 py-3 text-3xl font-semibold text-[#333333]">
                                                {product?.ratings?.toFixed(1)}{" "}
                                                <StarIcon sx={{ color: '#54B1CE' }} />
                                            </h1>
                                            <p className="text-lg text-[#333333]">
                                                ({product?.numOfReviews}) Reviews
                                            </p>
                                        </div>

                                        {viewAll
                                            ? product?.reviews
                                                ?.map((rev, i) => (
                                                    <div
                                                        className="flex flex-col gap-2 py-4 px-6 border-b border-[#54B1CE]"
                                                        key={i}
                                                    >
                                                        <Rating
                                                            name="read-only"
                                                            value={rev.rating}
                                                            readOnly
                                                            size="small"
                                                            precision={0.5}
                                                        />
                                                        <p className="text-[#333333]">{rev.comment}</p>
                                                        <span className="text-sm text-[#333333]">
                                                            by {rev.name}
                                                        </span>
                                                    </div>
                                                ))
                                                .reverse()
                                            : product.reviews
                                                ?.slice(-3)
                                                .map((rev, i) => (
                                                    <div
                                                        className="flex flex-col gap-2 py-4 px-6 border-b border-[#54B1CE]"
                                                        key={i}
                                                    >
                                                        <Rating
                                                            name="read-only"
                                                            value={rev.rating}
                                                            readOnly
                                                            size="small"
                                                            precision={0.5}
                                                        />
                                                        <p className="text-[#333333]">{rev.comment}</p>
                                                        <span className="text-sm text-[#333333]">
                                                            by {rev.name}
                                                        </span>
                                                    </div>
                                                ))
                                                .reverse()}
                                        {product.reviews?.length > 3 && (
                                            <button
                                                onClick={() => setViewAll(!viewAll)}
                                                className="w-1/3 m-2 rounded-sm shadow hover:shadow-lg py-2 bg-[#54B1CE] text-[#FFFFFF] hover:bg-[#3A8AA3]"
                                            >
                                                {viewAll ? "View Less" : "View All"}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3 mt-6">
                            <ProductSlider
                                title={"Recommendation"}
                                products={[...fashionProducts, ...electronicProducts]}
                            />
                        </div>
                        <style>
                            {`
                                @keyframes fadeIn {
                                    from { opacity: 0; transform: translateY(30px);}
                                    to { opacity: 1; transform: translateY(0);}
                                }
                                .animate-fadeIn {
                                    animation: fadeIn 0.8s cubic-bezier(.68,-0.55,.27,1.55) both;
                                }
                                .custom-toast {
                                    background-color: #FFFFFF;
                                    color: #333333;
                                    border: 2px solid #54B1CE;
                                    border-radius: 50px;
                                    padding: 10px 20px;
                                    font-size: 14px;
                                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                                    margin-top: 40px;
                                }
                                .Toastify__toast--success {
                                    background-color: #FFFFFF;
                                    color: #333333;
                                    border: 2px solid #54B1CE;
                                }
                                .Toastify__toast--error {
                                    background-color: #FFFFFF;
                                    color: #333333;
                                    border: 2px solid #ff4d4f;
                                }
                            `}
                        </style>
                    </main>
                </>
            )}
        </>
    );
};

export default ProductDetails;
