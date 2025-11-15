"use client";

import { useState } from "react";
import api from "@/lib/api/axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { useToast } from "@/components/ui/use-toast";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  //   const { toast } = useToast();

  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e: any) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", form);
      login(res.data.token, res.data.user);

      //   toast({ title: "Login Successful", description: "Welcome back!" });

      router.push("/dashboard");
    } catch (err: any) {
      //   toast({
      //     title: "Login Failed",
      //     description: err.response?.data?.error || "Invalid credentials",
      //     variant: "destructive",
      //   });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-96">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>

        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <Input
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
            />

            <Input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
            />

            <Button type="submit" className="w-full">
              Login
            </Button>

            <p className="text-sm text-center">
              Don’t have an account?{" "}
              <span
                onClick={() => router.push("/register")}
                className="text-blue-600 cursor-pointer"
              >
                Register
              </span>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
