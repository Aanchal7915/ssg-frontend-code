import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../../components/Spinner";
import { useAuth } from "../../context/auth";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import Rating from "@mui/material/Rating";
import Actions from "./Actions";
import SeoData from "../../SEO/SeoData";

const AllProducts = () => {
  const { auth } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/v1/product/seller-product`,
          { headers: { Authorization: auth.token } }
        );
        res.status === 201 && setProducts(res.data.products);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
        error.response?.status === 500 &&
          toast.error("Something went wrong! Please try after sometime.");
      }
    };
    fetchData();
  }, [auth.token]);

  const updateDeletedProduct = (id) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product._id !== id)
    );
  };

  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 100, flex: 0.5 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 200,
      flex: 1,
      renderCell: (params) => (
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full">
            <img
              draggable="false"
              src={params.row.image}
              alt={params.row.name}
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          {params.row.name}
        </div>
      ),
    },
    {
      field: "category",
      headerName: "Category",
      minWidth: 100,
      flex: 0.1,
      renderCell: (params) => <span>{params.row.category?.name}</span>,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 70,
      flex: 0.1,
      renderCell: (params) =>
        params.row.stock < 10 ? (
          <span className="font-[500] text-red-500 rounded-full bg-red-100/40 p-1 w-6 h-6 flex items-center justify-center">
            {params.row.stock}
          </span>
        ) : (
          <span>{params.row.stock}</span>
        ),
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 100,
      flex: 0.2,
      renderCell: (params) => <span>₹{params.row.price?.toLocaleString()}</span>,
    },
    {
      field: "discount_price",
      headerName: "Discount Price",
      type: "number",
      minWidth: 100,
      flex: 0.2,
      renderCell: (params) => <span>₹{params.row.discount_price?.toLocaleString()}</span>,
    },
    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      minWidth: 100,
      flex: 0.1,
      renderCell: (params) => <Rating readOnly value={params.row.rating} size="small" precision={0.5} />,
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 100,
      flex: 0.3,
      sortable: false,
      renderCell: (params) => (
        <Actions
          name={params.row.name}
          updateDeletedProduct={updateDeletedProduct}
          id={params.row.id}
        />
      ),
    },
  ];

  const rows = products?.map((item) => ({
    id: item._id,
    name: item.name,
    image: item.images[0]?.url,
    category: item.category,
    stock: item.stock,
    price: item.price,
    discount_price: item.discountPrice,
    rating: item.ratings,
  }));

  return (
    <div className="relative p-2 w-full min-h-screen bg-white text-[#05416c]">
      <SeoData title="All Products - Seller Dashboard" />
      {loading ? (
        <Spinner />
      ) : (
        <div className="h-full">
          <div className="flex justify-between items-center p-2">
            <h1 className="text-[16px] font-[600] uppercase text-[#05416c]">Products</h1>
            <Link
              to="/admin/dashboard/add-product"
              className="py-2 px-4 rounded shadow font-[500] text-white bg-gradient-to-r from-[#54B1CE] to-[#1e90ff] border-2 border-[#54B1CE] hover:shadow-lg transition-all duration-300"
            >
              New Product
            </Link>
          </div>
          <div className="w-full h-[90%] bg-[#f0f8ff]/90 border border-[#54B1CE] rounded-xl shadow">
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
              sx={{
                color: "#05416c",
                background: "transparent",
                border: "none",
                "& .MuiDataGrid-cell": { borderColor: "#54B1CE", background: "transparent" },
                "& .MuiDataGrid-columnHeaders": { background: "#54B1CE", color: "#ffffff", fontWeight: 600 },
                "& .MuiDataGrid-footerContainer": { background: "#54B1CE", color: "#ffffff" },
                "& .MuiTablePagination-root": { color: "#05416c" },
                "& .MuiDataGrid-row": { background: "transparent" },
                "& .MuiDataGrid-selectedRowCount": { color: "#05416c" },
              }}
              pageSizeOptions={[10]}
              disableRowSelectionOnClick
              disableSelectIconOnClick
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AllProducts;
