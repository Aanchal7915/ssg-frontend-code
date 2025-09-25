import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";

const MinCategory = () => {
    const [categories, setCategories] = useState([]);
    const scrollRef = useRef(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_SERVER_URL}/api/v1/product/get-category`
                );
                setCategories(res.data.categories || []);
            } catch (err) {
                setCategories([]);
            }
        };
        fetchCategories();
    }, []);

    // Enable horizontal drag/slide for categories
    useEffect(() => {
        const slider = scrollRef.current;
        if (!slider) return;
        let isDown = false;
        let startX;
        let scrollLeft;

        const mouseDown = (e) => {
            isDown = true;
            slider.classList.add("cursor-grabbing");
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        };
        const mouseLeave = () => {
            isDown = false;
            slider.classList.remove("cursor-grabbing");
        };
        const mouseUp = () => {
            isDown = false;
            slider.classList.remove("cursor-grabbing");
        };
        const mouseMove = (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 2;
            slider.scrollLeft = scrollLeft - walk;
        };

        slider.addEventListener("mousedown", mouseDown);
        slider.addEventListener("mouseleave", mouseLeave);
        slider.addEventListener("mouseup", mouseUp);
        slider.addEventListener("mousemove", mouseMove);

        // Touch events for mobile
        let touchStartX = 0;
        let touchScrollLeft = 0;
        let isTouching = false;

        const touchStart = (e) => {
            isTouching = true;
            touchStartX = e.touches[0].pageX - slider.offsetLeft;
            touchScrollLeft = slider.scrollLeft;
        };
        const touchEnd = () => {
            isTouching = false;
        };
        const touchMove = (e) => {
            if (!isTouching) return;
            const x = e.touches[0].pageX - slider.offsetLeft;
            const walk = (x - touchStartX) * 2;
            slider.scrollLeft = touchScrollLeft - walk;
        };

        slider.addEventListener("touchstart", touchStart);
        slider.addEventListener("touchend", touchEnd);
        slider.addEventListener("touchmove", touchMove);

        return () => {
            slider.removeEventListener("mousedown", mouseDown);
            slider.removeEventListener("mouseleave", mouseLeave);
            slider.removeEventListener("mouseup", mouseUp);
            slider.removeEventListener("mousemove", mouseMove);
            slider.removeEventListener("touchstart", touchStart);
            slider.removeEventListener("touchend", touchEnd);
            slider.removeEventListener("touchmove", touchMove);
        };
    }, []);

    return (
        <section className="w-full px-1 sm:px-2 py-1 overflow-x-auto border-b border-[#bae6fd] bg-gradient-to-br from-[#e0f7fa] via-[#f1faff] to-[#f0f9ff] shadow">
            <div
                ref={scrollRef}
                className="flex items-center gap-1 min-w-max overflow-x-auto cursor-grab select-none styled-scrollbar"
                style={{
                    WebkitOverflowScrolling: "touch",
                }}
            >
                {categories.map((cat) => (
                    <Link
                        to={`/products?category=${encodeURIComponent(cat._id)}`}
                        key={cat._id}
                        className="flex items-center gap-0.5 group rounded-lg transition-all duration-150 hover:bg-[#bae6fd] whitespace-nowrap
                            px-2 py-1.5
                            text-[13px] xs:text-sm sm:text-base md:text-base
                            font-semibold
                            text-[#2563eb]
                            hover:text-[#0ea5e9]"
                        style={{
                            minWidth: "max-content",
                        }}
                    >
                        {cat.name}
                        <span className="text-[#38bdf8] group-hover:text-[#0ea5e9] group-hover:rotate-180 transition-all ease-out">
                            <ExpandMoreIcon sx={{ fontSize: "16px" }} />
                        </span>
                    </Link>
                ))}
            </div>
            <style>
                {`
            .styled-scrollbar {
                scrollbar-width: thin;
                scrollbar-color: #38bdf8 #e0f7fa;
            }
            .styled-scrollbar::-webkit-scrollbar {
                height: 6px;
                background: #e0f7fa;
            }
            .styled-scrollbar::-webkit-scrollbar-thumb {
                background: linear-gradient(90deg, #38bdf8 40%, #bae6fd 100%);
                border-radius: 4px;
            }
            .styled-scrollbar::-webkit-scrollbar-thumb:hover {
                background: #0ea5e9;
            }
            .styled-scrollbar::-webkit-scrollbar-corner {
                background: transparent;
            }
            @media (max-width: 640px) {
                .group.rounded-lg {
                    font-size: 12px !important;
                    padding-left: 0.5rem !important;
                    padding-right: 0.5rem !important;
                    padding-top: 0.4rem !important;
                    padding-bottom: 0.4rem !important;
                }
            }
            `}
            </style>
        </section>
    );
};

export default MinCategory;
