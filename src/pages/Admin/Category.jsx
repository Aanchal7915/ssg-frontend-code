import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FiTrash2, FiPlus, FiEdit2 } from "react-icons/fi";
import { useAuth } from "../../context/auth";

const ConfirmModal = ({ open, onClose, onConfirm, message }) => {
    if (!open) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
            <div className="bg-white rounded-xl shadow-xl border border-[#bae6fd] p-6 min-w-[300px] flex flex-col items-center">
                <div className="text-[#334155] text-lg mb-4 text-center">{message}</div>
                <div className="flex gap-4 mt-2">
                    <button
                        className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#f87171] to-[#facc15] text-white font-semibold shadow hover:scale-105 transition-all"
                        onClick={onConfirm}
                    >
                        Yes
                    </button>
                    <button
                        className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#38bdf8] to-[#2563eb] text-white font-semibold shadow hover:scale-105 transition-all"
                        onClick={onClose}
                    >
                        No
                    </button>
                </div>
            </div>
        </div>
    );
};

const Category = () => {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [newSubCategory, setNewSubCategory] = useState("");
    const [loading, setLoading] = useState(false);
    const [categoryImage, setCategoryImage] = useState(null);
    const [categoryImagePreview, setCategoryImagePreview] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [modalAction, setModalAction] = useState(null);
    const [modalPayload, setModalPayload] = useState(null);
    const { auth } = useAuth();

    // Fetch categories
    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_SERVER_URL}/api/v1/product/get-category`
            );
            setCategories(res.data.categories || []);
        } catch (err) {
            toast.error("Failed to fetch categories");
        }
        setLoading(false);
    };

    // Handle category image change (single image, base64)
    const handleCategoryImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const MAX_IMAGE_SIZE = 500 * 1024; // 500 KB
        if (file.size > MAX_IMAGE_SIZE) {
            toast.warning("Category image exceeds 500 KB");
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setCategoryImage(reader.result); // base64
                setCategoryImagePreview(reader.result);
            }
        };
        reader.readAsDataURL(file);
    };

    // Add Category
    const handleAddCategory = async (e) => {
        e.preventDefault();
        if (!newCategory.trim()) return;
        setLoading(true);
        try {
            await axios.post(
                `${import.meta.env.VITE_SERVER_URL}/api/v1/product/add-category`,
                {
                    name: newCategory,
                    image: categoryImage, // base64 string
                },
                {
                    headers: {
                        Authorization: auth.token,
                    },
                }
            );
            setNewCategory("");
            setCategoryImage(null);
            setCategoryImagePreview(null);
            fetchCategories();
            toast.success("Category added!");
        } catch (err) {
            toast.error("Failed to add category");
        }
        setLoading(false);
    };

    // Add Subcategory
    const handleAddSubCategory = async (e) => {
        e.preventDefault();
        if (!newSubCategory.trim() || !selectedCategory) return;
        setLoading(true);
        try {
            await axios.post(
                `${import.meta.env.VITE_SERVER_URL}/api/v1/product/add-subcategory`,
                { name: newSubCategory, categoryId: selectedCategory._id },
                {
                    headers: {
                        Authorization: auth.token,
                    },
                }
            );
            setNewSubCategory("");
            fetchCategories();
            toast.success("Subcategory added!");
        } catch (err) {
            toast.error("Failed to add subcategory");
        }
        setLoading(false);
    };

    // Delete Category (show modal)
    const handleDeleteCategory = (id) => {
        setModalAction("deleteCategory");
        setModalPayload(id);
        setShowModal(true);
    };

    // Delete Subcategory (show modal)
    const handleDeleteSubCategory = (catId, subId) => {
        setModalAction("deleteSubcategory");
        setModalPayload({ catId, subId });
        setShowModal(true);
    };

    // Confirm modal action
    const handleModalConfirm = async () => {
        setShowModal(false);
        setLoading(true);
        try {
            if (modalAction === "deleteCategory") {
                await axios.delete(
                    `${import.meta.env.VITE_SERVER_URL}/api/v1/product/delete-category/${modalPayload}`,
                    {
                        headers: {
                            Authorization: auth.token,
                        },
                    }
                );
                fetchCategories();
                toast.success("Category deleted!");
            } else if (modalAction === "deleteSubcategory") {
                await axios.delete(
                    `${import.meta.env.VITE_SERVER_URL}/api/v1/product/delete-subcategory/${modalPayload.subId}`,
                    {
                        headers: {
                            Authorization: auth.token,
                        },
                    }
                );
                fetchCategories();
                toast.success("Subcategory deleted!");
            }
        } catch (err) {
            toast.error("Failed to delete");
        }
        setLoading(false);
        setModalAction(null);
        setModalPayload(null);
    };

    return (
        <main className="w-full min-h-screen bg-gradient-to-br from-[#e0f7fa] via-[#f1faff] to-[#f0f9ff] py-8 px-2">
            <ConfirmModal
                open={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={handleModalConfirm}
                message={
                    modalAction === "deleteCategory"
                        ? "Delete this category and all its subcategories?"
                        : "Delete this subcategory?"
                }
            />
            <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold mb-8 text-[#2563eb] text-center drop-shadow">
                    Category Management
                </h2>
                {/* Add Category */}
                <form
                    onSubmit={handleAddCategory}
                    className="flex gap-3 mb-8 items-center justify-center flex-wrap"
                >
                    <input
                    required
                        type="text"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        placeholder="Add new category"
                        className="border border-[#bae6fd] rounded-lg px-4 py-2 bg-white text-[#334155] shadow focus:outline-none focus:border-[#38bdf8] w-2/3"
                    />
                    <input
                    required
                        type="file"
                        accept="image/*"
                        onChange={handleCategoryImageChange}
                        className="border border-[#bae6fd] rounded-lg px-2 py-2 bg-white text-[#334155] shadow focus:outline-none focus:border-[#38bdf8] w-fit"
                    />
                    <button
                        type="submit"
                        className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-[#38bdf8] to-[#2563eb] text-white rounded-lg font-semibold shadow hover:scale-105 transition-all"
                        disabled={loading}
                    >
                        <FiPlus /> Add
                    </button>
                    {categoryImagePreview && (
                        <div className="ml-2">
                            <img
                                src={categoryImagePreview}
                                alt="Preview"
                                className="w-16 h-16 object-cover rounded-lg border border-[#bae6fd] shadow"
                            />
                        </div>
                    )}
                </form>

                {/* Category List */}
                <div className="bg-white/80 rounded-xl shadow-xl border border-[#bae6fd] p-6">
                    {loading ? (
                        <div className="text-center text-[#2563eb] py-8">Loading...</div>
                    ) : categories.length === 0 ? (
                        <div className="text-center text-[#64748b] py-8">No categories found.</div>
                    ) : (
                        categories.map((cat) => (
                            <div
                                key={cat._id}
                                className="mb-6 pb-4 border-b border-[#bae6fd] last:border-b-0 last:mb-0 last:pb-0"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className="text-xl font-bold text-[#2563eb] drop-shadow">
                                            {cat.name}
                                        </span>
                                        <button
                                            className="ml-2 px-2 py-1 bg-gradient-to-r from-[#f87171] to-[#facc15] text-white rounded-lg shadow hover:scale-105 transition-all"
                                            onClick={() => handleDeleteCategory(cat._id)}
                                            title="Delete Category"
                                        >
                                            <FiTrash2 />
                                        </button>
                                        <button
                                            className={`ml-2 px-2 py-1 bg-gradient-to-r from-[#38bdf8] to-[#2563eb] text-white rounded-lg shadow hover:scale-105 transition-all ${
                                                selectedCategory?._id === cat._id
                                                    ? "ring-2 ring-[#2563eb]"
                                                    : ""
                                            }`}
                                            onClick={() => setSelectedCategory(cat)}
                                            title="Manage Subcategories"
                                        >
                                            <FiEdit2 />
                                        </button>
                                    </div>
                                </div>
                                {/* Subcategory List */}
                                {selectedCategory?._id === cat._id && (
                                    <div className="mt-4 ml-4">
                                        <form
                                            onSubmit={handleAddSubCategory}
                                            className="flex gap-2 mb-3 items-center"
                                        >
                                            <input
                                                type="text"
                                                value={newSubCategory}
                                                onChange={(e) => setNewSubCategory(e.target.value)}
                                                placeholder="Add subcategory"
                                                className="border border-[#bae6fd] rounded-lg px-3 py-1 bg-white text-[#334155] shadow focus:outline-none focus:border-[#38bdf8] w-2/3"
                                            />
                                            <button
                                                type="submit"
                                                className="flex items-center gap-1 px-4 py-1 bg-gradient-to-r from-[#38bdf8] to-[#2563eb] text-white rounded-lg font-semibold shadow hover:scale-105 transition-all"
                                                disabled={loading}
                                            >
                                                <FiPlus /> Add
                                            </button>
                                        </form>
                                        <div>
                                            {cat.subcategories && cat.subcategories.length > 0 ? (
                                                cat.subcategories.map((sub) => (
                                                    <div
                                                        key={sub._id}
                                                        className="flex items-center gap-2 mb-2"
                                                    >
                                                        <span className="text-base text-[#2563eb] font-medium">
                                                            {sub.name}
                                                        </span>
                                                        <button
                                                            className="px-2 py-1 bg-gradient-to-r from-[#f87171] to-[#facc15] text-white rounded-lg shadow hover:scale-105 transition-all"
                                                            onClick={() =>
                                                                handleDeleteSubCategory(
                                                                    cat._id,
                                                                    sub._id
                                                                )
                                                            }
                                                            title="Delete Subcategory"
                                                        >
                                                            <FiTrash2 />
                                                        </button>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="text-[#64748b] text-sm">
                                                    No subcategories yet.
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </main>
    );
};

export default Category;
