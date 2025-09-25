
/* eslint-disable react/jsx-key */
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import MenuItem from "@mui/material/MenuItem";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, useParams, Link } from "react-router-dom";
import ImageIcon from "@mui/icons-material/Image";
import Spinner from "../../components/Spinner";
import axios from "axios";
import FormData from "form-data";
import { useAuth } from "../../context/auth";
import ScrollToTopOnRouteChange from "../../utils/ScrollToTopOnRouteChange";
import SeoData from "../../SEO/SeoData";
import "react-toastify/dist/ReactToastify.css";

const EditProduct = () => {
    const { auth } = useAuth();
    const navigate = useNavigate();
    const { productId } = useParams();
    const [loading, setLoading] = useState(true);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [discountPrice, setDiscountPrice] = useState("");
    const [stock, setStock] = useState("");
    const [warranty, setWarranty] = useState("");
    const [brand, setBrand] = useState("");
    const [highlights, setHighlights] = useState([]);
    const [highlightInput, setHighlightInput] = useState("");
    const [specs, setSpecs] = useState([]);
    const [specsInput, setSpecsInput] = useState({ title: "", description: "" });
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
    const [oldImages, setOldImages] = useState([]);
    const [removedImages, setRemovedImages] = useState([]);
    const [logo, setLogo] = useState(null);
    const [logoPreview, setLogoPreview] = useState("");
    const [oldLogo, setOldLogo] = useState(null);

    const [categoryList, setCategoryList] = useState([]);
    const [category, setCategory] = useState("");
    const [subcategory, setSubcategory] = useState("");
    const [subcategoryList, setSubcategoryList] = useState([]);

    const [isSubmit, setIsSubmit] = useState(false);

    const MAX_IMAGE_SIZE = 500 * 1024;
    const MAX_IMAGES_COUNT = 4;

    const handleSpecsChange = (e) => {
        setSpecsInput({ ...specsInput, [e.target.name]: e.target.value });
    };

    const addSpecs = () => {
        if (!specsInput.title.trim() && !specsInput.description.trim()) return;
        setSpecs([...specs, specsInput]);
        setSpecsInput({ title: "", description: "" });
    };

    const addHighlight = () => {
        if (!highlightInput?.trim()) return;
        setHighlights([...highlights, highlightInput]);
        setHighlightInput("");
    };

    const deleteHighlight = (index) => {
        setHighlights(highlights.filter((h, i) => i !== index));
    };

    const deleteSpec = (index) => {
        setSpecs(specs.filter((s, i) => i !== index));
    };

    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        if (file.size > MAX_IMAGE_SIZE) {
            toast.warning("Logo image size exceeds 500 KB!", { toastClassName: "custom-toast" });
            return;
        }
        if (oldLogo) {
            setRemovedImages((prev) => [...prev, oldLogo.public_id]);
        }
        setOldLogo(null);
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setLogoPreview(reader.result);
                setLogo(reader.result);
            }
        };
        reader.readAsDataURL(file);
    };

    const handleProductImageChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > MAX_IMAGES_COUNT) {
            toast.warning("You can only upload up to 4 images", { toastClassName: "custom-toast" });
            return;
        }
        files.forEach((file) => {
            if (file.size > MAX_IMAGE_SIZE) {
                toast.warning("One of the product images exceeds 500 KB", { toastClassName: "custom-toast" });
                return;
            }
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((old) => [...old, reader.result]);
                    setImages((old) => [...old, reader.result]);
                }
            };
            reader.readAsDataURL(file);
        });
    };

    const newProductUpdateHandler = async (e) => {
        e.preventDefault();
        setIsSubmit(true);
        const validationErrors = [];
        if (specs.length <= 1) {
            validationErrors.push("Please Add Minimum 2 Specifications");
        }
        if (oldImages.length <= 0 && images.length <= 0) {
            validationErrors.push("Please Add Atleast 1 Product Image");
        }
        if (!category) {
            validationErrors.push("Please select a category");
        }
        if (!subcategory) {
            validationErrors.push("Please select a subcategory");
        }
        if (validationErrors.length > 0) {
            validationErrors.forEach((error) => toast.warning(error, { toastClassName: "custom-toast" }));
            setIsSubmit(false);
            return;
        }
        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("description", description);
            formData.append("price", price);
            formData.append("discountPrice", discountPrice);
            formData.append("category", category);
            formData.append("subcategory", subcategory);
            formData.append("stock", stock);
            formData.append("warranty", warranty);
            formData.append("brandName", brand);
            formData.append("logo", logo);
            formData.append("oldLogo", JSON.stringify(oldLogo));
            images.forEach((image) => {
                formData.append("images", image);
            });
            highlights.forEach((h) => {
                formData.append("highlights", h);
            });
            specs.forEach((s) => {
                formData.append("specifications", JSON.stringify(s));
            });
            formData.append("oldImages", JSON.stringify(oldImages));
            removedImages.forEach((image) => {
                formData.append("removedImages", image);
            });
            const response = await axios.patch(
                `${import.meta.env.VITE_SERVER_URL}/api/v1/product/update/${productId}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: auth?.token,
                    },
                }
            );
            response.status === 201 &&
                toast.success("Product Updated Successfully!", { toastClassName: "custom-toast" });
            navigate("/admin/dashboard/all-products");
        } catch (error) {
            console.error("Error:", error);
            setIsSubmit(false);
            error.response.status === 500 &&
                toast.error("Something went wrong! Please try after sometime.", { toastClassName: "custom-toast" });
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_SERVER_URL}/api/v1/product/${productId}`
                );
                setName(res.data.product.name);
                setDescription(res.data.product.description);
                setPrice(res.data.product.price);
                setDiscountPrice(res.data.product.discountPrice);
                setCategory(res.data.product.category?._id || "");
                setSubcategory(res.data.product.subcategory?._id || "");
                setStock(res.data.product.stock);
                setWarranty(res.data.product.warranty);
                setBrand(res.data.product.brand.name);
                setHighlights(res.data.product.highlights || []);
                setSpecs(res.data.product.specifications || []);
                setOldLogo({
                    url: res.data.product.brand.logo.url,
                    public_id: res.data.product.brand.logo.public_id,
                });
                res.data.product.images.forEach((image) => {
                    setOldImages((prevImages) => [
                        ...prevImages,
                        { url: image.url, public_id: image.public_id },
                    ]);
                });
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                error.response?.status === 500 &&
                    toast.error("Something went wrong! Please try again later.", { toastClassName: "custom-toast" });
            }
        };
        fetchData();
    }, [productId]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_SERVER_URL}/api/v1/product/get-category`
                );
                setCategoryList(res.data.categories || []);
            } catch (err) {
                setCategoryList([]);
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        const selected = categoryList.find((cat) => cat._id === category);
        setSubcategoryList(selected?.subcategories || []);
        setSubcategory("");
    }, [category, categoryList]);

    const menuProps = {
        PaperProps: {
            sx: {
                bgcolor: "#FFFFFF",
                color: "#333333",
                "& .MuiMenuItem-root": {
                    "&.Mui-selected": {
                        bgcolor: "#54B1CE",
                        color: "#FFFFFF",
                    },
                    "&:hover": {
                        bgcolor: "#3A8AA3",
                        color: "#FFFFFF",
                    },
                },
            },
        },
    };

    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <SeoData title="New/Update Product | Flipkart" />
            <ScrollToTopOnRouteChange />
            {isSubmit || loading ? (
                <div className="relative h-full">
                    <Spinner />
                </div>
            ) : (
                <form
                    onSubmit={newProductUpdateHandler}
                    encType="multipart/form-data"
                    className="w-full bg-[#FFFFFF] rounded-lg shadow-xl p-4 border border-[#54B1CE] text-[#333333] overflow-x-auto min-w-[600px]"
                    id="mainForm"
                >
                    <div className="flex flex-col flex-1 gap-3 m-2">
                        <TextField
                            label="Name"
                            variant="outlined"
                            size="small"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            InputProps={{
                                style: {
                                    color: "#333333",
                                    background: "#F5F7FA",
                                    borderRadius: 6,
                                    borderColor: "#54B1CE",
                                },
                            }}
                            InputLabelProps={{
                                style: { color: "#54B1CE" },
                            }}
                        />
                        <TextField
                            label="Description"
                            multiline
                            rows={2}
                            required
                            variant="outlined"
                            size="small"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            InputProps={{
                                style: {
                                    color: "#333333",
                                    background: "#F5F7FA",
                                    borderRadius: 6,
                                    borderColor: "#54B1CE",
                                },
                            }}
                            InputLabelProps={{
                                style: { color: "#54B1CE" },
                            }}
                        />
                        <div className="flex gap-2 justify-between">
                            <TextField
                                label="Price"
                                type="number"
                                variant="outlined"
                                size="small"
                                InputProps={{
                                    inputProps: { min: 0 },
                                    style: {
                                        color: "#333333",
                                        background: "#F5F7FA",
                                        borderRadius: 6,
                                        borderColor: "#54B1CE",
                                    },
                                }}
                                required
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                InputLabelProps={{
                                    style: { color: "#54B1CE" },
                                }}
                            />
                            <TextField
                                label="Discount Price"
                                type="number"
                                variant="outlined"
                                size="small"
                                InputProps={{
                                    inputProps: { min: 0 },
                                    style: {
                                        color: "#333333",
                                        background: "#F5F7FA",
                                        borderRadius: 6,
                                        borderColor: "#54B1CE",
                                    },
                                }}
                                required
                                value={discountPrice}
                                onChange={(e) => setDiscountPrice(e.target.value)}
                                InputLabelProps={{
                                    style: { color: "#54B1CE" },
                                }}
                            />
                        </div>
                        <div className="flex justify-between gap-4">
                            <TextField
                                label="Category"
                                select
                                fullWidth
                                variant="outlined"
                                size="small"
                                required
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                SelectProps={{ MenuProps: menuProps }}
                                InputProps={{
                                    style: {
                                        color: "#333333",
                                        background: "#F5F7FA",
                                        borderRadius: 6,
                                        borderColor: "#54B1CE",
                                    },
                                }}
                                InputLabelProps={{
                                    style: { color: "#54B1CE" },
                                }}
                            >
                                {categoryList.map((cat) => (
                                    <MenuItem value={cat._id} key={cat._id}>
                                        {cat.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                label="Subcategory"
                                select
                                fullWidth
                                variant="outlined"
                                size="small"
                                required
                                value={subcategory}
                                onChange={(e) => setSubcategory(e.target.value)}
                                SelectProps={{ MenuProps: menuProps }}
                                InputProps={{
                                    style: {
                                        color: "#333333",
                                        background: "#F5F7FA",
                                        borderRadius: 6,
                                        borderColor: "#54B1CE",
                                    },
                                }}
                                InputLabelProps={{
                                    style: { color: "#54B1CE" },
                                }}
                                disabled={!category}
                            >
                                {subcategoryList.map((sub) => (
                                    <MenuItem value={sub._id} key={sub._id}>
                                        {sub.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                label="Stock"
                                type="number"
                                variant="outlined"
                                size="small"
                                InputProps={{
                                    inputProps: { min: 0 },
                                    style: {
                                        color: "#333333",
                                        background: "#F5F7FA",
                                        borderRadius: 6,
                                        borderColor: "#54B1CE",
                                    },
                                }}
                                required
                                value={stock}
                                onChange={(e) => setStock(e.target.value)}
                                InputLabelProps={{
                                    style: { color: "#54B1CE" },
                                }}
                            />
                            <TextField
                                label="Warranty"
                                type="number"
                                variant="outlined"
                                size="small"
                                InputProps={{
                                    inputProps: { min: 0 },
                                    style: {
                                        color: "#333333",
                                        background: "#F5F7FA",
                                        borderRadius: 6,
                                        borderColor: "#54B1CE",
                                    },
                                }}
                                required
                                value={warranty}
                                onChange={(e) => setWarranty(e.target.value)}
                                InputLabelProps={{
                                    style: { color: "#54B1CE" },
                                }}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between items-center border border-[#54B1CE] rounded bg-[#FFFFFF]">
                                <input
                                    value={highlightInput}
                                    onChange={(e) => setHighlightInput(e.target.value)}
                                    type="text"
                                    placeholder="Highlight"
                                    className="px-2 flex-1 outline-none border-none bg-transparent text-[#333333]"
                                />
                                <span
                                    onClick={() => addHighlight()}
                                    className="py-2 px-6 bg-[#54B1CE] text-[#FFFFFF] rounded-r hover:bg-[#3A8AA3] cursor-pointer transition-all duration-200"
                                >
                                    Add
                                </span>
                            </div>
                            <div className="flex flex-col gap-1.5">
                                {highlights?.map((h, i) => (
                                    <div
                                        key={i}
                                        className="flex justify-between rounded items-center py-1 px-2 bg-[#F5F7FA] border border-[#54B1CE]"
                                    >
                                        <p className="text-[#333333] text-sm font-medium">
                                            {h}
                                        </p>
                                        <span
                                            onClick={() => deleteHighlight(i)}
                                            className="text-red-400 hover:bg-red-100 p-1 rounded-full cursor-pointer transition-all duration-200"
                                        >
                                            <DeleteIcon />
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <h2 className="font-medium text-[#54B1CE]">Brand Details</h2>
                        <div className="flex flex-col sm:flex-row justify-between gap-4 items-start">
                            <TextField
                                label="Brand"
                                type="text"
                                variant="outlined"
                                size="small"
                                required
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                                InputProps={{
                                    style: {
                                        color: "#333333",
                                        background: "#F5F7FA",
                                        borderRadius: 6,
                                        borderColor: "#54B1CE",
                                    },
                                }}
                                InputLabelProps={{
                                    style: { color: "#54B1CE" },
                                }}
                            />
                            <div className="w-24 h-10 flex items-center justify-center border border-[#54B1CE] rounded-lg relative bg-[#FFFFFF]">
                                {oldLogo ? (
                                    <img
                                        draggable="false"
                                        src={oldLogo.url}
                                        alt="Brand Logo"
                                        className="w-full h-full object-contain"
                                    />
                                ) : !logoPreview ? (
                                    <ImageIcon className="text-[#54B1CE]" />
                                ) : (
                                    <img
                                        draggable="false"
                                        src={logoPreview}
                                        alt="Brand Logo"
                                        className="w-full h-full object-contain"
                                    />
                                )}
                                <span className="text-red-400 absolute -top-1 -right-[90px]">
                                    *
                                    <span className="text-[10px] text-[#333333]">
                                        (max 500KB)
                                    </span>
                                </span>
                            </div>
                            <label className="rounded bg-[#54B1CE] text-center cursor-pointer text-[#FFFFFF] py-2 px-2.5 shadow hover:bg-[#3A8AA3] transition-all duration-200">
                                <input
                                    type="file"
                                    name="logo"
                                    accept="image/*"
                                    onChange={handleLogoChange}
                                    className="hidden"
                                />
                                Choose Logo
                            </label>
                        </div>
                        <h2 className="font-medium text-[#54B1CE]">
                            Specifications{" "}
                            <span className="text-xs text-[#333333]">
                                (at least 2 required)
                            </span>
                        </h2>
                        <div className="flex justify-between gap-2 items-center">
                            <TextField
                                value={specsInput.title}
                                onChange={handleSpecsChange}
                                name="title"
                                label="Name"
                                placeholder="Model No."
                                variant="outlined"
                                size="small"
                                InputProps={{
                                    style: {
                                        color: "#333333",
                                        background: "#F5F7FA",
                                        borderRadius: 6,
                                        borderColor: "#54B1CE",
                                    },
                                }}
                                InputLabelProps={{
                                    style: { color: "#54B1CE" },
                                }}
                            />
                            <TextField
                                value={specsInput.description}
                                onChange={handleSpecsChange}
                                name="description"
                                label="Description"
                                placeholder="WJDK42DF5"
                                variant="outlined"
                                size="small"
                                InputProps={{
                                    style: {
                                        color: "#333333",
                                        background: "#F5F7FA",
                                        borderRadius: 6,
                                        borderColor: "#54B1CE",
                                    },
                                }}
                                InputLabelProps={{
                                    style: { color: "#54B1CE" },
                                }}
                            />
                            <span
                                onClick={() => addSpecs()}
                                className="py-2 px-6 bg-[#54B1CE] text-[#FFFFFF] rounded hover:bg-[#3A8AA3] cursor-pointer transition-all duration-200"
                            >
                                Add
                            </span>
                        </div>
                        <div className="flex flex-col gap-2">
                            {specs?.map((spec, i) => (
                                <div
                                    key={i}
                                    className="flex justify-between gap-2 sm:gap-5 items-center text-sm rounded bg-[#F5F7FA] border border-[#54B1CE] py-1 px-2"
                                >
                                    <p className="text-[#333333] font-medium">
                                        {spec.title}
                                    </p>
                                    <p className="text-[#333333]">{spec.description}</p>
                                    <span
                                        onClick={() => deleteSpec(i)}
                                        className="text-red-400 hover:bg-red-100 p-1 rounded-full cursor-pointer transition-all duration-200"
                                    >
                                        <DeleteIcon />
                                    </span>
                                </div>
                            ))}
                        </div>
                        <h2 className="font-medium text-[#54B1CE]">
                            Product Images{" "}
                            <span className="ml-2 text-xs text-[#333333]">
                                (1-4 images, max 500KB each)
                            </span>
                        </h2>
                        <div className="flex gap-2 overflow-x-auto h-36 border border-[#54B1CE] rounded bg-[#FFFFFF] p-2">
                            {imagesPreview?.map((image, i) => (
                                <img
                                    draggable="false"
                                    src={image}
                                    alt="Product Image"
                                    key={i}
                                    className="w-24 h-24 object-contain"
                                />
                            ))}
                            {oldImages?.map((image, i) => (
                                <div key={i} className="relative group">
                                    <img
                                        draggable="false"
                                        src={image.url}
                                        alt="Product"
                                        className="w-24 h-24 object-contain transition-opacity duration-300 group-hover:opacity-20"
                                    />
                                    <div
                                        onClick={() => {
                                            setOldImages((prev) =>
                                                prev.filter((item) => item?.url !== image?.url)
                                            );
                                            setRemovedImages((prev) => [...prev, image?.public_id]);
                                        }}
                                        className="absolute text-red-400 text-center top-0 right-0 w-full h-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                    >
                                        <span>Remove</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <label className="rounded font-medium bg-[#54B1CE] text-center cursor-pointer text-[#FFFFFF] p-2 shadow hover:bg-[#3A8AA3] my-2 transition-all duration-200">
                            <input
                                type="file"
                                name="images"
                                accept="image/*"
                                multiple
                                onChange={handleProductImageChange}
                                className="hidden"
                            />
                            Choose Files
                        </label>
                        <div className="flex items-center gap-4 justify-between">
                            <input
                                form="mainForm"
                                type="submit"
                                className="bg-[#54B1CE] hover:bg-[#3A8AA3] uppercase w-full p-3 text-[#FFFFFF] font-medium rounded shadow hover:shadow-lg cursor-pointer transition-all duration-300 border-2 border-[#54B1CE]"
                                value="Update"
                            />
                            <Link
                                to="/admin/dashboard/all-products"
                                className="bg-red-600 hover:bg-red-700 uppercase w-full p-3 text-[#FFFFFF] text-center font-medium rounded shadow hover:shadow-lg cursor-pointer transition-all duration-300"
                            >
                                Cancel
                            </Link>
                        </div>
                    </div>
                    <style>
                        {`
                            .custom-toast {
                                background-color: #FFFFFF;
                                color: #333333;
                                border: 2px solid #54B1CE;
                                border-radius: 50px;
                                padding: 10px 20px;
                                font-size: 14px;
                                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                                margin-top: 40px;
                            }
                            .Toastify__toast--success {
                                background-color: #FFFFFF;
                                color: #333333;
                                border: 2px solid #54B1CE;
                            }
                            .Toastify__toast--error, .Toastify__toast--warning {
                                background-color: #FFFFFF;
                                color: #333333;
                                border: 2px solid #ff4d4f;
                            }
                        `}
                    </style>
                </form>
            )}
        </>
    );
};

export default EditProduct;
