"use client";

import { InputLabel } from "@/src/components/InputLabel/InputLabel";
import { useLoginUser } from "@/src/modules/users/querys/loginUserService";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const SignInForm = () => {
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

    if (email && password)
      mutation.mutate({
        email,
        password,
      });
  };

  return (
    <>
      {mutation.isError && (
        <p className="w-full text-center text-red-500">Error logging in</p>
      )}
      <form onSubmit={(e) => handleSubmit(e)}>
        <InputLabel
          id="email"
          type="email"
          label="Email"
          placeholder="email@example.com"
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
        <button
          type="submit"
          className="w-full rounded-full bg-pink-500 px-4 py-2 font-bold text-white transition-colors duration-200 hover:bg-pink-600"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "LOADING..." : "LOGIN"}
        </button>
      </form>
    </>
  );
};
