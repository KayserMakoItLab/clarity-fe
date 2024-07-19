"use client";
import { TUseMutationOption } from "../types";
import { UseQueryOptions, useMutation, useQuery } from "react-query";
import taskService from "./task";

const useTasks = () => {
  const useGetAllTasks = (options?: UseQueryOptions) =>
    useQuery(
      ["get-all-tasks"],
      () => taskService.getAllTasks(),
      options as any
    );

  return {
    useGetAllTasks,
  };
};

export default useTasks;
