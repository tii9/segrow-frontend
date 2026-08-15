import { Metadata } from "next";

export { default } from "~/features/auth/views/SignUpPage";

export const metadata: Metadata = {
  title: "Daftar akun | SeGrow",
  description:
    "Buat akun SeGrow untuk mulai memesan meal kit segar, mengatur meal plan, dan menikmati pengalaman memasak yang lebih praktis.",
  robots: {
    index: false,
    follow: false,
  },

  openGraph: {
    title: "Daftar | SeGrow",
    description:
      "Gabung dengan SeGrow dan nikmati meal kit praktis untuk kebutuhan masak harianmu.",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Daftar | SeGrow",
    description:
      "Buat akun SeGrow dan mulai pengalaman memasak yang lebih mudah.",
  },
};
