"use client";

import { useState } from "react";
import api from "@/lib/api/axios";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";
import AdminRoute from "@/components/AdminRoute";

export default function CreateSweetPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
  });

  const handleChange = (e: any) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await api.post("/sweets", {
      ...form,
      price: Number(form.price),
      quantity: Number(form.quantity),
    });
    router.push("/admin/sweets");
  };

  return (
    <ProtectedRoute>
      <AdminRoute>
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Add New Sweet</h1>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              name="name"
              placeholder="Name"
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
            <input
              name="category"
              placeholder="Category"
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
            <input
              name="price"
              placeholder="Price"
              type="number"
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
            <input
              name="quantity"
              placeholder="Quantity"
              type="number"
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />

            <button className="bg-green-600 text-white py-2 px-4 rounded">
              Add Sweet
            </button>
          </form>
        </div>
      </AdminRoute>
    </ProtectedRoute>
  );
}
