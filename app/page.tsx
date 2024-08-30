"use client";

import Cactus from "@/src/Icons/Cactus";
import GirlLaptop from "@/src/Icons/GirlLaptop";
import { useLoginUser } from "@/src/modules/users/querys/loginUserService";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SignIn = () => {
  const [email, setEmail] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();

  const router = useRouter();

  const mutation = useLoginUser({
    onSuccess: () => {
      router.push("/home");
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email && password) {
      mutation.mutate({
        email,
        password,
      });
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Form Section */}
        <div className="w-1/2 p-8">
          <div className="mb-10 text-center">
            <h2 className="text-4xl font-bold text-gray-800 mb-2">Sign In</h2>
            <p className="text-gray-600">Welcome back !!!</p>
          </div>
          {mutation.isError && (
            <p className="mb-4 text-red-500">Erro ao logar o usuario</p>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:border-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="login@gmail.com"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:border-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-pink-500 text-white font-bold py-2 px-4 rounded-full hover:bg-pink-600 transition-colors duration-200"
            >
              LOGIN
            </button>
          </form>
          <div className="mt-6 text-center">
            <Link
              href="/sign-up"
              className="text-sm text-pink-500 hover:underline"
            >
              Don’t have an account yet? Sign up for free
            </Link>
          </div>
        </div>

        {/* Image Section */}
        <div className="w-1/2 bg-blue-100 relative">
          <GirlLaptop />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
