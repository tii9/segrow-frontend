import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "~/lib/axios";
import { MutationConfig, queryClient } from "~/lib/react-query";
import { getAddressesByUserIdQueryKey } from "~/features/profile/api/getAddresses";

const setDefaultAddress = async (addressId: string) => {
  const response = await axiosInstance.patch(
    `/address/${addressId}/default`,
    {},
    {
      withCredentials: true,
    },
  );

  return response;
};

type UseSetDefaultAddressParams = {
  mutationConfig?: MutationConfig<typeof setDefaultAddress>;
};

export const useSetDefaultAddress = (
  params: UseSetDefaultAddressParams = {},
) => {
  return useMutation({
    ...params.mutationConfig,
    mutationFn: setDefaultAddress,
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
