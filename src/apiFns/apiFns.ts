import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://idearapps.com",
});

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

// export const useGetImageStackOptions = (image_cluster_id: string) =>
//   queryOptions({
//     queryKey: ["cluster"],
//     queryFn: async () => {
//       const res = await axiosInstance.get(
//         `/bln/cluster/cluster_stack/${image_cluster_id}`
//       );
//       return res.data;
//     },
//   });

// export const useGetImageStack = (image_cluster_id: string) => {
//   return useSuspenseQuery(useGetImageStackOptions(image_cluster_id));
// };
export const useGetImageMixOptions = (image_mix_name: string) =>
  queryOptions({
    queryKey: ["cluster_mix"],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/bln/cluster/cluster_mix/${image_mix_name}`
      );
      return res.data;
    },
  });

export const useGetImageMix = (image_mix_name: string) => {
  return useSuspenseQuery(useGetImageMixOptions(image_mix_name));
};
