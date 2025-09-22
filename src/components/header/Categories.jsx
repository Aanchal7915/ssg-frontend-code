import mobiles from "../../assets/images/Categories/phone.png";
import fashion from "../../assets/images/Categories/fashion.png";
import electronics from "../../assets/images/Categories/electronics.png";
import home from "../../assets/images/Categories/home.png";
import travel from "../../assets/images/Categories/travel.png";
import appliances from "../../assets/images/Categories/appliances.png";
import furniture from "../../assets/images/Categories/furniture.png";
import beauty from "../../assets/images/Categories/beauty.png";
import grocery from "../../assets/images/Categories/grocery.png";
import { Link } from "react-router-dom";

const catNav = [
    {
        name: "Mobiles",
        icon: mobiles,
    },
    {
        name: "Fashion",
        icon: fashion,
    },
    {
        name: "Electronics",
        icon: electronics,
    },
    {
        name: "Home",
        icon: home,
    },
    {
        name: "Travel",
        icon: travel,
    },
    {
        name: "Appliances",
        icon: appliances,
    },
    {
        name: "Furniture",
        icon: furniture,
    },
    {
        name: "Beauty,Toys & more",
        icon: beauty,
    },
    {
        name: "Grocery",
        icon: grocery,
    },
];

const Categories = () => {
    return (
        <section className="hidden sm:block bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 border-b border-gray-800 px-12 py-2 shadow-lg min-w-full overflow-hidden">
            <div className="flex items-center justify-between group">
                {catNav.map((item, i) => (
                    <Link
                        to={`/products?category=${item.name}`}
                        className="flex flex-col gap-1 items-center p-2 rounded-lg hover:bg-gray-800/70 transition group"
                        key={i}
                    >
                        <div className="h-16 w-16 flex items-center justify-center rounded-full bg-gray-900 border border-gray-700 shadow group-hover:scale-105 transition-transform duration-200">
                            <img
                                draggable="false"
                                className="h-12 w-12 object-contain"
                                src={item.icon}
                                alt={item.name}
                            />
                        </div>
                        <span className="text-sm text-indigo-200 font-medium group-hover:text-indigo-400 transition">
                            {item.name}
                        </span>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default Categories;
