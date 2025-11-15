"use client";

import { useEffect, useState } from "react";
import axios from "@/lib/api/axios";
import { useAuth } from "@/context/AuthContext";
import { useRouter, useParams } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function EditSweetPage() {
  const { token, user } = useAuth();
  const router = useRouter();
  const params = useParams();
  const sweetId = params.id as string;

  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
  });

  useEffect(() => {
    const loadSweet = async () => {
      try {
        const res = await axios.get(`/sweets`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const sweet = res.data.find((s: any) => s.id == sweetId);
        if (!sweet) return router.push("/sweets");

        setForm({
          name: sweet.name,
          category: sweet.category,
          price: sweet.price,
          quantity: sweet.quantity,
        });
      } catch (err) {
        console.error("Failed to load sweet", err);
      }
    };

    if (token) loadSweet();
  }, [sweetId, token]);

  const updateField = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async () => {
    try {
      await axios.put(
        `/sweets/${sweetId}`,
        {
          name: form.name,
          category: form.category,
          price: Number(form.price),
          quantity: Number(form.quantity),
        },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      router.push("/sweets");
    } catch (err) {
      console.error("Failed to update", err);
      alert("Error updating sweet");
    }
  };

  if (user?.role !== "admin")
    return <p className="text-center mt-10">Unauthorized</p>;

  return (
    <div className="min-h-screen px-6 py-10 max-w-xl mx-auto">
      <Card className="shadow-sm border border-neutral-200">
        <CardHeader>
          <CardTitle>Edit Sweet</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <Input
            placeholder="Name"
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
          />
          <Input
            placeholder="Category"
            value={form.category}
            onChange={(e) => updateField("category", e.target.value)}
          />
          <Input
            placeholder="Price"
            type="number"
            value={form.price}
            onChange={(e) => updateField("price", e.target.value)}
          />
          <Input
            placeholder="Quantity"
            type="number"
            value={form.quantity}
            onChange={(e) => updateField("quantity", e.target.value)}
          />

          <Button className="w-full" onClick={handleSubmit}>
            Save Changes
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
