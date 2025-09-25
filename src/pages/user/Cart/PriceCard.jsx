/* eslint-disable react/prop-types */
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";

const PriceCard = ({ cartItems }) => {
    return (
        <div className="flex sticky top-16 sm:h-screen flex-col sm:w-4/12 sm:px-1">
            {/* Card */}
            <div className="z-[0] flex flex-col bg-gradient-to-br from-[#e0f7fa] via-[#f1faff] to-[#f0f9ff] rounded-xl shadow-xl border border-[#bae6fd]">
                <h1 className="px-6 py-3 border-b border-[#bae6fd] font-semibold text-[#2563eb]">
                    PRICE DETAILS
                </h1>
                <div className="flex flex-col gap-4 p-6 pb-3">
                    <p className="flex justify-between text-[#334155]">
                        Price ({cartItems?.length} item)
                        <span>
                            ₹
                            {cartItems
                                .reduce(
                                    (sum, item) =>
                                        sum +
                                        (item.price - item.discountPrice) * item.quantity,
                                    0
                                )
                                .toLocaleString()}
                        </span>
                    </p>
                    <p className="flex justify-between">
                        Discount
                        <span className="text-green-500 font-semibold">
                            - ₹
                            {cartItems
                                .reduce(
                                    (sum, item) =>
                                        sum +
                                        item.discountPrice * item.quantity,
                                    0
                                )
                                .toLocaleString()}
                        </span>
                    </p>
                    <p className="flex justify-between">
                        Delivery Charges
                        <span className="text-green-500 font-semibold">FREE</span>
                    </p>
                    <div className="border border-dashed border-[#bae6fd]"></div>
                    <p className="flex justify-between text-lg font-bold text-[#2563eb]">
                        Total Amount
                        <span>
                            ₹
                            {cartItems
                                .reduce(
                                    (sum, item) =>
                                        sum +
                                        (item.price - item.discountPrice) * item.quantity,
                                    0
                                )
                                .toLocaleString()}
                        </span>
                    </p>
                    <div className="border border-dashed border-[#bae6fd]"></div>
                    <p className="font-medium text-green-500">
                        You will save ₹
                        {cartItems
                            .reduce(
                                (sum, item) =>
                                    sum +
                                    item.discountPrice * item.quantity,
                                0
                            )
                            .toLocaleString()}{" "}
                        on this order
                    </p>
                </div>
            </div>
            <div className="flex gap-3 items-center my-4 p-2 bg-gradient-to-r from-[#e0f7fa] via-[#f1faff] to-[#f0f9ff] rounded-lg border border-[#bae6fd] shadow">
                <VerifiedUserIcon className="text-[#2563eb]" />
                <p className="text-[#64748b] w-full text-[14px] font-[500]">
                    Safe and Secure Payments. Easy returns. 100% Authentic products.
                </p>
            </div>
        </div>
    );
};

export default PriceCard;
