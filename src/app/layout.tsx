import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LiveLayout from "@/components/LiveLayout";
import { Providers } from "@/components/Providers";

export const metadata: Metadata = {
  title: "NGOAIHANG TV - Trực tiếp bóng đá Ngoại Hạng TV, xem TTBD online HD",
  description:
    "NGOAIHANG TV trực tiếp bóng đá hôm nay chất lượng cao, xem bóng đá online miễn phí tốc độ nhanh, bình luận hấp dẫn các giải Ngoại hạng Anh, La Liga, Serie A.",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/web-app-manifest-192x192.png",
    apple: "/web-app-manifest-192x192.png",
  },
  themeColor: "#0f1214",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className="h-full">
      <body className="min-h-full antialiased bg-white dark:bg-gray-900 transition-colors duration-200">
        <Providers>
          <Header />
          <main className="min-h-screen">
            <LiveLayout>
              {children}
            </LiveLayout>
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
