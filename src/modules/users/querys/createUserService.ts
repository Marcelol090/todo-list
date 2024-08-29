import { MutationOptions, useMutation } from "@tanstack/react-query";

export type User = {
  userId: number;
  name: string;
  email: string;
  password: string;
};

export const createUserPath = "/api/user";

type CreateUserProps = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const createUser = async ({
  name,
  email,
  password,
  confirmPassword,
}: CreateUserProps): Promise<User> => {
  const response = await fetch(createUserPath, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      password,
      confirmPassword,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to create user");
  }

  return response.json();
};

type UseCreateUserOptions = MutationOptions<User, Error, CreateUserProps>;

export const useCreateUser = (options?: UseCreateUserOptions) => {
  return useMutation<User, Error, CreateUserProps>({
    ...options,
    mutationFn: (data: CreateUserProps) => createUser(data),
  });
};