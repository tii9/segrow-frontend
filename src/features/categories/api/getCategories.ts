import { queryOptions, useQuery } from "@tanstack/react-query";
import { QueryConfig } from "~/lib/react-query";
import { ApiResponse, axiosInstance } from "~/lib/axios";

export type CategoryResponse = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  type: string;
  slug: string;
};

export const getCategories = async () => {
  const response = await axiosInstance.get<ApiResponse<CategoryResponse[]>>(
    "/category?isActive=true",
  );

  return response.data.data;
};

export const getCategoriesQueryKey = () => ["category"];

export const getCategoriesQueryOptions = () => {
  return queryOptions({
    queryKey: getCategoriesQueryKey(),
    queryFn: getCategories,
  });
};

type UseGetCategoriesParams = {
  queryConfig?: QueryConfig<typeof getCategoriesQueryOptions>;
};

export const useGetCategories = (params: UseGetCategoriesParams = {}) => {
  return useQuery({
    ...getCategoriesQueryOptions(),
    ...params.queryConfig,
  });
};
