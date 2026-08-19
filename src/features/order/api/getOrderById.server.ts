import "server-only";

import axios from "axios";
import { cookies } from "next/headers";

export const getOrderByIdServer = async (id: string) => {
  const cookieStore = await cookies();

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/order/${id}`,
      {
        headers: {
          Cookie: cookieStore.toString(),
          "Content-Type": "application/json",
        },
      },
    );

    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return null;
    }

    throw error;
  }
};
