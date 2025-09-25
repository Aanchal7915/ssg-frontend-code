/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import CircleIcon from "@mui/icons-material/Circle";
import { Link } from "react-router-dom";
import { formatDate } from "../../../utils/functions";

const OrderItem = ({
    item,
    orderId,
    orderStatus,
    createdAt,
    paymentId,
    buyer,
    shippingInfo,
    amount,
}) => {
    return (
        <Link
            to={`./order_details/${orderId}`}
            className="flex flex-col sm:flex-row items-start bg-gradient-to-br from-[#e0f7fa]/80 via-[#f1faff]/80 to-[#f0f9ff]/80 border border-[#38bdf8] rounded-xl gap-5 px-4 sm:px-8 py-5 mx-2 sm:mx-10 transition-all duration-300 shadow-lg hover:shadow-2xl hover:border-[#0ea5e9]"
            style={{ boxShadow: "0 4px 24px 0 #bae6fd55" }}
        >
            {/* Image container */}
            <div className="w-full sm:w-32 h-20 flex items-center justify-center bg-white rounded-lg border border-[#bae6fd] shadow">
                <img
                    draggable="false"
                    className="h-full w-full object-contain rounded"
                    src={item?.image}
                    alt={item?.name}
                />
            </div>

            {/* Order desc container */}
            <div className="flex flex-col sm:flex-row justify-between w-full">
                <div className="flex flex-col w-[300px] gap-1 overflow-hidden">
                    <p className="text-sm text-[#2563eb] font-semibold">
                        {item?.name.length > 40
                            ? `${item?.name.substring(0, 40)}...`
                            : item?.name}
                    </p>
                    <p className="text-xs text-[#64748b] mt-1">
                        Quantity: {item?.quantity}
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row mt-1 sm:mt-0 gap-2 sm:gap-20 sm:w-1/2">
                    <p className="text-sm text-[#0ea5e9] w-[100px] font-semibold">
                        ₹{((item?.price -item?.discountPrice)* item.quantity).toLocaleString()}
                    </p>

                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-medium flex items-center gap-1 w-[250px]">
                            {orderStatus === "Shipped" ? (
                                <>
                                    <span className="text-orange-400 pb-0.5">
                                        <CircleIcon sx={{ fontSize: "14px" }} />
                                    </span>
                                    <span className="text-[#f59e42]">Shipped</span>
                                </>
                            ) : orderStatus === "Delivered" ? (
                                <>
                                    <span className="text-green-500 pb-0.5">
                                        <CircleIcon sx={{ fontSize: "14px" }} />
                                    </span>
                                    <span className="text-green-600">Delivered</span>
                                </>
                            ) : orderStatus === "Out For Delivery" ? (
                                <>
                                    <span className="text-sky-500 pb-0.5">
                                        <CircleIcon sx={{ fontSize: "14px" }} />
                                    </span>
                                    <span className="text-sky-700">Out For Delivery</span>
                                </>
                            ) : (
                                <>
                                    <span className="text-[#38bdf8] pb-0.5">
                                        <CircleIcon sx={{ fontSize: "14px" }} />
                                    </span>
                                    <span className="text-[#2563eb]">
                                        Ordered on {formatDate(createdAt)}
                                    </span>
                                </>
                            )}
                        </p>
                        {orderStatus === "Delivered" ? (
                            <p className="text-xs text-green-600 ml-1">
                                Your item has been Delivered
                            </p>
                        ) : orderStatus === "Shipped" ? (
                            <p className="text-xs text-orange-400 ml-1">
                                Your item has been Shipped
                            </p>
                        ) : orderStatus === "Processed" ? (
                            <p className="text-xs text-[#64748b] ml-1">
                                Seller has processed your order
                            </p>
                        ) : orderStatus === "Out For Delivery" ? (
                            <p className="text-xs text-sky-700 ml-1">
                                Your order is Out for Delivery
                            </p>
                        ) : (
                            <p className="text-xs text-[#64748b] ml-1">
                                Your order has been placed
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default OrderItem;
