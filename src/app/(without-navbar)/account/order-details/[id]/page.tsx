import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getOrderByIdQueryOptions } from "~/features/order/api/getOrderById";
import { getOrderByIdServer } from "~/features/order/api/getOrderById.server";
import OrderDetailsPage from "~/features/order/views/OrderDetailsPage";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export const metadata: Metadata = {
  title: "Detail Pesanan | SeGrow",
  description: "Lihat detail pesanan dan status pembayaran Anda di SeGrow.",
  robots: {
    index: false,
    follow: false,
  },
};

const Page = async ({ params }: Props) => {
  const { id } = await params;

  const order = await getOrderByIdServer(id);

  if (!order) {
    notFound();
  }

  const queryClient = new QueryClient();

  const queryOptions = getOrderByIdQueryOptions(id);

  queryClient.setQueryData(queryOptions.queryKey, order);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <OrderDetailsPage id={id} />
    </HydrationBoundary>
  );
};

export default Page;
