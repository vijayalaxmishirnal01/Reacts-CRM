"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, Edit, Trash2, Save, X, Plus } from "lucide-react";

const ProductsTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    id: "",
    name: "",
    category: "",
    price: "",
    stock: "",
    sales: "",
    image: "/images/placeholder.png",
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/data/data.json");
        const data = await res.json();
        setProducts(data.products); // ✅ Correct state setter
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };
    fetchProducts();
  }, []);

  // Filter products
  const filteredProducts = products.filter((product) =>
    [product.name, product.category, product.id.toString()].some((field) =>
      field.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Delete Product with confirmation
const handleDelete = (id) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this Product?");
  if (confirmDelete) {
    setOrders(orders.filter((order) => order.id !== id));
  }
};


  // Edit handlers
  const handleEdit = (product) => {
    setEditingId(product.id);
    setEditForm({ ...product });
  };
  const handleCancel = () => {
    setEditingId(null);
    setEditForm({});
  };
  const handleSave = () => {
    setProducts((prev) =>
      prev.map((p) => (p.id === editingId ? editForm : p))
    );
    setEditingId(null);
  };

  // Add product
  const handleAddProduct = (e) => {
    e.preventDefault();
    setProducts((prev) => [...prev, newProduct]);
    setNewProduct({
      id: "",
      name: "",
      category: "",
      price: "",
      stock: "",
      sales: "",
      image: "/images/placeholder.png",
    });
    setShowForm(false);
  };

  return (
    <motion.div className="bg-[#1e1e1e] rounded-xl p-4 md:p-6 border border-[#1f1f1f]">
      {/* Header with search + add button */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-lg md:text-xl font-semibold text-gray-100">
          Products List
        </h2>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search Products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-[#2f2f2f] text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-2 rounded-lg"
          >
            <Plus size={16} className="mr-1" /> Add Product
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto no-scrollbar">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              {["Image","Name","Product ID","Category","Price","Stock","Sales","Actions"].map((header) => (
                <th key={header} className="hidden md:table-cell px-6 py-2 text-xs text-gray-400 uppercase">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <motion.tr key={product.id} className="flex flex-col md:table-row">
                {/* Image */}
                <td className="hidden md:table-cell px-6 py-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 rounded object-cover"
                  />
                </td>

                {/* Name */}
                <td className="hidden md:table-cell px-6 py-4 text-sm text-gray-200">
                  {editingId === product.id ? (
                    <input
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      className="bg-[#2f2f2f] text-white px-2 py-1 rounded"
                    />
                  ) : (
                    product.name
                  )}
                </td>

                {/* Product ID */}
                <td className="hidden md:table-cell px-6 py-4 text-sm text-gray-200">
                  {editingId === product.id ? (
                    <input
                      value={editForm.id}
                      onChange={(e) => setEditForm({ ...editForm, id: e.target.value })}
                      className="bg-[#2f2f2f] text-white px-2 py-1 rounded"
                    />
                  ) : (
                    product.id
                  )}
                </td>

                {/* Category */}
                <td className="hidden md:table-cell px-6 py-4 text-sm text-gray-200">
                  {editingId === product.id ? (
                    <input
                      value={editForm.category}
                      onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                      className="bg-[#2f2f2f] text-white px-2 py-1 rounded"
                    />
                  ) : (
                    product.category
                  )}
                </td>

                {/* Price */}
                <td className="hidden md:table-cell px-6 py-4 text-sm text-gray-200">
                  {editingId === product.id ? (
                    <input
                      type="number"
                      value={editForm.price}
                      onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                      className="bg-[#2f2f2f] text-white px-2 py-1 rounded"
                    />
                  ) : (
                    `$${product.price}`
                  )}
                </td>

                {/* Stock */}
                <td className="hidden md:table-cell px-6 py-4 text-sm text-gray-200">
                  {editingId === product.id ? (
                    <input
                      type="number"
                      value={editForm.stock}
                      onChange={(e) => setEditForm({ ...editForm, stock: e.target.value })}
                      className="bg-[#2f2f2f] text-white px-2 py-1 rounded"
                    />
                  ) : (
                    product.stock
                  )}
                </td>

                {/* Sales */}
                <td className="hidden md:table-cell px-6 py-4 text-sm text-gray-200">
                  {editingId === product.id ? (
                    <input
                      type="number"
                      value={editForm.sales}
                      onChange={(e) => setEditForm({ ...editForm, sales: e.target.value })}
                      className="bg-[#2f2f2f] text-white px-2 py-1 rounded"
                    />
                  ) : (
                    product.sales
                  )}
                </td>

                {/* Actions */}
                <td className="hidden md:table-cell px-6 py-4 text-sm text-gray-200">
                  {editingId === product.id ? (
                    <div className="flex space-x-1">
                      <button onClick={handleSave} className="text-green-500 hover:text-green-300">
                        <Save size={16} />
                      </button>
                      <button onClick={handleCancel} className="text-gray-400 hover:text-gray-200">
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div className="flex space-x-1">
                      <button onClick={() => handleEdit(product)} className="text-indigo-500 hover:text-indigo-300">
                        <Edit size={16} />
                      </button>
                      <button onClick={() => handleDelete(product.id)} className="text-red-500 hover:text-red-300">
                        <Trash2 size={16} />
                      </button>
          </div>
        )}
      </td>
    </motion.tr>
  ))}
</tbody>


          
        </table>
      </div>
    </motion.div>

    
  );
};

export default ProductsTable;
