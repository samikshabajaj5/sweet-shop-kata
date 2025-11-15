"use client";

import { useEffect, useState } from "react";
import axios from "@/lib/api/axios";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { useParams } from "next/navigation";

export default function SweetCard({ sweetId }: { sweetId: number }) {
  const { id } = useParams();
  const { token } = useAuth();
  const [sweet, setSweet] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const fetchSweet = async () => {
    try {
      const res = await axios.get(`/sweets/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSweet(res.data);
    } catch (err) {
      console.error("Failed to load sweet:", err);
    } finally {
      setFetching(false);
    }
  };

  const purchase = async () => {
    try {
      setLoading(true);

      await axios.post(
        `/sweets/${id}/purchase`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );

      toast.success("Purchase successful!");
      await fetchSweet(); // refresh UI
    } catch (e: any) {
      toast.error(e.response?.data?.error || "Purchase failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSweet();
  }, [sweetId]);

  if (fetching) return <div>Loading...</div>;
  if (!sweet) return <div>Sweet not found</div>;

  return (
    <div className="border rounded-lg p-4 shadow-sm bg-white hover:shadow-md transition">
      <img
        src={sweet.imageUrl || "/placeholder.png"}
        alt={sweet.name}
        className="w-full h-40 object-cover rounded-md mb-3"
      />

      <h3 className="text-xl font-semibold">{sweet.name}</h3>
      <p className="text-gray-500">{sweet.category}</p>
      <p className="mt-2 font-medium text-green-700">₹{sweet.price}</p>
      <p className="mt-1 text-sm text-gray-600">
        Quantity: <b>{sweet.quantity}</b>
      </p>

      <button
        onClick={purchase}
        disabled={loading || sweet.quantity === 0}
        className={`mt-3 w-full py-2 rounded-lg text-white transition
          ${
            sweet.quantity === 0
              ? "bg-gray-400"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
      >
        {sweet.quantity === 0
          ? "Out of Stock"
          : loading
          ? "Buying..."
          : "Purchase"}
      </button>
    </div>
  );
}
