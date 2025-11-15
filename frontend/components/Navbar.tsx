"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-blue-700 text-white">
      <h1
        className="text-xl font-bold cursor-pointer"
        onClick={() => router.push("/dashboard")}
      >
        Sweet Shop
      </h1>

      <div className="flex items-center gap-4">
        {user && (
          <span>
            {user.name} ({user.role})
          </span>
        )}

        <button
          onClick={() => {
            logout();
            router.push("/login");
          }}
          className="bg-red-500 px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
