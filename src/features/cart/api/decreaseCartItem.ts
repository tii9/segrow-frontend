import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "~/lib/axios";
import { MutationConfig, queryClient } from "~/lib/react-query";
import { getCartsQueryKey } from "~/features/cart/api/getCarts";

export const decreaseCartItem = async (cartItemId: string) => {
  const response = await axiosInstance.patch(
    `cart/items/${cartItemId}/decrease`,
  );
  return response.data;
};

type UseDecreaseCartItemParams = {
  mutationConfig?: MutationConfig<typeof decreaseCartItem>;
};

export const useDecreaseCartItem = (params: UseDecreaseCartItemParams = {}) => {
  return useMutation({
    ...params.mutationConfig,
    mutationFn: decreaseCartItem,
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
