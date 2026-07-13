import type { Metadata } from "next";
import { Archivo, Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { MotionConfig } from "motion/react";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { PageLoader } from "@/components/layout/page-loader";
import { NoiseOverlay } from "@/components/layout/noise-overlay";
import { CustomCursor } from "@/components/layout/custom-cursor";
import { Header } from "@/components/layout/header";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jcmhomebuilders.com"),
  title: "JCM Home Builders — We Build It Right",
  description:
    "JCM Home Builders — visionary residential and commercial spaces, built to last.",
  openGraph: {
    title: "JCM Home Builders — We Build It Right",
    description:
      "Visionary residential and commercial spaces, built to last. Forward by design, built with purpose.",
    images: ["/images/jcm-brand-poster.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JCM Home Builders — We Build It Right",
    description: "Visionary residential and commercial spaces, built to last.",
    images: ["/images/jcm-brand-poster.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${archivo.variable} ${inter.variable} ${jetbrainsMono.variable} font-body antialiased`}
      >
        <MotionConfig reducedMotion="user">
          <SmoothScrollProvider>
            <PageLoader>
              <NoiseOverlay />
              <CustomCursor />
              <Header />
              {children}
            </PageLoader>
          </SmoothScrollProvider>
        </MotionConfig>
        <Analytics />
      </body>
    </html>
  );
}
