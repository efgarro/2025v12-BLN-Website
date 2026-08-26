import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://idearapps.com",
});

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
