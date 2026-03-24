"use client";
import React, { useEffect, useState } from "react";
import { Edit, Trash2 } from "lucide-react";

const OrdersTable = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editedOrder, setEditedOrder] = useState({});

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("/data/data.json");
        const data = await res.json();
        setOrders(data.orders || []);
      } catch (error) {
        console.error("Error fetching orders", error);
      }
    };
    fetchOrders();
  }, []);

  // Delete order with confirmation
const handleDelete = (id) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this order?");
  if (confirmDelete) {
    setOrders(orders.filter((order) => order.id !== id));
  }
};

  const handleEdit = (order) => {
    setEditingId(order.id);
    setEditedOrder(order);
  };

  const handleSave = () => {
    setOrders(
      orders.map((order) =>
        order.id === editingId ? editedOrder : order
      )
    );
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditedOrder({});
  };

  const filteredOrders = orders.filter((order) =>
    order.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-600 text-white";
      case "Pending":
        return "bg-yellow-500 text-black";
      case "Canceled":
        return "bg-red-600 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <div className="bg-[#2f2f2f] p-6 rounded-lg shadow mb-8">
      {/* Header row */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-100">Order List</h2>
        <div className="w-full sm:w-1/2 lg:w-1/3">
          <input
            type="text"
            placeholder="Search by ID, client, or email..."
            className="w-full px-3 py-2 rounded border border-gray-600 bg-gray-800 text-white 
                       focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-gray-400">
              <th className="px-4 py-2">Order ID</th>
              <th className="px-4 py-2">Client</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Total</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Country</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <tr key={order.id} className="border-t border-gray-700">
                  <td className="px-4 py-2">{order.id}</td>
                  <td className="px-4 py-2">
                    {editingId === order.id ? (
                      <input
                        type="text"
                        value={editedOrder.client}
                        onChange={(e) =>
                          setEditedOrder({ ...editedOrder, client: e.target.value })
                        }
                        className="px-2 py-1 rounded bg-gray-800 text-white"
                      />
                    ) : (
                      order.client
                    )}
                  </td>
                  <td className="px-4 py-2">{order.email}</td>
                  <td className="px-4 py-2">${order.total.toFixed(2)}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(order.status)}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">{order.date}</td>
                  <td className="px-4 py-2">{order.country}</td>
                  <td className="px-4 py-2 flex gap-2">
                    {editingId === order.id ? (
                      <>
                        <button
                          className="bg-green-500 text-white px-3 py-1 rounded"
                          onClick={handleSave}
                        >
                          Save
                        </button>
                        <button
                          className="bg-gray-500 text-white px-3 py-1 rounded"
                          onClick={handleCancel}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="bg-blue-500 text-white p-1 rounded"
                          onClick={() => handleEdit(order)}
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          className="bg-red-500 text-white p-1 rounded"
                          onClick={() => handleDelete(order.id)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-4 text-gray-300">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersTable;
