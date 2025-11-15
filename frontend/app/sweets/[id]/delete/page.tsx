"use client";

import axios from "@/lib/api/axios";
import { useAuth } from "@/context/AuthContext";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function DeleteSweetPage() {
  const { token, user } = useAuth();
  const router = useRouter();
  const params = useParams();
  const sweetId = params.id as string;

  const handleDelete = async () => {
    try {
      await axios.delete(`/sweets/${sweetId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      router.push("/sweets");
    } catch (err) {
      console.error(err);
      alert("Error deleting sweet");
    }
  };

  if (user?.role !== "admin")
    return <p className="text-center mt-10">Unauthorized</p>;

  return (
    <div className="min-h-screen px-6 py-10 max-w-xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Delete Sweet?</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-neutral-600">
            Are you sure you want to delete this sweet? This cannot be undone.
          </p>

          <div className="flex gap-3">
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>

            <Button variant="outline" onClick={() => router.push("/sweets")}>
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
