import {
  InfiniteData,
  infiniteQueryOptions,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { ApiResponse, axiosInstance } from "~/lib/axios";
import { QueryConfig } from "~/lib/react-query";

export type ProductResponse = {
  totalProducts: number;
  data: {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    slug: string;
    imageUrl: string;
    categoryId: string;
    category: {
      name: string;
    };
  }[];
  nextCursor: string;
};

type UseGetProductsParams = {
  queryConfig?: QueryConfig<typeof getProductsQueryOptions>;
  take?: number;
  limit?: number;
  cursor?: string | null;
  category?: string;
  sort?: string;
  search?: string;
};

export const getProducts = async ({
  limit,
  cursor,
  category,
  sort,
  search,
}: UseGetProductsParams): Promise<ProductResponse> => {
  const response = await axiosInstance.get<ApiResponse<ProductResponse>>(
    "product/customer",
    {
      params: {
        limit,
        cursor,
        category,
        sort,
        search,
      },
    },
  );

  return response.data.data;
};

export const getProductsQueryKey = ({
  limit,
  category,
  sort,
  search,
}: UseGetProductsParams) =>
  [
    "product",
    {
      limit,
      category,
      sort,
      search,
    },
  ] as const;

export const getProductsQueryOptions = (
  limit: number,
  category?: string,
  sort?: string,
  search?: string,
) => {
  return infiniteQueryOptions<
    ProductResponse,
    Error,
    InfiniteData<ProductResponse>,
    ReturnType<typeof getProductsQueryKey>,
    string | undefined
  >({
    queryKey: getProductsQueryKey({ limit, category, sort, search }),

    initialPageParam: undefined,

    queryFn: ({ pageParam }) =>
      getProducts({
        limit,
        cursor: pageParam,
        category,
        sort,
        search,
      }),

    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
};

export const useGetProducts = (params?: UseGetProductsParams) => {
  const { take = 6, category, sort, search, queryConfig } = params ?? {};

  return useInfiniteQuery({
    ...getProductsQueryOptions(take, category, sort, search),
    ...queryConfig,
  });
};
