import {UseMutationOptions} from "@tanstack/react-query";

export type TMutationCustomOptions<
    TData = unknown,
    TError = unknown,
    TVariables = void,
    TContext = unknown
> = Omit<UseMutationOptions<TData, TError, TVariables, TContext>, "mutationFn">;
