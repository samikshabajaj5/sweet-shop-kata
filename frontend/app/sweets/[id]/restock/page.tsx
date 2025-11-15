"use client";

import { useEffect, useState } from "react";
import axios from "@/lib/api/axios";
import { useAuth } from "@/context/AuthContext";
import { useRouter, useParams } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function RestockSweetPage() {
  const { token, user } = useAuth();
  const router = useRouter();
  const params = useParams();
  const sweetId = params.id as string;

  const [sweet, setSweet] = useState<any>(null);
  const [amount, setAmount] = useState("");

  const loadSweet = async () => {
    try {
      const res = await axios.get("/sweets", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const found = res.data.find((s: any) => String(s.id) === sweetId);
      if (!found) return router.push("/sweets");

      setSweet(found);
    } catch (err) {
      console.error("Failed to fetch sweet:", err);
    }
  };

  useEffect(() => {
    if (token) loadSweet();
  }, [token]);

  const handleRestock = async () => {
    try {
      await axios.post(
        `/sweets/${sweetId}/restock`,
        { amount: Number(amount) },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      router.push("/sweets");
    } catch (err) {
      console.error(err);
      alert("Error restocking sweet");
    }
  };

  if (user?.role !== "admin")
    return <p className="text-center mt-10">Unauthorized</p>;

  if (!sweet)
    return <p className="text-center mt-10 text-neutral-500">Loading...</p>;

  return (
    <div className="min-h-screen px-6 py-10 max-w-xl mx-auto">
      <Card className="shadow-sm border border-neutral-200">
        <CardHeader>
          <CardTitle>Restock: {sweet.name}</CardTitle>
        </CardHeader>

        <CardContent className="space-y-5">
          <p className="text-neutral-700">
            Current stock:{" "}
            <span className="font-semibold">{sweet.quantity}</span>
          </p>

          <Input
            type="number"
            placeholder="Amount to add"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <Button className="w-full" onClick={handleRestock}>
            Restock
          </Button>

          <Button
            variant="outline"
            className="w-full"
            onClick={() => router.push("/sweets")}
          >
            Cancel
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
