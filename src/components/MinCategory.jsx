import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";

const categories = [
    "Electronics",
    "TVs & Appliances",
    "Men",
    "Women",
    "Baby & Kids",
    "Home & Furniture",
    "Sports, Books & More",
    "Flights",
    "Offer Zone",
    "Grocery",
];

const MinCategory = () => {
    return (
        <section className="hidden sm:block w-full px-2 sm:p-0 overflow-hidden border-b border-gray-800 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 shadow">
            <div
                className="flex items-center gap-1 p-0.5 overflow-x-auto scrollbar-hide"
                style={{
                    WebkitOverflowScrolling: "touch",
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                }}
            >
                {categories.map((el, i) => (
                    <Link
                        to={`/products?category=${el}`}
                        key={i}
                        className="text-xs sm:text-sm px-2 py-2 text-indigo-200 font-semibold hover:text-yellow-300 flex items-center gap-0.5 group rounded-lg transition-all duration-150 hover:bg-gray-800/60 whitespace-nowrap"
                    >
                        {el}
                        <span className="text-indigo-400 group-hover:text-yellow-300 group-hover:rotate-180 transition-all ease-out">
                            <ExpandMoreIcon sx={{ fontSize: "16px" }} />
                        </span>
                    </Link>
                ))}
            </div>
            <style>
                {`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                `}
            </style>
        </section>
    );
};

export default MinCategory;
