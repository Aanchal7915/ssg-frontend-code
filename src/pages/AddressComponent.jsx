import { useEffect, useState } from "react";
import { useAuth } from "../context/auth";
import axios from "axios";
import { toast } from "react-toastify";

// Address Card Component
const AddressCard = ({ address, onEdit, onDelete }) => (
    <div className="border rounded-md p-4 mb-4 shadow-sm bg-white flex flex-col gap-2 relative">
        <span className="absolute top-2 right-2 text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">
            {address.addressType}
            {address.isDefault && <span className="ml-2 text-green-600 font-bold">Default</span>}
        </span>
        <div>
            <span className="font-semibold">{address.fullName}</span> &nbsp;|&nbsp;
            <span>{address.phoneNumber}</span>
            {address.alternatePhoneNumber && (
                <span> / {address.alternatePhoneNumber}</span>
            )}
        </div>
        <div>
            {address.streetAddress}, {address.landmark && `${address.landmark}, `}
            {address.locality}, {address.city}, {address.state}, {address.pincode}, {address.country}
        </div>
        <div className="flex gap-2 mt-2">
            <button
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => onEdit(address)}
            >
                Edit
            </button>
            <button
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={() => onDelete(address._id)}
            >
                Delete
            </button>
        </div>
    </div>
);

// Address Form Component
const AddressForm = ({ initial, onSave, onCancel }) => {
    const [form, setForm] = useState(
        initial || {
            fullName: "",
            phoneNumber: "",
            alternatePhoneNumber: "",
            pincode: "",
            streetAddress: "",
            landmark: "",
            locality: "",
            city: "",
            state: "",
            country: "India",
            addressType: "Home",
            isDefault: false,
        }
    );

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(form);
    };

    return (
        <form className="bg-white p-4 rounded shadow mb-4" onSubmit={handleSubmit}>
            {/* Back Button */}
            <button
                type="button"
                className="mb-4 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 flex items-center"
                onClick={onCancel}
            >
                ← Back
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="Full Name"
                    required
                    className="border p-2 rounded"
                />
                <input
                    name="phoneNumber"
                    value={form.phoneNumber}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    required
                    pattern="[0-9]{10}"
                    className="border p-2 rounded"
                />
                <input
                    name="alternatePhoneNumber"
                    value={form.alternatePhoneNumber}
                    onChange={handleChange}
                    placeholder="Alternate Phone Number"
                    pattern="[0-9]{10}"
                    className="border p-2 rounded"
                />
                <input
                    name="pincode"
                    value={form.pincode}
                    onChange={handleChange}
                    placeholder="Pincode"
                    required
                    className="border p-2 rounded"
                />
                <input
                    name="streetAddress"
                    value={form.streetAddress}
                    onChange={handleChange}
                    placeholder="Street Address"
                    required
                    className="border p-2 rounded"
                />
                <input
                    name="landmark"
                    value={form.landmark}
                    onChange={handleChange}
                    placeholder="Landmark"
                    className="border p-2 rounded"
                />
                <input
                    name="locality"
                    value={form.locality}
                    onChange={handleChange}
                    placeholder="Locality"
                    required
                    className="border p-2 rounded"
                />
                <input
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    placeholder="City"
                    required
                    className="border p-2 rounded"
                />
                <input
                    name="state"
                    value={form.state}
                    onChange={handleChange}
                    placeholder="State"
                    required
                    className="border p-2 rounded"
                />
                <input
                    name="country"
                    value={form.country}
                    onChange={handleChange}
                    placeholder="Country"
                    required
                    className="border p-2 rounded"
                />
                <select
                    name="addressType"
                    value={form.addressType}
                    onChange={handleChange}
                    className="border p-2 rounded"
                >
                    <option value="Home">Home</option>
                    <option value="Work">Work</option>
                    <option value="Other">Other</option>
                </select>
                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        name="isDefault"
                        checked={form.isDefault}
                        onChange={handleChange}
                    />
                    Set as Default
                </label>
            </div>
            <div className="flex gap-2 mt-4">
                <button
                    type="submit"
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                    Save
                </button>
                <button
                    type="button"
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                    onClick={onCancel}
                >
                    Cancel
                </button>
            </div>
        </form>
    );
};

const AddressComponent = () => {
    const { auth } = useAuth();
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(null);
    const [showForm, setShowForm] = useState(false);

    // Fetch addresses from backend
    useEffect(() => {
        const fetchAddresses = async () => {
            setLoading(true);
            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_SERVER_URL}/api/v1/user/addresses`,
                    { headers: { Authorization: auth.token } }
                );
                console.log(res.data);
                setAddresses(res.data || []);
            } catch (err) {
                toast.error("Failed to fetch addresses");
            }
            setLoading(false);
        };
        fetchAddresses();
    }, [auth.token]);

    // Add or Edit address
    const handleSave = async (form) => {
        setLoading(true);
        try {
            if (editing) {
                await axios.put(
                    `${import.meta.env.VITE_SERVER_URL}/api/v1/user/update-address/${editing._id}`,
                    form,
                    { headers: { Authorization: auth.token } }
                );
                toast.success("Address updated!");
            } else {
                await axios.post(
                    `${import.meta.env.VITE_SERVER_URL}/api/v1/user/add-address`,
                    form,
                    { headers: { Authorization: auth.token } }
                );
                toast.success("Address added!");
            }
            // Always refetch after add/edit
            const res = await axios.get(
                `${import.meta.env.VITE_SERVER_URL}/api/v1/user/addresses`,
                { headers: { Authorization: auth.token } }
            );
            setAddresses(res.data || []);
        } catch (err) {
            toast.error("Failed to save address");
        }
        setEditing(null);
        setShowForm(false);
        setLoading(false);
    };

    // Delete address
    const handleDelete = async (id) => {
        setLoading(true);
        try {
            await axios.delete(
                `${import.meta.env.VITE_SERVER_URL}/api/v1/user/delete-address/${id}`,
                { headers: { Authorization: auth.token } }
            );
            setAddresses((prev) => prev.filter((addr) => addr._id !== id));
            toast.success("Address deleted!");
        } catch (err) {
            toast.error("Failed to delete address");
        }
        setLoading(false);
    };

    // Edit address
    const handleEdit = (address) => {
        setEditing(address);
        setShowForm(true);
    };

    // Add new address
    const handleAddNew = () => {
        setEditing(null);
        setShowForm(true);
    };

    return (
        <div className="max-w-2xl mx-auto py-8 p-2">
            <h2 className="text-2xl font-bold mb-6">Manage Addresses</h2>
            {loading && <div className="text-center py-4">Loading...</div>}
            {!loading && (
                <>
                    {showForm ? (
                        <AddressForm
                            initial={editing}
                            onSave={handleSave}
                            onCancel={() => {
                                setShowForm(false);
                                setEditing(null);
                            }}
                        />
                    ) : (
                        <>
                            <button
                                className="mb-4 px-4 py-2 bg-primary-blue text-white rounded bg-blue-600 hover:bg-blue-800"
                                onClick={handleAddNew}
                            >
                                + Add New Address
                            </button>
                            {addresses.length === 0 ? (
                                <div className="text-gray-500">No addresses found.</div>
                            ) : (
                                addresses.map((address) => (
                                    <AddressCard
                                        key={address._id}
                                        address={address}
                                        onEdit={handleEdit}
                                        onDelete={handleDelete}
                                    />
                                ))
                            )}
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default AddressComponent;
