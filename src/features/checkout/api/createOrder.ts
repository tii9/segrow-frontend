import { useMutation } from "@tanstack/react-query";

import { axiosInstance } from "~/lib/axios";
import { MutationConfig, queryClient } from "~/lib/react-query";

import { getCartsQueryKey } from "~/features/cart/api/getCarts";

type CreateOrderRequest = {
  payment: {
    paymentMethod: string;
  };
  items: {
    productId: string;
    quantity: number;
  }[];
  shippingAddress: {
    recipient: string;
    phone: string;
    street: string;
    district: string;
    detail: string;
    notes?: string;
  };
  shippingCost: number;
  notes?: string;
};

export type CreateOrderResponse = {
  data: {
    id: string;
    orderNumber: string;
    userId: string;
    status: string;
    subtotal: number;
    shippingCost: number;
    discount: number;
    total: number;
    notes?: string;
    createdAt: string;
    updatedAt: string;

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
      createdAt: string;
    }[];

    payment: {
      id: string;
      transactionStatus: string;
      paymentMethod: string;
      grossAmount: number;
      qrUrl?: string;
      vaNumber?: string;
      bank?: string;
      expiryTime?: string;
      paidAt?: string;
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
      createdAt: string;
      updatedAt: string;
    };
  };
};

const createOrder = async (createOrderRequest: CreateOrderRequest) => {
  const response = await axiosInstance.post<CreateOrderResponse>(
    "/order",
    createOrderRequest,
    {
      withCredentials: true,
    },
  );

  return response.data.data;
};

type UseCreateOrderParams = {
  mutationConfig?: MutationConfig<typeof createOrder>;
};

export const useCreateOrder = (params: UseCreateOrderParams = {}) => {
  return useMutation({
    ...params.mutationConfig,
    mutationFn: createOrder,
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({
        queryKey: getCartsQueryKey(),
      });

      params.mutationConfig?.onSuccess?.(
        data,
        variables,
        onMutateResult,
        context,
      );
    },
  });
};
