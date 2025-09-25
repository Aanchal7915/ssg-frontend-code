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

const SideFilter = ({ price, category, ratings, setPrice, setCategory, setRatings }) => {
  const [categoryToggle, setCategoryToggle] = useState(true);
  const [ratingsToggle, setRatingsToggle] = useState(true);

  const debounceTimeout = useRef(null);

  const priceHandler = (_, newPrice) => {
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => {
      const newVal = [
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
    <div className="hidden sm:flex flex-col sm:w-64 md:w-72 lg:w-80 px-3">
      <div className="flex flex-col bg-white rounded-xl shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between gap-5 px-4 py-2 border-b">
          <p className="text-lg font-medium text-[#54B1CE]">Filters</p>
          <span
            className="uppercase text-[#54B1CE] text-xs cursor-pointer font-medium"
            onClick={clearFilters}
          >
            clear all
          </span>
        </div>

        <div className="flex flex-col gap-3 py-3 text-sm overflow-y-auto max-h-[80vh]">
          {/* Price Slider */}
          <div className="flex flex-col gap-2 border-b px-4 pb-3">
            <span className="font-medium text-xs text-[#54B1CE]">PRICE</span>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              min={0}
              max={200000}
              sx={{ color: "#54B1CE" }}
            />
            <div className="flex gap-3 items-center mt-1">
              <span className="flex-1 min-w-[70px] border px-3 py-1 rounded-sm text-gray-800 bg-gray-50">
                ₹{price[0].toLocaleString()}
              </span>
              <span className="font-medium text-gray-400">to</span>
              <span className="flex-1 min-w-[70px] border px-3 py-1 rounded-sm text-gray-800 bg-gray-50">
                ₹{price[1].toLocaleString()}
              </span>
            </div>
          </div>

          {/* Category */}
          <div className="flex flex-col border-b px-4 pb-3">
            <div
              className="flex justify-between cursor-pointer py-2 items-center"
              onClick={() => setCategoryToggle(!categoryToggle)}
            >
              <p className="font-medium text-xs uppercase text-[#54B1CE]">Category</p>
              {categoryToggle ? (
                <ExpandLessIcon sx={{ fontSize: "20px", color: "#54B1CE" }} />
              ) : (
                <ExpandMoreIcon sx={{ fontSize: "20px", color: "#54B1CE" }} />
              )}
            </div>
            {categoryToggle && (
              <div className="flex flex-col pb-2">
                <FormControl>
                  <RadioGroup
                    aria-labelledby="category-radio-buttons-group"
                    onChange={(e) => setCategory(e.target.value)}
                    name="category-radio-buttons"
                    value={category}
                  >
                    {categories.map((el, i) => (
                      <FormControlLabel
                        value={el}
                        key={i}
                        control={<Radio size="small" sx={{ color: "#54B1CE" }} />}
                        label={<span className="text-sm">{el}</span>}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </div>
            )}
          </div>

          {/* Ratings */}
          <div className="flex flex-col border-b px-4 pb-3">
            <div
              className="flex justify-between cursor-pointer py-2 items-center"
              onClick={() => setRatingsToggle(!ratingsToggle)}
            >
              <p className="font-medium text-xs uppercase text-[#54B1CE]">Ratings</p>
              {ratingsToggle ? (
                <ExpandLessIcon sx={{ fontSize: "20px", color: "#54B1CE" }} />
              ) : (
                <ExpandMoreIcon sx={{ fontSize: "20px", color: "#54B1CE" }} />
              )}
            </div>
            {ratingsToggle && (
              <div className="flex flex-col pb-2">
                <FormControl>
                  <RadioGroup
                    aria-labelledby="ratings-radio-buttons-group"
                    onChange={(e) => setRatings(e.target.value)}
                    value={ratings}
                    name="ratings-radio-buttons"
                  >
                    {[4, 3, 2, 1].map((el, i) => (
                      <FormControlLabel
                        value={el}
                        key={i}
                        control={<Radio size="small" sx={{ color: "#54B1CE" }} />}
                        label={
                          <span className="flex items-center text-sm">
                            {el}
                            <StarIcon sx={{ fontSize: "12px", mx: 0.5, color: "#facc15" }} />
                            &nbsp;and above
                          </span>
                        }
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideFilter;
