"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import Link from "next/link";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Registering:", { name, email, password });
  };

  const handleGoogleRegister = () => {
    console.log("Register with Google");
  };

  const handleFacebookRegister = () => {
    console.log("Register with Facebook");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-blue-500 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <Card className="shadow-2xl rounded-3xl bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 border border-gray-200 dark:border-gray-700">
          <CardContent className="p-10 space-y-6">
            <motion.h2
              className="text-4xl font-extrabold text-center mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Create Account
            </motion.h2>
            <p className="text-center text-gray-500 dark:text-gray-400 text-sm">
              Sign up with your credentials
            </p>
            <form onSubmit={handleRegister} className="space-y-6">
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="rounded-xl"
                />
              </motion.div>
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="rounded-xl"
                />
              </motion.div>
              <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="rounded-xl"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <Button
                  type="submit"
                  className="w-full py-2 rounded-xl text-lg font-semibold shadow-md hover:scale-105 transition-transform"
                >
                  Sign Up
                </Button>
              </motion.div>
            </form>
            <div className="text-center text-sm text-gray-500 dark:text-gray-400 pt-4">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-blue-600 hover:underline dark:text-blue-400"
              >
                Sign In
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
