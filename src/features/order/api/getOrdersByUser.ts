import { queryOptions, useQuery } from "@tanstack/react-query";

import { QueryConfig } from "~/lib/react-query";
import { ApiResponse, axiosInstance } from "~/lib/axios";

export type OrdersResponse = {
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
  orders: {
    id: string;
    orderNumber: string;
    userId: string;
    status: string;
    subtotal: number;
    shippingCost: number;
    discount: number;
    total: number;
    notes?: string;
    createdAt: Date;
    updatedAt: Date;

    items: {
      id: string;
      orderId: string;
      productId: string;
      productName: string;
      productImage: string;
      productSlug: string;
      price: number;
      quantity: number;
      subtotal: number;
      createdAt: Date;
    }[];

    payment: {
      id: string;
      transactionStatus: string;
      paymentMethod: string;
      grossAmount: number;
      qrUrl?: string;
      vaNumber?: string;
      bank?: string;
      expiryTime?: Date;
      paidAt?: Date;
    };

    shippingAddress: {
      id: string;
      orderId: string;
      recipient: string;
      phone: string;
      detail: string;
      city: string;
      district: string;
      street: string;
      notes: string;
      createdAt: Date;
      updatedAt: Date;
    };
  }[];
};

export const getOrdersByUser = async () => {
  const response =
    await axiosInstance.get<ApiResponse<OrdersResponse>>("/order");

  return response.data.data;
};

export const getOrdersByUserQueryKey = () => ["order"];

export const getOrdersByUserQueryOptions = () => {
  return queryOptions({
    queryKey: getOrdersByUserQueryKey(),
    queryFn: getOrdersByUser,
  });
};

type UseGetOrdersByUserParams = {
  queryConfig?: QueryConfig<typeof getOrdersByUserQueryOptions>;
};

export const useGetOrders = (params: UseGetOrdersByUserParams = {}) => {
  return useQuery({
    ...getOrdersByUserQueryOptions(),
    ...params.queryConfig,
  });
};
