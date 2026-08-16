import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "~/lib/axios";
import { MutationConfig, queryClient } from "~/lib/react-query";
import { getAddressesByUserIdQueryKey } from "~/features/profile/api/getAddresses";
import { SalatigaDistrict } from "~/features/profile/views/CreateAddressPage";

type CreateAddressRequest = {
  recipient: string;
  phone: string;
  detail: string;
  city: string;
  district: SalatigaDistrict;
  street: string;
  notes: string;
};

const createAddress = async (createAddressRequest: CreateAddressRequest) => {
  const response = await axiosInstance.post("/address", createAddressRequest, {
    withCredentials: true,
  });

  return response.data;
};

type UseCreateAddressParams = {
  mutationConfig?: MutationConfig<typeof createAddress>;
};

export const useCreateAddress = (params: UseCreateAddressParams = {}) => {
  return useMutation({
    ...params.mutationConfig,
    mutationFn: createAddress,
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
