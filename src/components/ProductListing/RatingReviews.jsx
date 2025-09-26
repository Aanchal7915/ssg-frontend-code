import React, { useEffect, useState } from "react";

const ProductReviews = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchReviews = async (pageNum = 1) => {
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/product/reviews/${productId}?page=${pageNum}&limit=3`);
      const data = await res.json();

      if (data.success) {
        setReviews((prev) => [...prev, ...data.reviews]);
        setHasMore(data.hasMore);
      }
    } catch (err) {
      console.error("Error fetching reviews:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews(1);
  }, [productId]);

  return (
    <div className=" mx-auto mt-8 px-4">
      <h2 className="text-md font-bold mb-6">Customer Reviews</h2>

      {reviews.length === 0 && !loading && (
        <p className="text-gray-500">No reviews yet.</p>
      )}

      <div className="space-y-4">
        {reviews.map((review) => (
          <div
            key={review._id}
            className="p-4 bg-white  border-b order-gray-200"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold">{review.user?.name || "Anonymous"}</span>
              <span className="text-yellow-500">
                {"⭐".repeat(review.rating)}
              </span>
            </div>
            <p className="text-gray-700">{review.comment}</p>
            <p className="text-xs text-gray-400 mt-2">
              {new Date(review.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>

      {loading && <p className="text-blue-500 mt-3">Loading...</p>}

      {!loading && hasMore && (
        <button
          onClick={() => {
            const nextPage = page + 1;
            setPage(nextPage);
            fetchReviews(nextPage);
          }}
          className="mt-6 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          View More
        </button>
      )}
    </div>
  );
};

export default ProductReviews;
