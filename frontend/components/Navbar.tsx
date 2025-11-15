"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  return (
    <div className="w-full bg-white border-b border-neutral-200 px-6 py-3 flex justify-between items-center">
      <h1
        className="text-lg font-medium cursor-pointer"
        onClick={() => router.push("/dashboard")}
      >
        Sweet Shop
      </h1>

      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">{user.email}</Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => router.push("/sweets")}>
              Sweets
            </DropdownMenuItem>

            {user.role === "admin" && (
              <DropdownMenuItem
                onClick={() => router.push("/admin/sweets/new")}
              >
                Add Sweet (Admin)
              </DropdownMenuItem>
            )}

            <DropdownMenuItem
              onClick={() => {
                logout();
                router.push("/login");
              }}
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button onClick={() => router.push("/login")}>Login</Button>
      )}
    </div>
  );
}
