"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api/axios";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function DashboardPage() {
  const [sweets, setSweets] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  const fetchSweets = async () => {
    try {
      const res = await api.get("/sweets");
      setSweets(res.data);
    } catch (err) {
      console.error("Failed to fetch sweets", err);
    }
  };

  useEffect(() => {
    fetchSweets();
  }, []);

  const filtered = sweets.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handlePurchase = async (id: number) => {
    try {
      await api.post(`/sweets/${id}/purchase`);
      fetchSweets();
    } catch (err) {
      console.error("Purchase failed", err);
    }
  };

  return (
    <ProtectedRoute>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Sweet Shop Dashboard</h1>

        <input
          type="text"
          placeholder="Search sweets..."
          className="border p-2 rounded w-80 mb-6"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filtered.map((sweet) => (
            <div key={sweet.id} className="p-4 border rounded shadow bg-white">
              <h2 className="text-xl font-bold">{sweet.name}</h2>
              <p className="text-gray-600">{sweet.category}</p>
              <p className="mt-2">₹ {sweet.price}</p>
              <p className="mt-1 text-sm">
                Quantity:{" "}
                <span
                  className={
                    sweet.quantity > 0
                      ? "text-green-700"
                      : "text-red-600 font-semibold"
                  }
                >
                  {sweet.quantity}
                </span>
              </p>

              <button
                disabled={sweet.quantity === 0}
                onClick={() => handlePurchase(sweet.id)}
                className={`mt-4 w-full py-2 rounded ${
                  sweet.quantity === 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 text-white"
                }`}
              >
                {sweet.quantity === 0 ? "Out of Stock" : "Purchase"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
}
