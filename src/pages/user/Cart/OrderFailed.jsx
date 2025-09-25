import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import SeoData from "../../../SEO/SeoData";

const OrderFailed = () => {
    const navigate = useNavigate();
    const [time, setTime] = useState(3);

    useEffect(() => {
        if (time === 0) {
            navigate("/cart");
            return;
        }
        const intervalId = setInterval(() => {
            setTime((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [time]);

    return (
        <>
            <SeoData title={`Transaction Failed`} />
            <main className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e0f7fa] via-[#f1faff] to-[#f0f9ff] p-4">
                <div className="flex flex-col gap-4 items-center justify-center w-full max-w-lg mx-auto bg-white border border-[#bae6fd] shadow-2xl rounded-2xl p-8 min-h-[50vh]">
                    <div className="flex gap-4 items-center">
                        <h1 className="text-2xl font-bold text-red-500">
                            Transaction Failed
                        </h1>
                        <ErrorOutlineIcon className="text-red-500" fontSize="large" />
                    </div>
                    <p className="mt-2 text-lg text-[#2563eb] text-center">
                        Redirecting to cart in{" "}
                        <span className="font-semibold text-yellow-500">{time}</span> sec
                    </p>
                    <Link
                        to="/cart"
                        className="bg-gradient-to-r from-red-400 to-[#38bdf8] hover:from-red-500 hover:to-[#0ea5e9] text-white uppercase font-semibold py-2.5 px-8 rounded-lg shadow-lg transition-all text-base tracking-wide mt-2"
                    >
                        Go to Cart
                    </Link>
                </div>
            </main>
        </>
    );
};

export default OrderFailed;
