"use client";

import { useAuth } from "@/context/AuthContext";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white">
      {/* Top Navbar */}
      <header className="w-full border-b border-neutral-200 bg-white px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-neutral-900">Sweet Shop</h1>

        <div className="flex items-center gap-4">
          {user && (
            <span className="text-sm text-neutral-600">
              Logged in as <span className="font-medium">{user.name}</span>
            </span>
          )}

          {user?.role === "admin" && (
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-md">
              Admin
            </span>
          )}

          <Button
            variant="outline"
            onClick={() => {
              logout();
              router.push("/login");
            }}
          >
            Logout
          </Button>
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="px-6 py-8 max-w-6xl mx-auto space-y-8">
        {/* Welcome Card */}
        <Card className="shadow-sm border border-neutral-200">
          <CardHeader>
            <CardTitle className="text-lg font-medium">
              Welcome back, {user?.name} 👋
            </CardTitle>
          </CardHeader>
          <CardContent className="text-neutral-600">
            Manage sweets, track inventory, and explore your shop.
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card
            className="shadow-sm border border-neutral-200 cursor-pointer hover:shadow transition"
            onClick={() => router.push("/sweets")}
          >
            <CardHeader>
              <CardTitle className="text-base font-medium">
                View Sweets
              </CardTitle>
            </CardHeader>
            <CardContent className="text-neutral-600">
              Browse all sweets in the store.
            </CardContent>
          </Card>

          {user?.role === "admin" && (
            <Card
              className="shadow-sm border border-neutral-200 cursor-pointer hover:shadow transition"
              onClick={() => router.push("/admin/sweets")}
            >
              <CardHeader>
                <CardTitle className="text-base font-medium">
                  Manage Sweets
                </CardTitle>
              </CardHeader>
              <CardContent className="text-neutral-600">
                Add, update, delete, and restock sweets.
              </CardContent>
            </Card>
          )}

          <Card className="shadow-sm border border-neutral-200">
            <CardHeader>
              <CardTitle className="text-base font-medium">
                Coming Soon
              </CardTitle>
            </CardHeader>
            <CardContent className="text-neutral-600">
              More dashboards and analytics on the way.
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
