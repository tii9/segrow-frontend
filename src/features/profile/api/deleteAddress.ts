import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "~/lib/axios";
import { MutationConfig, queryClient } from "~/lib/react-query";
import { getAddressesByUserIdQueryKey } from "~/features/profile/api/getAddresses";

export const deleteAddress = async (addressId: string) => {
  const response = await axiosInstance.delete(`/address/${addressId}`, {
    withCredentials: true,
  });

  return response;
};

type UseDeleteAddressParams = {
  mutationConfig?: MutationConfig<typeof deleteAddress>;
};

export const useDeleteAddress = (params: UseDeleteAddressParams = {}) => {
  return useMutation({
    ...params.mutationConfig,
    mutationFn: deleteAddress,
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({
        queryKey: getAddressesByUserIdQueryKey(),
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
