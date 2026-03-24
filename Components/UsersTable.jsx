
"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const UsersTable = () => {
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editedClient, setEditedClient] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [newClient, setNewClient] = useState({
    id: "",
    name: "",
    email: "",
    phoneNumber: "",
    country: "",
    image: "/images/user-placeholder.jpg",
  });

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await fetch("/data/data.json");
        const data = await res.json();
        setClients(data.clients);
      } catch (error) {
        console.error("Error fetching clients", error);
      }
    };
    fetchClients();
  }, []);

  // Delete client with confirmation
const handleDelete = (id) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this client ?");
  if (confirmDelete) {
    setOrders(orders.filter((order) => order.id !== id));
  }
};


  // Start editing
  const handleEdit = (client) => {
    setEditingId(client.id);
    setEditedClient(client);
  };

  // Save edited client
  const handleSave = () => {
    setClients(
      clients.map((client) =>
        client.id === editingId ? editedClient : client
      )
    );
    setEditingId(null);
  };

  // Cancel editing
  const handleCancel = () => {
    setEditingId(null);
    setEditedClient({});
  };

  // Add new client
  const handleAddClient = (e) => {
    e.preventDefault();
    setClients([...clients, { ...newClient, id: Date.now() }]);
    setNewClient({
      id: "",
      name: "",
      email: "",
      phoneNumber: "",
      country: "",
      image: "/images/user-placeholder.jpg",
    });
    setShowForm(false);
  };

  // Filter clients by search term
  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Users Table</h2>

      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search by name..."
          className="border px-3 py-2 w-1/2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="bg-indigo-600 text-white px-3 py-2 rounded"
          onClick={() => setShowForm(!showForm)}
        >
          Add Client
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleAddClient}
          className="bg-gray-700 p-4 rounded mb-4 space-y-2"
        >
          <input
            type="text"
            placeholder="Name"
            value={newClient.name}
            onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
            className="w-full border px-2 py-1 rounded"
          />
          <input
            type="email"
            placeholder="Email"
            value={newClient.email}
            onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
            className="w-full border px-2 py-1 rounded"
          />
          <input
            type="text"
            placeholder="Phone"
            value={newClient.phoneNumber}
            onChange={(e) =>
              setNewClient({ ...newClient, phoneNumber: e.target.value })
            }
            className="w-full border px-2 py-1 rounded"
          />
          <input
            type="text"
            placeholder="Country"
            value={newClient.country}
            onChange={(e) =>
              setNewClient({ ...newClient, country: e.target.value })
            }
            className="w-full border px-2 py-1 rounded"
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Save Client
          </button>
        </form>
      )}

<table className="min-w-full">
  <thead>
    <tr className="bg-gray-700 text-white">
      <th className="px-4 py-2">Image</th>
      <th className="px-4 py-2">Name</th>
      <th className="px-4 py-2">Email</th>
      <th className="px-4 py-2">Phone</th>
      <th className="px-4 py-2">Country</th>
      <th className="px-4 py-2">Actions</th>
    </tr>
  </thead>
  <tbody>
    {filteredClients.length > 0 ? (
      filteredClients.map((client) => (
        <motion.tr
          key={client.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="hover:bg-gray-800"
        >
          <td className="px-4 py-2">
            <img
              src={client.image}
              alt={client.name}
              className="w-12 h-12 rounded-full object-cover"
            />
          </td>
          <td className="px-4 py-2">
            {editingId === client.id ? (
              <input
                type="text"
                value={editedClient.name}
                onChange={(e) =>
                  setEditedClient({ ...editedClient, name: e.target.value })
                }
              />
            ) : (
              client.name
            )}
          </td>
          <td className="px-4 py-2">
            {editingId === client.id ? (
              <input
                type="text"
                value={editedClient.email}
                onChange={(e) =>
                  setEditedClient({ ...editedClient, email: e.target.value })
                }
              />
            ) : (
              client.email
            )}
          </td>
          <td className="px-4 py-2">
            {editingId === client.id ? (
              <input
                type="text"
                value={editedClient.phoneNumber}
                onChange={(e) =>
                  setEditedClient({
                    ...editedClient,
                    phoneNumber: e.target.value,
                  })
                }
              />
            ) : (
              client.phoneNumber
            )}
          </td>
          <td className="px-4 py-2">
            {editingId === client.id ? (
              <input
                type="text"
                value={editedClient.country}
                onChange={(e) =>
                  setEditedClient({ ...editedClient, country: e.target.value })
                }
              />
            ) : (
              client.country
            )}
          </td>
          <td className="px-4 py-2">
            {editingId === client.id ? (
              <>
                <button
                  className="bg-green-500 text-white px-3 py-1 mr-2"
                  onClick={handleSave}
                >
                  Save
                </button>
                <button
                  className="bg-gray-500 text-white px-3 py-1"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  className="bg-blue-500 text-white px-3 py-1 mr-2"
                  onClick={() => handleEdit(client)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1"
                  onClick={() => handleDelete(client.id)}
                >
                  Delete
                </button>
              </>
            )}
          </td>
        </motion.tr>
      ))
    ) : (
      <tr>
        <td colSpan="6" className="text-center py-4">
          No clients found
        </td>
      </tr>
    )}
  </tbody>
</table>

    </div>
  );
};

export default UsersTable;

