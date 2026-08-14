import { useMutation } from "@tanstack/react-query";
import { getCartsQueryKey } from "~/features/cart/api/getCarts";
import { axiosInstance } from "~/lib/axios";
import { MutationConfig, queryClient } from "~/lib/react-query";

type AddToCartRequest = {
  productId: string;
  quantity: number;
};

export const addToCart = async (addToCartItem: AddToCartRequest) => {
  const response = await axiosInstance.post("/cart/items", addToCartItem);
  return response.data;
};

type UseAddToCartParams = {
  mutationConfig?: MutationConfig<typeof addToCart>;
};

export const useAddToCart = (params: UseAddToCartParams = {}) => {
  return useMutation({
    ...params.mutationConfig,
    mutationFn: addToCart,
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: getCartsQueryKey() });

      params.mutationConfig?.onSuccess?.(
        data,
        variables,
        onMutateResult,
        context,
      );
    },
  });
};
