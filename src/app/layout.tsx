import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "~/lib/utils";
import { Toaster } from "~/components/ui/toast";
import { QueryProvider } from "~/components/providers/QueryProvider";

// const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "SeGrow",
  description:
    "SeGrow membantu kamu memasak lebih praktis dengan meal kit segar, resep mudah diikuti, dan pengiriman langsung ke rumah.",
  keywords: [
    "meal kit",
    "healthy food",
    "meal prep",
    "resep masakan",
    "paket masak",
    "makanan sehat",
    "SeGrow",
    "fresh ingredients",
    "cooking kit",
  ],
  authors: [{ name: "SeGrow" }],
  creator: "SeGrow",
  publisher: "SeGrow",
  metadataBase: new URL("https://segrow.id"),

  openGraph: {
    title: "SeGrow",
    description:
      "Nikmati pengalaman memasak yang lebih mudah dengan meal kit segar dan resep praktis dari SeGrow.",
    url: "https://segrow.id",
    siteName: "SeGrow",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SeGrow Meal Kit",
      },
    ],
    locale: "id_ID",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "SeGrow",
    description:
      "Meal kit segar dan praktis untuk membantu kamu memasak lebih mudah setiap hari.",
    images: ["/og-image.jpg"],
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  category: "food",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        plusJakartaSans.className,
        plusJakartaSans.variable,
        "font-sans",
      )}
    >
      <QueryProvider>
        <body className="flex flex-col font-sans">
          {children}
          <Toaster />
        </body>
      </QueryProvider>
    </html>
  );
}
