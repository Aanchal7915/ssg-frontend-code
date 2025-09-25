import { Step, StepLabel, Stepper } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import { formatDate } from "../../../utils/functions";

/**
 * @param {number} activeStep
 * @param {string} orderOn
 * @param {boolean} isCancelled - If true, show cancellation flow
 * @param {string} cancelReason - Optional, show reason if cancelled
 * @param {boolean} isRefunded - If true, show refund step
 * @param {boolean} isReturned - If true, show return/replacement branch
 * @param {string} returnReason - Optional, show reason if returned/replaced
 */
const Tracker = ({
    activeStep,
    orderOn,
    isCancelled = false,
    cancelReason = "",
    isRefunded = false,
    isReturned = false,
    returnReason = "",
}) => {
    // Base steps
    let steps = [
        {
            status: "Ordered",
            dt: formatDate(orderOn),
        },
        {
            status: "Shipped",
        },
        {
            status: "Out For Delivery",
        },
        {
            status: "Delivered",
        },
    ];

    // Cancellation branch
    if (isCancelled) {
        steps = steps.slice(0, activeStep + 1).concat([
            {
                status: "Cancelled",
                reason: cancelReason,
            },
        ]);
        if (isRefunded) {
            steps.push({
                status: "Refunded",
            });
        }
    }
    // Return/Replacement branch
    else if (isReturned) {
        steps = steps.concat([
            {
                status: "Return/Replacement Requested",
                reason: returnReason,
            },
            {
                status: "Return/Replacement Completed",
            },
        ]);
        if (isRefunded) {
            steps.push({
                status: "Refunded",
            });
        }
    }

    const completedIcon = (
        <span className="text-green-400 animate-pulse">
            <CircleIcon sx={{ fontSize: "16px" }} />
        </span>
    );
    const pendingIcon = (
        <span className="text-gray-400">
            <CircleIcon sx={{ fontSize: "16px" }} />
        </span>
    );
    const cancelledIcon = (
        <span className="text-red-400 animate-pulse">
            <CircleIcon sx={{ fontSize: "16px" }} />
        </span>
    );
    const refundedIcon = (
        <span className="text-blue-400 animate-pulse">
            <CircleIcon sx={{ fontSize: "16px" }} />
        </span>
    );
    const returnedIcon = (
        <span className="text-yellow-400 animate-pulse">
            <CircleIcon sx={{ fontSize: "16px" }} />
        </span>
    );

    return (
        <div className="w-full px-2 py-6 bg-gradient-to-br from-[#e0f7fa]/80 via-[#f1faff]/80 to-[#f0f9ff]/80 rounded-xl shadow border border-[#bae6fd]">
            <Stepper
                activeStep={
                    isCancelled
                        ? steps.length - 1
                        : isReturned
                        ? steps.length - 1
                        : activeStep
                }
                alternativeLabel
            >
                {steps.map((item, index) => {
                    let icon = pendingIcon;
                    let labelColor = "text-gray-400";
                    if (item.status === "Cancelled") {
                        icon = cancelledIcon;
                        labelColor = "text-red-400";
                    } else if (item.status === "Refunded") {
                        icon = refundedIcon;
                        labelColor = "text-blue-400";
                    } else if (
                        item.status === "Return/Replacement Requested" ||
                        item.status === "Return/Replacement Completed"
                    ) {
                        icon = returnedIcon;
                        labelColor = "text-yellow-500";
                    } else if (
                        index <=
                        (isCancelled || isReturned
                            ? steps.length - 2
                            : activeStep)
                    ) {
                        icon = completedIcon;
                        labelColor = "text-green-400";
                    }
                    return (
                        <Step
                            key={index}
                            active={
                                isCancelled || isReturned
                                    ? index === steps.length - 1
                                    : activeStep === index
                            }
                            completed={
                                index <
                                (isCancelled || isReturned
                                    ? steps.length - 1
                                    : activeStep)
                            }
                        >
                            <StepLabel icon={icon}>
                                <span className={`${labelColor} font-medium`}>
                                    {item.status}
                                </span>
                                {item.dt && (
                                    <span className="block text-xs text-[#2563eb] mt-1">
                                        {item.dt}
                                    </span>
                                )}
                                {item.status === "Cancelled" && item.reason && (
                                    <span className="block text-xs text-[#f87171] mt-1">
                                        Reason: {item.reason}
                                    </span>
                                )}
                                {item.status === "Return/Replacement Requested" &&
                                    item.reason && (
                                        <span className="block text-xs text-yellow-600 mt-1">
                                            Reason: {item.reason}
                                        </span>
                                    )}
                            </StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
        </div>
    );
};

export default Tracker;
