/* eslint-disable no-unused-vars */
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Tracker from "./Tracker";
import MinCategory from "../../../components/MinCategory";
import axios from "axios";
import { useAuth } from "../../../context/auth";
import Spinner from "../../../components/Spinner";
import SeoData from "../../../SEO/SeoData";
import generateInvoice from "./generateInvoice";
import { useNavigate } from "react-router-dom";

const OrderDetails = () => {
    const params = useParams();
    const orderId = params.id;

    const [loading, setLoading] = useState(false);
    const [orderDetails, setOrderDetails] = useState([]);
    const { auth } = useAuth();
    const navigate = useNavigate();

    // Cancel order states
    const [showCancel, setShowCancel] = useState(false);
    const [cancelReason, setCancelReason] = useState("");
    const [cancelLoading, setCancelLoading] = useState(false);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);
                const response = await axios.get(
                    `${import.meta.env.VITE_SERVER_URL}/api/v1/user/order-detail?orderId=${orderId}`,
                    {
                        headers: { Authorization: auth?.token },
                    }
                );
                if (response?.data?.orderDetails) {
                    setOrderDetails(...response.data.orderDetails);
                    setLoading(false);
                }
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };
        fetchOrders();
    }, [auth?.token, orderId]);

    const amount = orderDetails?.amount;
    const orderItems = orderDetails?.products;
    const buyer = orderDetails?.buyer;
    const paymentId = orderDetails?.paymentId;
    const shippingInfo = orderDetails?.shippingInfo;
    const createdAt = orderDetails?.createdAt;
    const orderStatus = orderDetails?.orderStatus;
    const cancelRequest = orderDetails?.cancelRequest;
    const cancelReasonInfo = orderDetails?.cancelReason;

    // Cancel order handler
    const handleCancelOrder = async () => {
        if (!cancelReason.trim()) return;
        setCancelLoading(true);
        try {
            await axios.post(
                `${import.meta.env.VITE_SERVER_URL}/api/v1/user/cancel-order`,
                {
                    orderId,
                    cancelRequest: true,
                    cancelReason,
                },
                {
                    headers: { Authorization: auth?.token },
                }
            );
            setShowCancel(false);
            setCancelLoading(false);
            // Optionally, refetch order details to update UI
            window.location.reload();
        } catch (error) {
            setCancelLoading(false);
            alert("Failed to cancel order. Try again.");
        }
    };

    // Show cancel button only if status is before "Out For Delivery" and not already requested
    const canCancel =
        !cancelRequest &&
        (orderStatus === "Processing" || orderStatus === "Shipped");

    return (
        <>
            <SeoData title="Order Details | SSG" />

            <MinCategory />
            <main className="w-full p-2 min-h-[90vh] py-2 sm:py-8 bg-gradient-to-br from-[#e0f7fa] via-[#f1faff] to-[#f0f9ff] text-[#334155]">
                <h2 className=" max-w-6xl mx-auto text-lg sm:text-xl font-semibold text-[#1C0311] mb-1 p-2 sm:p-3 border-l-4 border-[#54B1CE] bg-white shadow rounded-tr-lg rounded-br-lg">
                    Order Details
                </h2>
                {loading ? (
                    <Spinner />
                ) : (
                    <div className="flex flex-col gap-4 max-w-6xl mx-auto">
                        {/* back button */}
                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center gap-2 px-4 py-2 mt-4 mb-2 text-[#2563eb] hover:text-[#0ea5e9] bg-white rounded-lg border border-[#bae6fd] shadow transition-all duration-200 w-fit"
                        >
                            <ArrowBackIcon />
                            <span className="font-medium">Back</span>
                        </button>
                        <div className="flex flex-col sm:flex-row bg-white shadow rounded-xl min-w-full border border-[#bae6fd]">
                            <div className="sm:w-1/2 border-b sm:border-b-0 sm:border-r border-[#bae6fd]">
                                <div className="flex flex-col gap-3 my-8 mx-6">
                                    <h3 className="text-md font-[600] text-[#2563eb]">
                                        Delivery Address
                                    </h3>
                                    <h4 className="font-medium text-[#334155]">
                                        {buyer?.name}
                                    </h4>
                                    <p className="text-sm text-[#64748b]">{`${shippingInfo?.address}, ${shippingInfo?.city}, ${shippingInfo?.state} - ${shippingInfo?.pincode}`}</p>
                                    <div className="flex gap-2 text-sm">
                                        <p className="font-medium text-[#334155]">Email</p>
                                        <p className="text-[#64748b]">{buyer?.email}</p>
                                    </div>
                                    <div className="flex gap-2 text-sm">
                                        <p className="font-medium text-[#334155]">
                                            Phone Number
                                        </p>
                                        <p className="text-[#64748b]">{shippingInfo?.phoneNo}</p>
                                    </div>
                                    {
                                        orderDetails.trackLink &&
                                        <div className="flex gap-2 text-sm">
                                            <p className="font-medium text-[#334155]">
                                                Track Link
                                            </p>
                                            <a href={orderDetails
                                                .trackLink} target="_blank" rel="noopener noreferrer" className="text-[#0ea5e9] hover:underline">
                                                {orderDetails.trackLink}
                                            </a>
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className="w-full sm:w-1/2">
                                <div className="flex flex-col gap-3 my-8 mx-6">
                                    <h3 className="text-md font-[600] text-[#2563eb]">
                                        More Actions
                                    </h3>
                                    <div className="flex items-center justify-between flex-wrap gap-2">
                                        <button
                                            onClick={() => generateInvoice({ orderItems, buyer, shippingInfo, createdAt })}
                                            className="px-4 py-2 bg-[#38bdf8] text-white text-sm rounded hover:bg-[#0ea5e9] transition-all"
                                        >
                                            Download Invoice
                                        </button>
                                        {/* {canCancel && (
                                            <button
                                                onClick={() => setShowCancel(true)}
                                                className="px-4 py-2 bg-[#f87171] text-white text-sm rounded hover:bg-[#ef4444] transition-all"
                                            >
                                                Cancel Order
                                            </button>
                                        )} */}
                                        {cancelRequest && (
                                            <span className="px-4 py-2 bg-[#fef08a] text-[#b45309] text-sm rounded font-semibold">
                                                Cancel Requested
                                            </span>
                                        )}
                                    </div>
                                    {cancelRequest && cancelReasonInfo && (
                                        <div className="mt-2 text-xs text-[#64748b]">
                                            <span className="font-semibold text-[#b45309]">Reason:</span> {cancelReasonInfo}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Cancel Reason Modal */}
                        {showCancel && (
                            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
                                <div className="bg-white rounded-xl shadow-xl border border-[#bae6fd] p-6 w-full max-w-sm">
                                    <h3 className="text-lg font-semibold text-[#2563eb] mb-2">
                                        Cancel Order
                                    </h3>
                                    <label className="block text-sm text-[#334155] mb-1">
                                        Please provide a reason for cancellation:
                                    </label>
                                    <textarea
                                        value={cancelReason}
                                        onChange={e => setCancelReason(e.target.value)}
                                        rows={3}
                                        className="w-full border border-[#bae6fd] rounded-lg p-2 mb-3 text-[#334155] bg-[#f0f9ff] focus:outline-none focus:ring-2 focus:ring-[#38bdf8] resize-none"
                                        placeholder="Type your reason here..."
                                    />
                                    <div className="flex gap-2 justify-end">
                                        <button
                                            type="button"
                                            className="px-4 py-2 rounded-lg bg-[#bae6fd] text-[#2563eb] font-semibold hover:bg-[#38bdf8] transition"
                                            onClick={() => setShowCancel(false)}
                                            disabled={cancelLoading}
                                        >
                                            Close
                                        </button>
                                        <button
                                            type="button"
                                            className="px-4 py-2 rounded-lg bg-[#f87171] text-white font-semibold hover:bg-[#ef4444] transition"
                                            onClick={handleCancelOrder}
                                            disabled={cancelLoading || !cancelReason.trim()}
                                        >
                                            {cancelLoading ? "Cancelling..." : "Confirm Cancel"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {orderItems?.map((item) => {
                            const { _id, image, name, discountPrice, quantity, seller, price } = item;

                            return (
                                <div
                                    className="flex flex-col sm:flex-row min-w-full shadow rounded-xl bg-white border border-[#bae6fd] px-2 py-5"
                                    key={_id}
                                >
                                    <div className="flex flex-col sm:flex-row sm:w-1/2 gap-2">
                                        <div className="w-full sm:w-36 h-36 flex items-center justify-center bg-[#f0f9ff] rounded-lg border border-[#bae6fd] shadow">
                                            <img
                                                draggable="false"
                                                className="object-contain w-full h-full"
                                                src={image}
                                                alt={name}
                                                onError={e => {
                                                    e.target.src = "https://via.placeholder.com/180x180?text=No+Image";
                                                }}
                                            />
                                        </div>
                                        <div className="flex flex-col gap-1 overflow-hidden">
                                            <p className="text-sm text-[#2563eb] font-semibold truncate">
                                                {name.length > 60
                                                    ? `${name.substring(0, 60)}...`
                                                    : name}
                                            </p>
                                            <p className="text-xs text-[#64748b] mt-2">
                                                Quantity: {quantity}
                                            </p>
                                            <p className="text-xs text-[#64748b]">
                                                Seller: {seller?.name}
                                            </p>
                                            <span className="font-medium text-[#0ea5e9]">
                                                ₹{(quantity * (price - discountPrice)).toLocaleString()}
                                            </span>
                                            <span className="text-xs text-[#64748b]">
                                                Payment Id: {paymentId}
                                            </span>
                                            <span className="text-xs text-[#64748b]">
                                                Order Date: {new Date(createdAt).toDateString()}
                                            </span>

                                        </div>
                                    </div>

                                    <div className="flex flex-col w-full sm:w-1/2">
                                        <Tracker
                                            orderOn={createdAt}
                                            activeStep={
                                                orderStatus === "Delivered"
                                                    ? 3
                                                    : orderStatus === "Out For Delivery"
                                                        ? 2
                                                        : orderStatus === "Shipped"
                                                            ? 1
                                                            : 0
                                            }
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </main>
        </>
    );
};

export default OrderDetails;
