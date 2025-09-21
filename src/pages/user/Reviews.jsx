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

    // Fetch user's reviews
    useEffect(() => {
        const fetchReviews = async () => {
            setLoading(true);
            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_SERVER_URL}/api/v1/user/my-reviews`,
                    { headers: { Authorization: auth.token } }
                );
                console.log(res.data);
                setReviews(res.data || []);
            } catch (err) {
                toast.error("Failed to fetch reviews");
            }
            setLoading(false);
        };
        fetchReviews();
    }, [auth.token]);

    // Feature: Delete review
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

    // Feature: Edit review (redirect to product page for editing)
    const handleEdit = (productId) => {
        window.location.href = `/product/${productId}`;
    };

    return (
        <div className="max-w-2xl mx-auto py-8 p-2">
            <h2 className="text-2xl font-bold mb-6">Your Ratings & Reviews</h2>
            {loading ? (
                <div className="text-center py-4">Loading...</div>
            ) : reviews.length === 0 ? (
                <div className="text-gray-500">You haven't reviewed any products yet.</div>
            ) : (
                reviews.map((review) => (
                    <div key={review._id} className="border rounded-md p-4 mb-4 bg-white shadow-sm">
                        <div className="flex items-center gap-2 mb-2">
                            {/* Product Image */}
                            {review.product.images && review.product.images[0] && (
                                <img
                                    src={review.product.images[0].url}
                                    alt={review.product.name}
                                    className="w-12 h-12 object-cover rounded mr-2 border"
                                />
                            )}
                            <span className="font-semibold text-lg">
                                <Link to={`/product/${review.product._id}`} className="hover:underline">
                                    {review.product.name}
                                </Link>
                            </span>
                            <span className="flex items-center gap-1 text-yellow-600 font-bold ml-2">
                                {review.rating}
                                <StarIcon sx={{ fontSize: "18px" }} />
                            </span>
                        </div>
                        <div className="text-gray-700 mb-2">{review.comment}</div>
                        <div className="text-xs text-gray-400 mb-2">
                            {new Date(review.createdAt).toLocaleString()}
                        </div>
                        <div className="flex gap-2">
                            <button
                                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                                onClick={() => handleEdit(review.product._id)}
                            >
                                Edit
                            </button>
                            <button
                                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                onClick={() => handleDelete(review._id)}
                            >
                                Delete
                            </button>
                            <Link
                                to={`/product/${review.product._id}`}
                                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                            >
                                View Product
                            </Link>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default Reviews;
