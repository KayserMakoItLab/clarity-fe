import { AxiosResponse } from "axios";
import { QueryOptions, UseMutationOptions } from "react-query";

export type TUseMutationOption = Omit<
  UseMutationOptions<AxiosResponse<any, any>, unknown, any, unknown>,
  "mutationFn"
>;

export type TUseQueryOption<TData = unknown> = QueryOptions<TData, unknown>;

export type TAxiosConfig = {
  mock?: boolean;
};
