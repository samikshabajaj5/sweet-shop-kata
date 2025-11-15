"use client";

import { useEffect, useState } from "react";
import axios from "@/lib/api/axios";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SweetsListPage() {
  const { token, user } = useAuth();
  const router = useRouter();

  const [sweets, setSweets] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchSweets = async () => {
    try {
      const res = await axios.get("/sweets", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSweets(res.data);
    } catch (err) {
      console.error("Failed to load sweets:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) router.push("/login");
    else fetchSweets();
  }, [token]);

  const filtered = sweets.filter((s: any) =>
    s.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-white px-6 py-10 max-w-5xl mx-auto">
      <Card className="shadow-sm border border-neutral-200">
        <CardHeader>
          <CardTitle className="text-lg font-medium flex items-center justify-between">
            Sweets List
            {user?.role === "admin" && (
              <Button onClick={() => router.push("/admin/sweets/new")}>
                + Add Sweet
              </Button>
            )}
          </CardTitle>
        </CardHeader>

        <CardContent>
          {/* Search */}
          <Input
            className="mb-4"
            placeholder="Search sweets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {loading ? (
            <p className="text-neutral-500">Loading...</p>
          ) : (
            <>
              {filtered.length === 0 ? (
                <p className="text-neutral-500">No sweets found.</p>
              ) : (
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-neutral-300 text-left text-neutral-600">
                      <th className="py-3">Name</th>
                      <th className="py-3">Category</th>
                      <th className="py-3">Price</th>
                      <th className="py-3">Stock</th>
                      {user?.role === "admin" && <th className="py-3"></th>}
                    </tr>
                  </thead>

                  <tbody>
                    {filtered.map((sweet: any) => (
                      <tr
                        key={sweet.id}
                        className="border-b border-neutral-100 hover:bg-neutral-50 transition"
                      >
                        <td className="py-3">{sweet.name}</td>
                        <td className="py-3">{sweet.category}</td>
                        <td className="py-3">₹{sweet.price}</td>
                        <td className="py-3">{sweet.stock ?? "-"}</td>

                        {user?.role === "admin" && (
                          <td className="py-3 flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                router.push(`/admin/sweets/${sweet.id}/edit`)
                              }
                            >
                              Edit
                            </Button>

                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() =>
                                router.push(`/admin/sweets/${sweet.id}/delete`)
                              }
                            >
                              Delete
                            </Button>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
