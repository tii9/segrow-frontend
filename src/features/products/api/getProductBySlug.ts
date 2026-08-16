import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "~/lib/axios";
import { QueryConfig } from "~/lib/react-query";

type ProductResponse = {
  data: {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    imageUrl: string;
    averageRating: number;
    reviewCount: number;
    cookingTime: number;
    portion: number;
    category: {
      name: string;
    };
  };
};

export const getProductBySlug = async (slug: string) => {
  const response = await axiosInstance.get<ProductResponse>(`/product/${slug}`);

  return response.data.data;
};

export const getProductBySlugQueryKey = (slug: string) => ["product", slug];

export const getProductBySlugQueryOptions = (slug: string) => {
  return {
    queryKey: getProductBySlugQueryKey(slug),
    queryFn: () => getProductBySlug(slug),
  };
};

type UseGetProductBySlugParams = {
  queryConfig: QueryConfig<typeof getProductBySlugQueryOptions>;
  slug: string;
};

export const useGetProductBySlug = (params: UseGetProductBySlugParams) => {
  return useQuery({
    ...getProductBySlugQueryOptions(params.slug),
    ...params.queryConfig,
  });
};
