"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api/axios";
import { useRouter, useParams } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";
import AdminRoute from "@/components/AdminRoute";

export default function EditSweetPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const [form, setForm] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get("/sweets");
      const sweet = res.data.find((s: any) => s.id == id);
      setForm(sweet);
    };
    fetchData();
  }, []);

  if (!form) return <p>Loading...</p>;

  const handleChange = (e: any) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await api.put(`/sweets/${id}`, {
      name: form.name,
      category: form.category,
      price: Number(form.price),
      quantity: Number(form.quantity),
    });
    router.push("/admin/sweets");
  };

  return (
    <ProtectedRoute>
      <AdminRoute>
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Edit Sweet</h1>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
            <input
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
            <input
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
            <input
              name="quantity"
              type="number"
              value={form.quantity}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />

            <button className="bg-blue-600 text-white py-2 px-4 rounded">
              Update
            </button>
          </form>
        </div>
      </AdminRoute>
    </ProtectedRoute>
  );
}
