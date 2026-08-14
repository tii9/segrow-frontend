export { default } from "~/features/products/views/ProductsPage";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Produk | SeGrow",
  description:
    "Temukan berbagai pilihan meal kit SeGrow dengan bahan segar, resep praktis, dan informasi nutrisi lengkap untuk membantu Anda memasak dengan mudah di rumah.",

  keywords: [
    "SeGrow",
    "meal kit",
    "produk meal kit",
    "makanan sehat",
    "belanja meal kit",
    "sayuran segar",
    "protein",
    "resep masakan",
  ],

  openGraph: {
    title: "Produk | SeGrow",
    description:
      "Jelajahi koleksi meal kit SeGrow yang dirancang untuk memudahkan Anda memasak hidangan lezat dan bergizi di rumah.",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Produk | SeGrow",
    description:
      "Temukan meal kit berkualitas dengan resep praktis dan informasi nutrisi lengkap.",
  },

  robots: {
    index: true,
    follow: true,
  },
};
