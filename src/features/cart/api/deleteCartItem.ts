import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "~/lib/axios";
import { MutationConfig, queryClient } from "~/lib/react-query";
import { getCartsQueryKey } from "~/features/cart/api/getCarts";

export const deleteCartItem = async (cartItemId: string) => {
  const response = await axiosInstance.delete(
    `cart/items/${cartItemId}/delete`,
  );
  return response.data;
};

type UseDeleteCartItemParams = {
  mutationConfig?: MutationConfig<typeof deleteCartItem>;
};

export const useDeleteCartItem = (params: UseDeleteCartItemParams = {}) => {
  return useMutation({
    ...params.mutationConfig,
    mutationFn: deleteCartItem,
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
