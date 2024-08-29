"use client";

import GirlLaptop from "@/src/Icons/GirlLaptop";
import { useCreateUser } from "@/src/modules/users/querys/createUserService";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SignUp = () => {
  const [name, setName] = useState<string | undefined>();
  const [email, setEmail] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();
  const [confirmPassword, setConfirmPassword] = useState<string | undefined>();

  const router = useRouter();

  const mutation = useCreateUser({
    onSuccess: () => {
      router.push("/");
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(name && email && password && confirmPassword){
      mutation.mutate({
        name,
        email,
        password,
        confirmPassword,
      });
    }
    
  };

  return (
    <div className="flex min-h-full items-center justify-center">
      <div className="flex w-full max-w-4xl overflow-hidden rounded-lg bg-white shadow-lg">
        <div className="w-full p-8 md:w-1/2">
          <div className="mb-10 text-center">
            <h2 className="mb-2 text-4xl font-bold text-gray-800">Sign Up</h2>
            <p className="text-gray-600">Create your account</p>
          </div>
    {mutation.isError && (
      <p className="mb-4 text-red-500">
        Erro ao criar o usuario
      </p>
    )}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="mb-2 block text-sm font-bold text-gray-700"
                htmlFor="name"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full rounded-lg border px-3 py-2 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                // required
              />
            </div>
            <div className="mb-4">
              <label
                className="mb-2 block text-sm font-bold text-gray-700"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full rounded-lg border px-3 py-2 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring"
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="mb-2 block text-sm font-bold text-gray-700"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full rounded-lg border px-3 py-2 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="mb-2 block text-sm font-bold text-gray-700"
                htmlFor="confirm-password"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirm-password"
                className="w-full rounded-lg border px-3 py-2 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring"
                placeholder="********"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-full bg-pink-500 px-4 py-2 font-bold text-white transition-colors duration-200 hover:bg-pink-600"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Creating..." : "SIGN UP"}
            </button>
          </form>
          <div className="mt-6 text-center">
            <Link href="/" className="text-sm text-pink-500 hover:underline">
              Already have an account? Log in
            </Link>
          </div>
        </div>

        <div className="relative hidden w-1/2 items-center justify-center bg-blue-100 md:flex">
          <GirlLaptop />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
