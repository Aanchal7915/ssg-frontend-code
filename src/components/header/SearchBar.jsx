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
                `${
                    import.meta.env.VITE_SERVER_URL
                }/api/v1/product/search/${query}`
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
            <form
                action="/search"
                method=""
                className={`bg-gradient-to-br from-[#e0f7fa] via-[#e6e9f2] to-[#b6e0f7] border border-[#54B1CE] relative w-full rounded-xl shadow-xl
                    ${open ? "rounded-b-none" : "rounded-xl"}`}
            >
                <div className="flex items-center h-[44px]">
                    <div className="flex items-center px-3">
                        <button type="submit">
                            <figure className="text-[#54B1CE] bg-transparent">
                                <BsSearch />
                            </figure>
                        </button>
                    </div>
                    <div className="w-full">
                        <input
                            type="text"
                            title="Search for Products, Brands and More"
                            placeholder="Search for Products, Brands and More"
                            autoComplete="off"
                            className="bg-transparent w-full border-none outline-none text-[15px] md:text-[17px] p-2 placeholder-[#54B1CE] text-[#0ea5e9] font-semibold"
                            onChange={handleInputChange}
                            value={query}
                        />
                    </div>
                </div>
            </form>
            {results.length > 0 && open && (
                <ul className="absolute top-[44px] left-0 right-0 pb-2 z-50 w-full bg-gradient-to-br from-[#e0f7fa] via-[#e6e9f2] to-[#b6e0f7] border border-[#54B1CE] shadow-2xl rounded-b-xl">
                    {results.map((product) => (
                        <li key={product?._id}>
                            <a
                                href={`/product/${product._id}`}
                                className="px-5 py-4 h-[50px] hover:bg-[#54B1CE]/20 flex gap-5 items-center rounded transition"
                            >
                                <img
                                    src={product?.images[0]?.url}
                                    alt="product"
                                    className="w-6 h-6 object-contain rounded bg-white border border-[#54B1CE]"
                                />
                                <span className="text-[#0ea5e9] font-semibold">
                                    {product?.name?.length > 40
                                        ? `${product?.name?.substring(
                                              0,
                                              40
                                          )}...`
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
