import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/auth";
import StarIcon from "@mui/icons-material/Star";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Reviews = () => {
    const { auth } = useAuth();
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReviews = async () => {
            setLoading(true);
            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_SERVER_URL}/api/v1/user/my-reviews`,
                    { headers: { Authorization: auth.token } }
                );
                setReviews(res.data || []);
            } catch (err) {
                toast.error("Failed to fetch reviews");
            }
            setLoading(false);
        };
        fetchReviews();
    }, [auth.token]);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this review?")) return;
        try {
            await axios.delete(
                `${import.meta.env.VITE_SERVER_URL}/api/v1/user/delete-review/${id}`,
                { headers: { Authorization: auth.token } }
            );
            setReviews((prev) => prev.filter((r) => r._id !== id));
            toast.success("Review deleted!");
        } catch (err) {
            toast.error("Failed to delete review");
        }
    };

    const handleEdit = (productId) => {
        window.location.href = `/product/${productId}`;
    };

    return (
        <main className="w-full min-h-screen bg-gradient-to-br from-[#e0f7fa] via-[#f1faff] to-[#f0f9ff] pt-8 pb-8 text-[#334155]">
            <div className="max-w-2xl mx-auto py-8 px-2">
                <h2 className="text-2xl font-bold mb-6 text-[#2563eb]">Your Ratings & Reviews</h2>
                {loading ? (
                    <div className="text-center py-4 text-[#2563eb]">Loading...</div>
                ) : reviews.length === 0 ? (
                    <div className="text-[#64748b]">You haven't reviewed any products yet.</div>
                ) : (
                    reviews.map((review) => (
                        <div
                            key={review._id}
                            className="border border-[#bae6fd] rounded-xl p-4 mb-4 bg-gradient-to-br from-[#e0f7fa]/80 via-[#f1faff]/80 to-[#f0f9ff]/80 shadow"
                        >
                            <div className="flex items-center gap-2 mb-2">
                                {review.product?.images && review.product?.images[0] && (
                                    <img
                                        src={review.product?.images[0].url}
                                        alt={review.product?.name}
                                        className="w-12 h-12 object-cover rounded border border-[#bae6fd] mr-2 bg-white"
                                    />
                                )}
                                <span className="font-semibold text-lg text-[#2563eb]">
                                    <Link to={`/product/${review.product?._id}`} className="hover:underline">
                                        {review.product.name}
                                    </Link>
                                </span>
                                <span className="flex items-center gap-1 text-yellow-500 font-bold ml-2">
                                    {review.rating}
                                    <StarIcon sx={{ fontSize: "18px" }} />
                                </span>
                            </div>
                            <div className="text-[#334155] mb-2">{review.comment}</div>
                            <div className="text-xs text-[#64748b] mb-2">
                                {new Date(review.createdAt).toLocaleString()}
                            </div>
                            <div className="flex gap-2">
                                <button
                                    className="px-3 py-1 bg-[#38bdf8] text-white rounded hover:bg-[#0ea5e9] border border-[#bae6fd] transition-all duration-200"
                                    onClick={() => handleEdit(review.product._id)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="px-3 py-1 bg-[#f87171] text-white rounded hover:bg-[#ef4444] border border-[#f87171] transition-all duration-200"
                                    onClick={() => handleDelete(review._id)}
                                >
                                    Delete
                                </button>
                                <Link
                                    to={`/product/${review.product?._id}`}
                                    className="px-3 py-1 bg-white text-[#2563eb] rounded hover:bg-[#e0f7fa] border border-[#bae6fd] transition-all duration-200"
                                >
                                    View Product
                                </Link>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </main>
    );
};

export default Reviews;
