"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Logging in with:", { email, password });
  };

  const handleGoogleSignIn = () => {
    console.log("Signing in with Google");
  };

  const handleFacebookSignIn = () => {
    console.log("Signing in with Facebook");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
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
              Welcome Back 
            </motion.h2>
            <p className="text-center text-gray-500 dark:text-gray-400 text-sm">
              Login to your account to continue
            </p>

            <form onSubmit={handleLogin} className="space-y-6">
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
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
                transition={{ delay: 0.5 }}
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
                transition={{ delay: 0.6 }}
              >
                <Button
                  type="submit"
                  className="w-full py-2 rounded-xl text-lg font-semibold shadow-md hover:scale-105 transition-transform"
                >
                  Sign In
                </Button>
              </motion.div>
            </form>
            <div className="relative text-center">
              <span className="absolute inset-x-0 top-1/2 border-t border-gray-300 dark:border-gray-600" />
              <span className="relative bg-white dark:bg-gray-900 px-3 text-gray-500 dark:text-gray-400 text-sm">
                or 
              </span>
            </div>
            <div className="space-y-4">
              <Button
                onClick={handleGoogleSignIn}
                className="w-full flex items-center justify-center gap-2 bg-white text-gray-700 border border-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:border-gray-600"
              >
                <FcGoogle size={20} /> Sign in with Google
              </Button>
              <Button
                onClick={handleFacebookSignIn}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white hover:bg-blue-700"
              >
                <FaFacebookF size={18} /> Sign in with Facebook
              </Button>
            </div>
            <div className="text-center text-sm text-gray-500 dark:text-gray-400 pt-4">
              Don't have an account?{' '}
              <Link href="  /register" className="text-blue-600 hover:underline dark:text-blue-400">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
