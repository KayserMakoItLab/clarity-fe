"use client";
import { TUseMutationOption } from "../types";
import { UseQueryOptions, useMutation, useQuery } from "react-query";
import taskService from "./task";
import { createTaskType } from "./types";

const useTasks = () => {
  const useGetAllTasks = (page: string, options?: UseQueryOptions) =>
    useQuery(
      ["get-all-tasks", page],
      () => taskService.getAllTasks(page),
      options as any
    );

  const useGetTaskById = (id: string, options?: UseQueryOptions) =>
    useQuery(
      ["get-task-by-id"],
      () => taskService.getTaskById(id),
      options as any
    );

  const useCreateTask = (options?: any) =>
    useMutation(
      ["create-task"],
      ( payload : createTaskType) => taskService.createTask(payload),
      options
    );

  const useEditTaskById = (options?: any) =>
    useMutation(
      ["edit-task-by-id"],
      ({
        id,
        payload,
      }: {
        id: string;
        payload: createTaskType;
      }) => taskService.editTaskById(id, payload),
      options
    );

  const useDeleteTask = (options?: any) =>
    useMutation(
      ["delete-task"],
      (id: string) => taskService.deleteTask(id),
      options
    );

  return {
    useGetAllTasks,
    useGetTaskById,
    useCreateTask,
    useEditTaskById,
    useDeleteTask,
  };
};

export default useTasks;
