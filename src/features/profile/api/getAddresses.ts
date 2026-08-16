import { queryOptions, useQuery } from "@tanstack/react-query";
import { ApiResponse, axiosInstance } from "~/lib/axios";

export type AddressResponse = {
  id: string;
  recipient: string;
  phone: string;
  detail: string;
  city: string;
  district: string;
  street: string;
  notes: string;
  isDefault: boolean;
};

export const getAddressesByUserId = async () => {
  const response = await axiosInstance.get<ApiResponse<AddressResponse[]>>(
    `/address`,
    {
      withCredentials: true,
    },
  );

  return response.data.data;
};

export const getAddressesByUserIdQueryKey = () => ["addresses"];

export const getAddressesByUserIdQueryOptions = () => {
  return queryOptions({
    queryKey: getAddressesByUserIdQueryKey(),
    queryFn: () => getAddressesByUserId(),
  });
};

export type UseGetAddressesByUserIdParams = {
  queryConfig?: Parameters<typeof getAddressesByUserIdQueryOptions>;
  userId: string;
};

export const useGetAddressesByUserId = (
  params: UseGetAddressesByUserIdParams,
) => {
  return useQuery({
    ...getAddressesByUserIdQueryOptions(),
    ...params.queryConfig,
  });
};
