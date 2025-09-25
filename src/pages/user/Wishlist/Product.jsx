/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { getDiscount } from "../../../utils/functions";
import DeleteIcon from "@mui/icons-material/Delete";
import StarIcon from "@mui/icons-material/Star";
import { useState } from "react";

const Product = (props) => {
    const {
        _id,
        name,
        price,
        discountPrice,
        images,
        ratings,
        numOfReviews,
        func,
    } = props;
    const [isDeleting, setIsDeleting] = useState(false);
    const deleteProduct = async () => {
        setIsDeleting(true);
        try {
            await func(_id);
        } catch (error) {
            // Handle any errors if necessary
        } finally {
            setIsDeleting(false);
        }
    };
    const shouldRenderImage = images && images.length > 0;

    return (
        <div className="flex gap-4 p-4 sm:pb-8 w-full group overflow-hidden bg-gradient-to-br from-[#e0f7fa]/80 via-[#f1faff]/80 to-[#f0f9ff]/80 shadow border border-[#bae6fd] mb-4">
            <div className="w-1/6 h-28 flex-shrink-0 bg-white rounded-lg border border-[#bae6fd] flex items-center justify-center">
                <img
                    draggable="false"
                    className="h-full w-full object-contain"
                    src={shouldRenderImage ? images[0].url : ""}
                    alt={name}
                />
            </div>
            {/* Description */}
            <div className="flex flex-col gap-5 w-full p-1">
                {/* Product title */}
                <div className="flex justify-between items-start sm:pr-5">
                    <Link
                        to={`/product/${_id}`}
                        className="flex flex-col gap-0.5"
                    >
                        <p className="group-hover:text-[#2563eb] w-56 sm:w-full truncate font-semibold text-[#2563eb]">
                            {name?.length > 70
                                ? `${name?.substring(0, 70)}...`
                                : name}
                        </p>
                        {/* Rating badge */}
                        <span className="text-sm text-[#64748b] font-medium flex gap-2 items-center">
                            <span className="text-xs px-1.5 py-0.5 bg-[#38bdf8] rounded-sm text-white flex items-center gap-0.5">
                                {ratings} <StarIcon sx={{ fontSize: "14px" }} />
                            </span>
                            <span>({numOfReviews?.toLocaleString()})</span>
                        </span>
                    </Link>
                    <button
                        onClick={deleteProduct}
                        className="text-[#64748b] hover:text-[#f87171] border border-[#bae6fd] hover:border-[#f87171] rounded-lg p-2 transition-all duration-200 bg-white"
                        disabled={isDeleting}
                    >
                        <DeleteIcon />
                    </button>
                </div>
                {/* Price desc */}
                <div className="flex items-center gap-2 text-2xl font-medium">
                    <span className="text-[#2563eb]">
                        ₹{(price - discountPrice)?.toLocaleString()}
                    </span>
                    <span className="text-sm text-[#64748b] line-through font-normal mt-1">
                        ₹{price?.toLocaleString()}
                    </span>
                    <span className="text-sm text-green-500 mt-1">
                        {getDiscount(price, discountPrice)}%&nbsp;off
                    </span>
                </div>
            </div>
            {/* <!-- description --> */}
        </div>
    );
};

export default Product;
