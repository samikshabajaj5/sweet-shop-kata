"use client";

import { useState } from "react";
import api from "@/lib/api/axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuth();
  //   const { toast } = useToast();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: any) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/register", form);

      toast("Account created", {
        description: "Welcome! You can now log in.",
      });

      router.push("/login");
    } catch (err: any) {
      toast("Registration Failed", {
        description: err.response?.data?.error || "Something went wrong.",
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <Card className="w-96 shadow-sm border border-neutral-200">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            Create Account
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <Input
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              className="focus-visible:ring-0"
            />

            <Input
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
              className="focus-visible:ring-0"
            />

            <Input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              className="focus-visible:ring-0"
            />

            <Button type="submit" className="w-full">
              Register
            </Button>

            <p className="text-sm text-center text-neutral-600">
              Already have an account?{" "}
              <span
                className="text-blue-600 cursor-pointer"
                onClick={() => router.push("/login")}
              >
                Login
              </span>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
