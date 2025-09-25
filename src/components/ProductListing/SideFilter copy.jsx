/* eslint-disable react/prop-types */
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Slider from "@mui/material/Slider";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import StarIcon from "@mui/icons-material/Star";
import { categories } from "../../utils/constants";
import { useState, useRef, useEffect } from "react";

const SideFilter = ({
    price,
    category,
    ratings,
    setPrice,
    setCategory,
    setRatings,
}) => {
    const [categoryToggle, setCategoryToggle] = useState(true);
    const [ratingsToggle, setRatingsToggle] = useState(true);
    const debounceTimeout = useRef(null);

    const priceHandler = (_, newPrice) => {
        if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
        debounceTimeout.current = setTimeout(() => {
            let newVal = [
                Math.round(newPrice[0] / 1000) * 1000,
                Math.round(newPrice[1] / 1000) * 1000,
            ];
            setPrice(newVal);
        }, 100);
    };

    useEffect(() => {
        return () => {
            if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
        };
    }, []);

    const clearFilters = () => {
        setPrice([0, 200000]);
        setCategory("");
        setRatings(0);
    };

    return (
        <div className="hidden sm:flex flex-col w-1/5 px-2">
            <div className="flex flex-col bg-gradient-to-b from-white to-gray-100 rounded-xl shadow-xl border border-gray-200 overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between gap-5 px-4 py-3 border-b border-gray-300 bg-gradient-to-r from-indigo-50 to-indigo-100">
                    <p className="text-lg font-semibold text-indigo-700">Filters</p>
                    <span
                        className="uppercase text-indigo-500 text-xs cursor-pointer font-medium hover:text-indigo-700 transition"
                        onClick={clearFilters}
                    >
                        clear all
                    </span>
                </div>

                <div className="flex flex-col gap-3 py-3 text-sm overflow-hidden">
                    {/* Price Slider */}
                    <div className="flex flex-col gap-2 border-b border-gray-300 px-4 pb-3">
                        <span className="font-medium text-xs text-indigo-600">PRICE</span>
                        <Slider
                            value={price}
                            onChange={priceHandler}
                            valueLabelDisplay="auto"
                            min={0}
                            max={200000}
                            sx={{ color: "#6366f1" }}
                        />
                        <div className="flex gap-3 items-center">
                            <span className="flex-1 min-w-[70px] border px-3 py-1 rounded-md text-gray-700 bg-white shadow-sm">
                                ₹{price[0].toLocaleString()}
                            </span>
                            <span className="font-medium text-gray-400">to</span>
                            <span className="flex-1 min-w-[70px] border px-3 py-1 rounded-md text-gray-700 bg-white shadow-sm">
                                ₹{price[1].toLocaleString()}
                            </span>
                        </div>
                    </div>

                    {/* Category */}
                    <div className="flex flex-col border-b border-gray-300 px-4 pb-3">
                        <div
                            className="flex justify-between cursor-pointer py-2 items-center"
                            onClick={() => setCategoryToggle(!categoryToggle)}
                        >
                            <p className="font-medium text-xs uppercase text-indigo-600">Category</p>
                            {categoryToggle ? (
                                <ExpandLessIcon sx={{ fontSize: 20, color: "#6366f1" }} />
                            ) : (
                                <ExpandMoreIcon sx={{ fontSize: 20, color: "#6366f1" }} />
                            )}
                        </div>
                        {categoryToggle && (
                            <FormControl className="pl-1">
                                <RadioGroup
                                    aria-labelledby="category-radio-buttons-group"
                                    onChange={(e) => setCategory(e.target.value)}
                                    name="category-radio-buttons"
                                    value={category}
                                >
                                    {categories.map((el, i) => (
                                        <FormControlLabel
                                            key={i}
                                            value={el}
                                            control={<Radio size="small" sx={{ color: "#6366f1" }} />}
                                            label={<span className="text-sm text-gray-700">{el}</span>}
                                        />
                                    ))}
                                </RadioGroup>
                            </FormControl>
                        )}
                    </div>

                    {/* Ratings */}
                    <div className="flex flex-col border-b border-gray-300 px-4 pb-3">
                        <div
                            className="flex justify-between cursor-pointer py-2 items-center"
                            onClick={() => setRatingsToggle(!ratingsToggle)}
                        >
                            <p className="font-medium text-xs uppercase text-indigo-600">Ratings</p>
                            {ratingsToggle ? (
                                <ExpandLessIcon sx={{ fontSize: 20, color: "#6366f1" }} />
                            ) : (
                                <ExpandMoreIcon sx={{ fontSize: 20, color: "#6366f1" }} />
                            )}
                        </div>
                        {ratingsToggle && (
                            <FormControl className="pl-1">
                                <RadioGroup
                                    aria-labelledby="ratings-radio-buttons-group"
                                    onChange={(e) => setRatings(e.target.value)}
                                    value={ratings}
                                    name="ratings-radio-buttons"
                                >
                                    {[4, 3, 2, 1].map((el, i) => (
                                        <FormControlLabel
                                            key={i}
                                            value={el}
                                            control={<Radio size="small" sx={{ color: "#6366f1" }} />}
                                            label={
                                                <span className="flex items-center text-sm text-gray-700">
                                                    {el}
                                                    <StarIcon sx={{ fontSize: 12, mx: 0.5, color: "#facc15" }} />
                                                    & above
                                                </span>
                                            }
                                        />
                                    ))}
                                </RadioGroup>
                            </FormControl>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SideFilter;
