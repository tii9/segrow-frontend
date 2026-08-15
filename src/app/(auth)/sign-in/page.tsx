import { Metadata } from "next";

export { default } from "~/features/auth/views/SignInPage";

export const metadata: Metadata = {
  title: "Masuk | SeGrow",
  description:
    "Masuk ke akun SeGrow untuk mengakses meal kit favorit, melacak pesanan, dan mengatur meal plan harianmu.",
  robots: {
    index: false,
    follow: false,
  },

  openGraph: {
    title: "Masuk | SeGrow",
    description:
      "Lanjutkan pengalaman memasak yang lebih praktis bersama SeGrow.",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Masuk | SeGrow",
    description: "Masuk ke akun SeGrow dan nikmati meal kit segar setiap hari.",
  },
};
