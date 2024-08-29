import {
  QueryClient,
  type UseQueryOptions,
  type UseMutationOptions,
  type DefaultOptions,
  type UseInfiniteQueryOptions,
} from "@tanstack/react-query";

const queryConfig: DefaultOptions = {
  queries: {
    retry: 10,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  },
};

export const queryClient = new QueryClient({
  defaultOptions: queryConfig,
});

type ExtractFnReturnType<FnType extends (...args: any) => any> = Awaited<
  ReturnType<FnType>
>;

export type QueryFnOptions<TQueryFnData = unknown, TData = TQueryFnData> = Omit<
  UseQueryOptions<TQueryFnData, TData, any[]>,
  "queryKey" | "queryFn" | "initialData"
>;

export type InfiniteQueryFnOptions<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryData = TQueryFnData
> = Omit<
  UseInfiniteQueryOptions<TQueryFnData, TError, TData, TQueryData, any[]>,
  "queryKey" | "queryFn" | "initialData"
>;

type Fn = (...args: any[]) => any;

type GetTVariables<T> = T extends (...args: infer R) => any
  ? R extends [infer TVar, ...any]
    ? TVar
    : void
  : never;

export type MutationFnOptions<MutationFnType extends Fn> = UseMutationOptions<
  ExtractFnReturnType<Awaited<ReturnType<MutationFnType>>>,
  GetTVariables<MutationFnType>
>;
