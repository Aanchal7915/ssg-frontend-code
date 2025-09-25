import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import MinCategory from "../../components/MinCategory";
import axios from "axios";
import Tracker from "./../user/Orders/Tracker";
import Spinner from "../../components/Spinner";
import { useAuth } from "../../context/auth";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import SeoData from "../../SEO/SeoData";

const UpdateOrders = () => {
    const params = useParams();
    const orderId = params.id;

    const [loading, setLoading] = useState(false);
    const [UpdateOrders, setUpdateOrders] = useState([]);
    const [status, setStatus] = useState("");
    const [trackingLink, setTrackingLink] = useState(""); // NEW
    const { auth } = useAuth();
    const [reload, setReload] = useState(false);
    const [editTracking, setEditTracking] = useState(false);

    useEffect(() => {
        // fetch order detail from server
        const fetchOrders = async () => {
            try {
                setLoading(true);
                const response = await axios.get(
                    `${
                        import.meta.env.VITE_SERVER_URL
                    }/api/v1/user/admin-order-detail?orderId=${orderId}`,
                    {
                        headers: {
                            Authorization: auth?.token,
                        },
                    }
                );
                if (response?.data?.orderDetails) {
                    setUpdateOrders(...response.data.orderDetails);
                    setTrackingLink(response.data.orderDetails[0]?.trackLink || ""); // NEW
                    setLoading(false);
                }
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };
        fetchOrders();
    }, [auth?.token, orderId, reload]);

    const amount = UpdateOrders?.amount;
    const orderItems = UpdateOrders?.products;
    const buyer = UpdateOrders?.buyer;
    const paymentId = UpdateOrders?.paymentId;
    const shippingInfo = UpdateOrders?.shippingInfo;
    const createdAt = UpdateOrders?.createdAt;
    const orderStatus = UpdateOrders?.orderStatus;

    const updateOrderSubmitHandler = async (e) => {
        try {
            e.preventDefault();
            const res = await axios.patch(
                `${
                    import.meta.env.VITE_SERVER_URL
                }/api/v1/user/update/order-status`,
                { status, orderId },
                {
                    headers: { Authorization: auth?.token },
                }
            );
            if (res.status === 200) {
                setReload((prev) => !prev);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const updateTrackingLinkHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.patch(
                `${import.meta.env.VITE_SERVER_URL}/api/v1/user/update/track-link`,
                { orderId, trackingLink },
                {
                    headers: { Authorization: auth?.token },
                }
            );
            if (res.status === 200) {
                setEditTracking(false); // Reset to initial state after update
                setReload((prev) => !prev);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <SeoData title="Order Details | Flipkart" />

            <MinCategory />
            <main className="w-full p-2 py-2 sm:py-8 bg-gradient-to-br from-[#e0f7fa] via-[#f1faff] to-[#f0f9ff] min-h-screen text-[#334155]">
                {loading ? (
                    <Spinner />
                ) : (
                    <>
                        <div className="flex flex-col gap-4 max-w-6xl mx-auto">
                            <div className="flex flex-col sm:flex-row bg-gradient-to-br from-[#e0f7fa]/90 via-[#f1faff]/90 to-[#f0f9ff]/90 shadow-2xl rounded-2xl min-w-full border border-[#38bdf8]">
                                <div className="sm:w-1/2 border-r border-[#bae6fd]">
                                    <div className="flex flex-col gap-3 my-8 mx-10">
                                        <h3 className="text-md font-semibold text-[#0ea5e9]">
                                            Delivery Address
                                        </h3>
                                        <h4 className="font-semibold text-[#2563eb]">
                                            {buyer?.name}
                                        </h4>
                                        <p className="text-sm text-[#334155]">{`${shippingInfo?.address}, ${shippingInfo?.city}, ${shippingInfo?.state} - ${shippingInfo?.pincode}`}</p>
                                        <div className="flex gap-2 text-sm">
                                            <p className="font-semibold text-[#0ea5e9]">Email</p>
                                            <p className="text-[#334155]">{buyer?.email}</p>
                                        </div>
                                        <div className="flex gap-2 text-sm">
                                            <p className="font-semibold text-[#0ea5e9]">
                                                Phone Number
                                            </p>
                                            <p className="text-[#334155]">{shippingInfo?.phoneNo}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full sm:w-1/2">
                                    <div className="flex flex-col gap-5 my-8 mx-10">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-md font-semibold text-[#0ea5e9]">
                                                Update Status
                                            </h3>
                                            <Link
                                                to="/admin/orders"
                                                className="ml-1 flex items-center gap-0 font-medium text-[#2563eb] uppercase hover:underline"
                                            >
                                                <ArrowBackIosIcon
                                                    sx={{ fontSize: "14px" }}
                                                />
                                                <span className="text-[12px]">
                                                    Go Back
                                                </span>
                                            </Link>
                                        </div>
                                        <div>
                                            <form
                                                onSubmit={updateOrderSubmitHandler}
                                                className="flex flex-col gap-3 items-start justify-between"
                                            >
                                                <div className="flex gap-2">
                                                    <p className="text-sm font-semibold text-[#0ea5e9]">
                                                        Current Status:
                                                    </p>
                                                    <p className="text-sm text-[#334155]">
                                                        {orderStatus}
                                                    </p>
                                                </div>
                                                <FormControl
                                                    fullWidth
                                                    sx={{ marginTop: 1 }}
                                                >
                                                    <InputLabel id="order-status-select-label" sx={{ color: "#0ea5e9" }}>
                                                        Status
                                                    </InputLabel>
                                                    <Select
                                                        labelId="order-status-select-label"
                                                        id="order-status-select"
                                                        value={status}
                                                        label="Status"
                                                        onChange={(e) =>
                                                            setStatus(
                                                                e.target.value
                                                            )
                                                        }
                                                        className="w-[50%] text-[#2563eb]"
                                                        sx={{
                                                            color: "#334155",
                                                            background: "#f0f9ff",
                                                            borderRadius: 2,
                                                            fontWeight: 500,
                                                        }}
                                                    >
                                                        <MenuItem value={"Shipped"}>
                                                            Shipped
                                                        </MenuItem>
                                                        <MenuItem value={"Out For Delivery"}>
                                                            Out For Delivery
                                                        </MenuItem>
                                                        <MenuItem value={"Delivered"}>
                                                            Delivered
                                                        </MenuItem>
                                                    </Select>
                                                </FormControl>
                                                <button
                                                    type="submit"
                                                    className="bg-gradient-to-r from-[#38bdf8] to-[#0ea5e9] border-2 border-[#bae6fd] hover:from-[#0ea5e9] hover:to-[#38bdf8] px-4 py-2 text-[14px] text-white font-semibold rounded-lg shadow hover:shadow-lg transition-all duration-300"
                                                >
                                                    Update
                                                </button>
                                            </form>
                                        </div>
                                        {/* Tracking Link Update */}
                                        <div className="w-full mt-2">
                                            <form
                                                onSubmit={updateTrackingLinkHandler}
                                                className="flex flex-col gap-2"
                                            >
                                                <label className="text-sm font-semibold text-[#0ea5e9]">
                                                    Tracking Link
                                                </label>
                                                <div className="flex items-center gap-2">
                                                    <input
                                                        type="text"
                                                        value={trackingLink}
                                                        onChange={(e) => setTrackingLink(e.target.value)}
                                                        placeholder="Enter tracking link"
                                                        className="w-full px-3 py-2 rounded-lg border border-[#bae6fd] bg-[#f0f9ff] text-[#334155] focus:outline-none focus:ring-2 focus:ring-[#38bdf8] transition"
                                                        disabled={!editTracking}
                                                    />
                                                    {!editTracking ? (
                                                        trackingLink ? (
                                                            <button
                                                                type="button"
                                                                className="bg-[#e0f7fa] border border-[#38bdf8] text-[#0ea5e9] px-3 py-1 rounded-lg font-semibold shadow-sm hover:bg-[#bae6fd] transition"
                                                                onClick={() => setEditTracking(true)}
                                                            >
                                                                Edit
                                                            </button>
                                                        ) : (
                                                            <button
                                                                type="button"
                                                                className="bg-gradient-to-r from-[#38bdf8] to-[#0ea5e9] text-white px-3 py-1 rounded-lg font-semibold shadow-sm hover:from-[#0ea5e9] hover:to-[#38bdf8] transition"
                                                                onClick={() => setEditTracking(true)}
                                                            >
                                                                Add
                                                            </button>
                                                        )
                                                    ) : null}
                                                    {editTracking && (
                                                        <button
                                                            type="submit"
                                                            className="bg-gradient-to-r from-[#38bdf8] to-[#0ea5e9] border border-[#bae6fd] hover:from-[#0ea5e9] hover:to-[#38bdf8] px-4 py-1 text-[14px] text-white font-semibold rounded-lg shadow transition-all duration-300"
                                                        >
                                                            Update Tracking Link
                                                        </button>
                                                    )}
                                                </div>
                                                {trackingLink && !editTracking && (
                                                    <a
                                                        href={trackingLink}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-[#2563eb] underline text-sm mt-1 hover:text-[#0ea5e9] transition"
                                                    >
                                                        {trackingLink}
                                                    </a>
                                                )}
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {orderItems?.map((item) => {
                                const {
                                    _id,
                                    image,
                                    name,
                                    discountPrice,
                                    price,
                                    quantity,
                                    seller,
                                } = item;

                                return (
                                    <div
                                        className="flex flex-col sm:flex-row min-w-full shadow rounded-2xl bg-gradient-to-br from-[#e0f7fa]/80 via-[#f1faff]/80 to-[#f0f9ff]/80 px-2 py-5 border border-[#38bdf8]"
                                        key={_id}
                                    >
                                        <div className="flex flex-col sm:flex-row sm:w-1/2 gap-2">
                                            <div className="w-full sm:w-32 h-20">
                                                <img
                                                    draggable="false"
                                                    className="h-full w-full object-contain rounded"
                                                    src={image}
                                                    alt={name}
                                                />
                                            </div>
                                            <div className="flex flex-col gap-1 overflow-hidden">
                                                <p className="text-sm text-[#2563eb] font-semibold">
                                                    {name.length > 60
                                                        ? `${name.substring(
                                                              0,
                                                              60
                                                          )}...`
                                                        : name}
                                                </p>
                                                <p className="text-xs text-[#0ea5e9] mt-2">
                                                    Quantity: {quantity}
                                                </p>
                                                <p className="text-xs text-[#0ea5e9]">
                                                    Seller: {seller?.name}
                                                </p>
                                                <span className="font-semibold text-[#0ea5e9]">
                                                    ₹
                                                    {(
                                                        quantity * (price-discountPrice)
                                                    ).toLocaleString()}
                                                </span>
                                                <span className="text-xs text-[#0ea5e9]">
                                                    Payment Id: {paymentId}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex flex-col w-full sm:w-1/2">
                                            <Tracker
                                                orderOn={createdAt}
                                                activeStep={
                                                    orderStatus === "Delivered"
                                                        ? 3
                                                        : orderStatus ===
                                                          "Out For Delivery"
                                                        ? 2
                                                        : orderStatus ===
                                                          "Shipped"
                                                        ? 1
                                                        : 0
                                                }
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </>
                )}
            </main>
        </>
    );
};

export default UpdateOrders;
