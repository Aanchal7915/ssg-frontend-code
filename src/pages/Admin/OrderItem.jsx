/* eslint-disable react/prop-types */
import CircleIcon from "@mui/icons-material/Circle";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/functions";

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
            className="flex flex-col sm:flex-row items-start bg-gradient-to-br from-[#e0f7fa]/90 via-[#f1faff]/90 to-[#f0f9ff]/90 border border-[#38bdf8] rounded-xl gap-4 sm:gap-6 px-3 sm:px-6 py-4 sm:py-6 mx-2 sm:mx-6 transition-all duration-300 text-[#334155] shadow-lg hover:shadow-2xl hover:border-[#0ea5e9]"
            style={{ boxShadow: "0 4px 24px 0 #bae6fd55" }}
        >
            {/* image container */}
            <div className="flex items-center justify-center bg-white rounded-lg border border-[#bae6fd] shadow overflow-hidden min-w-[100px] min-h-[100px] sm:min-w-[140px] sm:min-h-[140px] md:min-w-[180px] md:min-h-[180px] max-w-[180px] max-h-[180px] w-full sm:w-[140px] md:w-[180px] h-[140px] md:h-[180px]">
                <img
                    draggable="false"
                    className="object-contain w-full h-full"
                    src={item?.image}
                    alt={item?.name}
                    
                />
            </div>
            {/* order desc container */}
            <div className="flex flex-col sm:flex-row justify-between w-full gap-2 sm:gap-6">
                <div className="flex flex-col min-w-0 flex-1 gap-1 overflow-hidden">
                    <p className="text-[15px] sm:text-base md:text-lg text-[#2563eb] font-semibold truncate">
                        {item?.name}
                    </p>
                    <p className="text-xs sm:text-sm text-[#64748b] mt-1">
                        Quantity: {item?.quantity}
                    </p>
                </div>

                {/* Responsive status and price block */}
                <div className="flex flex-col gap-2 w-full sm:w-auto sm:flex-row sm:gap-8 items-start sm:items-center flex-shrink-0">
                    <p className="text-sm sm:text-base md:text-lg text-[#0ea5e9] font-semibold min-w-[80px]">
                        ₹{(item?.price - item?.discountPrice).toLocaleString()}
                    </p>

                    <div className="flex flex-col gap-1 sm:gap-2 w-full sm:w-auto">
                        <div className="flex items-center gap-1 flex-wrap">
                            {orderStatus === "Shipped" ? (
                                <>
                                    <span className="text-orange-400 pb-0.5">
                                        <CircleIcon sx={{ fontSize: 14 }} />
                                    </span>
                                    <span className="text-[#f59e42] text-xs sm:text-sm md:text-base font-medium">
                                        Shipped
                                    </span>
                                </>
                            ) : orderStatus === "Delivered" ? (
                                <>
                                    <span className="text-green-500 pb-0.5">
                                        <CircleIcon sx={{ fontSize: 14 }} />
                                    </span>
                                    <span className="text-green-600 text-xs sm:text-sm md:text-base font-medium">
                                        Delivered
                                    </span>
                                </>
                            ) : orderStatus === "Out For Delivery" ? (
                                <>
                                    <span className="text-sky-500 pb-0.5">
                                        <CircleIcon sx={{ fontSize: 14 }} />
                                    </span>
                                    <span className="text-sky-700 text-xs sm:text-sm md:text-base font-medium">
                                        Out For Delivery
                                    </span>
                                </>
                            ) : (
                                <>
                                    <span className="text-[#38bdf8] pb-0.5">
                                        <CircleIcon sx={{ fontSize: 14 }} />
                                    </span>
                                    <span className="text-[#2563eb] text-xs sm:text-sm md:text-base font-medium truncate max-w-[120px] sm:max-w-none">
                                        Order received on {formatDate(createdAt)}
                                    </span>
                                </>
                            )}
                        </div>
                        {orderStatus === "Delivered" ? (
                            <p className="text-xs sm:text-sm text-green-600 ml-1">
                                Item successfully delivered
                            </p>
                        ) : orderStatus === "Out For Delivery" ? (
                            <p className="text-xs sm:text-sm text-sky-700 ml-1">
                                Product is out for delivery
                            </p>
                        ) : orderStatus === "Shipped" ? (
                            <p className="text-xs sm:text-sm text-orange-400 ml-1">
                                You have processed this order
                            </p>
                        ) : (
                            <p className="text-xs sm:text-sm text-[#64748b] ml-1">
                                Order received
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default OrderItem;
