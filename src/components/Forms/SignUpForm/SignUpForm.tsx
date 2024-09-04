"use client";

import { InputLabel } from "@/src/components/InputLabel/InputLabel";
import { useCreateUser } from "@/src/modules/users/querys/createUserService";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const SignUpForm = () => {
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

    if (name && email && password && confirmPassword)
      mutation.mutate({
        name,
        email,
        password,
        confirmPassword,
      });
  };

  return (
    <>
      {mutation.isError && (
        <p className="w-full text-center text-red-500">Error on Sign in</p>
      )}
      <form onSubmit={(e) => handleSubmit(e)}>
        <InputLabel
          id="name"
          placeholder="John Doe"
          type="text"
          label="Name"
          onChange={(e) => setName(e.target.value)}
          value={name}
          required
        />
        <InputLabel
          id="email"
          placeholder="email@example.com"
          type="email"
          label="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
        <InputLabel
          id="password"
          type="password"
          label="Password"
          placeholder="********"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
        <InputLabel
          id="confirm-password"
          placeholder="********"
          type="password"
          label="Confirm Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
          required
        />
        <button
          type="submit"
          className="w-full rounded-full bg-pink-500 px-4 py-2 font-bold text-white transition-colors duration-200 hover:bg-pink-600"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Creating..." : "SIGN UP"}
        </button>
      </form>
    </>
  );
};
