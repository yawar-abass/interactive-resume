"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { login } from "@/lib/auth";
import Footer from "@/components/layout/Footer";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(email, password)) {
      localStorage.setItem("isLoggedIn", "true");
      router.push("/resume");
    } else {
      setError("Invalid credentials. Try test@algokart.com / pass123");
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center bg-linear-to-br from-gray-900 via-slate-900 to-black text-white overflow-hidden">
      {/* Subtle glowing background orbs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-20 h-[300px] w-[300px] bg-indigo-500/30 blur-3xl rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-20 h-[300px] w-[300px] bg-purple-500/30 blur-3xl rounded-full animate-pulse"></div>
      </div>

      {/* Centered Login Card */}
      <Card className="w-[380px] p-8 rounded-2xl border border-gray-700/50 bg-white/10 backdrop-blur-xl shadow-2xl">
        <h1 className="text-3xl font-bold text-center mb-6 bg-linear-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          Welcome Back
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-300">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="test@algokart.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/10 border-gray-600 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-300">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white/10 border-gray-600 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {error && <p className="text-sm text-red-400 text-center">{error}</p>}

          <Button
            type="submit"
            className="w-full mt-3 bg-linear-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white text-lg font-medium rounded-xl shadow-lg hover:shadow-purple-500/30 transition-all duration-300 cursor-pointer"
          >
            Login
          </Button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-6">
          Don’t have an account?{" "}
          <span
            onClick={() => router.push("/")}
            className="text-indigo-400 cursor-pointer hover:underline"
          >
            Go Back Home
          </span>
        </p>
      </Card>
      <Footer />
    </main>
  );
};

export default LoginPage;
