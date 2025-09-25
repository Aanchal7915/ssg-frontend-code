/* eslint-disable react/prop-types */
import { getDiscount } from "../../../utils/functions";
import { useCart } from "../../../context/cart";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeleteIcon from "@mui/icons-material/Delete";

const SaveForLaterItem = ({ product }) => {
    const [, , , , saveLaterItems, addLater, moveToCart, removeLater] =
        useCart();

    const removeFromSaveForLaterHandler = (product) => {
        removeLater(product);
    };

    const moveToCartHandler = (product, quantity) => {
        moveToCart(product, quantity);
    };

    return (
        <div
            className="flex flex-col gap-3 py-5 pl-2 sm:pl-6 border-b bg-gradient-to-br from-[#e0f7fa]/80 via-[#f1faff]/80 to-[#f0f9ff]/80  shadow border border-[#bae6fd] mb-4"
            key={product.productId}
        >
            <div className="flex flex-col sm:flex-row gap-5 items-stretch w-full">
                {/* Product image */}
                <div className="w-full sm:w-1/6 h-28 flex-shrink-0 flex items-center justify-center bg-white rounded-lg border border-[#bae6fd]">
                    <img
                        draggable="false"
                        className="h-full w-full object-contain"
                        src={product?.image}
                        alt={product?.name}
                    />
                </div>
                {/* Description */}
                <div className="flex flex-col gap-1 sm:gap-5 w-full p-1 pr-6">
                    {/* Product title */}
                    <div className="flex justify-between items-start pr-5">
                        <div className="flex flex-col gap-0.5 w-11/12 sm:w-full">
                            <p className="font-semibold text-[#2563eb]">
                                {product?.name?.length > 50
                                    ? `${product?.name?.substring(0, 50)}...`
                                    : product?.name}
                            </p>
                            <span className="text-sm text-[#64748b]">
                                Seller: {product?.brandName}
                            </span>
                        </div>
                    </div>
                    {/* Price desc */}
                    <div className="flex items-baseline gap-2 text-xl font-medium">
                        <span className="text-[#2563eb]">
                            ₹{(product?.price * product?.quantity).toLocaleString()}
                        </span>
                        <span className="text-sm text-[#64748b] line-through font-normal">
                            ₹{(product?.discountPrice * product?.quantity).toLocaleString()}
                        </span>
                        <span className="text-sm text-green-500">
                            {getDiscount(product?.price, product?.discountPrice)}%&nbsp;off
                        </span>
                    </div>
                </div>
            </div>
            {/* Move to cart & remove */}
            <div className="flex justify-evenly sm:justify-start sm:gap-6 mt-2">
                {/* Quantity */}
                <div className="flex gap-2 items-center justify-between w-[130px]">
                    <span className="w-7 h-7 text-3xl font-light bg-[#f0f9ff] rounded-full border border-[#bae6fd] flex items-center justify-center cursor-not-allowed text-[#64748b]">
                        <p>-</p>
                    </span>
                    <input
                        className="w-11 border border-[#bae6fd] outline-none text-center rounded-sm py-0.5 bg-[#f0f9ff] text-[#2563eb] font-medium text-sm qtyInput"
                        value={product?.quantity}
                        disabled
                    />
                    <span className="w-7 h-7 text-xl font-light bg-[#f0f9ff] rounded-full border border-[#bae6fd] flex items-center justify-center cursor-not-allowed text-[#64748b]">
                        +
                    </span>
                </div>
                {/* Move to cart button */}
                <button
                    onClick={() => moveToCartHandler(product, product?.quantity)}
                    className="sm:ml-4 font-medium flex items-center gap-1 border border-indigo-500 rounded px-3 py-1 transition-all duration-200 bg-white shadow"
                >
                    <ShoppingCartIcon sx={{ fontSize: "18px" }} />
                    MOVE TO CART
                </button>
                {/* Remove button */}
                <button
                    onClick={() => removeFromSaveForLaterHandler(product)}
                    className="font-medium flex items-center gap-1 border border-red-500 rounded px-3 py-1 transition-all duration-200 bg-white shadow"
                >
                    <DeleteIcon sx={{ fontSize: "18px" }} />
                    REMOVE
                </button>
            </div>
        </div>
    );
};

export default SaveForLaterItem;
