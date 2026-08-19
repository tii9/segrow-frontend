import { Metadata } from "next";

export { default } from "~/features/order/views/OrderListPage";

export const metadata: Metadata = {
  title: "List Pesanan | SeGrow",
  description: "Lihat list pesanan Anda di SeGrow.",
  robots: {
    index: false,
    follow: false,
  },
};
