import { MutationOptions, useMutation } from "@tanstack/react-query";

export type Token = {
  token: string;
};

export const loginUserPath = "/api/user/login";

type LoginUserProps = {
  email: string;
  password: string;
};

export const loginUser = async ({
  email,
  password,
}: LoginUserProps): Promise<Token> => {
  const response = await fetch(loginUserPath, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to login user");
  }

  return response.json();
};

type UseLoginUserOptions = MutationOptions<Token, Error, LoginUserProps>;

export const useLoginUser = (options?: UseLoginUserOptions) => {
  return useMutation<Token, Error, LoginUserProps>({
    ...options,
    mutationFn: (data: LoginUserProps) => loginUser(data),
  });
};
