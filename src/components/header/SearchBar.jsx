import { BsSearch } from "react-icons/bs";
import debounce from "lodash.debounce";
import { useState } from "react";
import axios from "axios";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);

  const handleSearch = async (query) => {
    try {
      const products = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/product/search/${query}`
      );
      setResults(products.data.slice(0, 6));
      setOpen(true);
    } catch (error) {
      console.error("Error searching for products:", error);
    }
  };

  const debouncedSearch = debounce(handleSearch, 300);

  const handleInputChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    debouncedSearch(newQuery);
  };

  return (
    <div
      className="w-full relative flex flex-col items-center"
      onBlur={() =>
        setTimeout(() => {
          setOpen(false);
        }, 500)
      }
    >
      {/* Search Input */}
      <form
        className={`bg-white border border-[#54B1CE] relative w-full rounded-xl shadow-sm
          ${open ? "rounded-b-none" : "rounded-xl"} transition-all`}
      >
        <div className="flex items-center h-[44px]">
          <div className="flex items-center px-3">
            <button type="submit">
              <BsSearch className="text-[#54B1CE] text-lg" />
            </button>
          </div>
          <div className="w-full">
            <input
              type="text"
              placeholder="Search Products, Brands & More"
              autoComplete="off"
              className="bg-transparent w-full border-none outline-none text-[15px] md:text-[17px] p-2 placeholder-[#54B1CE]/70 text-[#1E3A8A] font-medium"
              onChange={handleInputChange}
              value={query}
            />
          </div>
        </div>
      </form>

      {/* Search Results Dropdown */}
      {results.length > 0 && open && (
        <ul className="absolute top-[44px] left-0 right-0 z-50 w-full bg-white border border-[#54B1CE] shadow-lg rounded-b-xl overflow-hidden">
          {results.map((product) => (
            <li key={product?._id}>
              <a
                href={`/product/${product._id}`}
                className="px-5 py-3 hover:bg-[#54B1CE]/20 flex gap-3 items-center transition-colors"
              >
                <img
                  src={product?.images[0]?.url}
                  alt={product?.name}
                  className="w-6 h-6 object-contain rounded border border-[#54B1CE] bg-white"
                />
                <span className="text-[#1E3A8A] font-medium">
                  {product?.name?.length > 40
                    ? `${product?.name.substring(0, 40)}...`
                    : product?.name}
                </span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
