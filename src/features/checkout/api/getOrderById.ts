import { queryOptions, useQuery } from "@tanstack/react-query";

import { axiosInstance } from "~/lib/axios";
import { QueryConfig } from "~/lib/react-query";

import { OrdersResponse } from "~/features/checkout/api/getOrdersByUser";

type OrderByIdResponse = {
  data: OrdersResponse["orders"][0] & {
    histories: {
      id: string;
      orderId: string;
      status:
        | "PENDING_PAYMENT"
        | "PAID"
        | "PROCESSING"
        | "SHIPPED"
        | "DELIVERED"
        | "COMPLETED"
        | "CANCELLED"
        | "REFUNDED";
      note: string | null;
      createdAt: string;
    }[];
  };
};

export const getOrderById = async (id: string) => {
  const response = await axiosInstance.get<OrderByIdResponse>(`order/${id}`);
  return response.data.data;
};

export const getOrderByIdQueryKey = (id: string) => ["order", id];

export const getOrderByIdQueryOptions = (id: string) => {
  return queryOptions({
    queryKey: getOrderByIdQueryKey(id),
    queryFn: () => getOrderById(id),
  });
};

type UseGetOrderByIdParams = {
  queryConfig?: QueryConfig<typeof getOrderByIdQueryOptions>;
  id: string;
};

export const useGetOrderById = (params: UseGetOrderByIdParams) => {
  return useQuery({
    ...getOrderByIdQueryOptions(params.id),
    ...params.queryConfig,
  });
};
