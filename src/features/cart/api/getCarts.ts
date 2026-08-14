import { queryOptions, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "~/lib/axios";
import { QueryConfig } from "~/lib/react-query";

export type CartProps = {
  id?: string;
  totalItem: number;
  totalPrice: number;
  items: {
    id: string;
    quantity: number;
    product: {
      id: string;
      name: string;
      price: number;
      stock: number;
      cookingTime: number;
      portion: number;
      imageUrl: string | null;
    };
  }[];
};

type CartResponse = {
  data: {
    id?: string;
    totalItem: number;
    totalPrice: number;
    items: {
      id: string;
      quantity: number;
      product: {
        id: string;
        name: string;
        price: number;
        stock: number;
        cookingTime: number;
        portion: number;
        imageUrl: string | null;
      };
    }[];
  };
};

export const getCarts = async () => {
  const response = await axiosInstance.get<CartResponse>("/cart");

  return response.data.data;
};

export const getCartsQueryKey = () => ["carts"];

export const getCartsQueryOptions = () => {
  return queryOptions({
    queryKey: getCartsQueryKey(),
    queryFn: getCarts,
  });
};

type UseGetCartsParams = {
  queryConfig?: QueryConfig<typeof getCartsQueryOptions>;
};

export const useGetCarts = (params: UseGetCartsParams = {}) => {
  return useQuery({
    ...getCartsQueryOptions(),
    ...params.queryConfig,
  });
};
