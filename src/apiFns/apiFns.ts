import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import axios from "axios";

const axiosInstance = axios.create({ baseURL: "http://localhost:4040" });

export const deferredOptions = () =>
  queryOptions({
    queryKey: ["deferred"],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 3000));
      return {
        message: `Hello deferred from the server!`,
        status: "success",
        time: new Date(),
      };
    },
  });

export const useGetDeferred = () => {
  return useSuspenseQuery(deferredOptions());
};

export const useGetImageStackOptions = (image_cluster_id: string) =>
  queryOptions({
    queryKey: ["cluster"],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/bln/cluster/cluster_stack/${image_cluster_id}`
      );
      return res.data;
    },
  });

export const useGetImageStack = (image_cluster_id: string) => {
  return useSuspenseQuery(useGetImageStackOptions(image_cluster_id));
};