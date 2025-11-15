"use client";

import { useState, useEffect } from "react";
import api from "@/lib/api/axios";
import ProtectedRoute from "@/components/ProtectedRoute";
import AdminRoute from "@/components/AdminRoute";
import Link from "next/link";

export default function AdminSweetsPage() {
  const [sweets, setSweets] = useState<any[]>([]);

  const fetchSweets = async () => {
    const res = await api.get("/sweets");
    setSweets(res.data);
  };

  useEffect(() => {
    fetchSweets();
  }, []);

  const handleDelete = async (id: number) => {
    await api.delete(`/sweets/${id}`);
    fetchSweets();
  };

  return (
    <ProtectedRoute>
      <AdminRoute>
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-6">Admin — Manage Sweets</h1>

          <Link
            href="/admin/sweets/create"
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Add New Sweet
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {sweets.map((sweet) => (
              <div
                key={sweet.id}
                className="border p-4 rounded shadow bg-white"
              >
                <h2 className="text-xl font-bold">{sweet.name}</h2>
                <p>{sweet.category}</p>
                <p>₹ {sweet.price}</p>
                <p>Qty: {sweet.quantity}</p>

                <Link
                  href={`/admin/sweets/${sweet.id}/edit`}
                  className="block mt-4 bg-blue-600 text-white text-center py-2 rounded"
                >
                  Edit
                </Link>

                <button
                  onClick={() => handleDelete(sweet.id)}
                  className="block mt-2 w-full bg-red-600 text-white py-2 rounded"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </AdminRoute>
    </ProtectedRoute>
  );
}
