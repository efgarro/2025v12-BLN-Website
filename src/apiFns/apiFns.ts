import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";

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
