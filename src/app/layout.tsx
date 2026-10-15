import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  // Title Format Ideal: Nama Utama | Subtitle/Role
  title: {
    default: "Muhammad Faqih Hasan | UI/UX Designer & Frontend Developer",
    template: "%s | Muhammad Faqih Hasan",
  },
  description:
    "Portofolio resmi Muhammad Faqih Hasan — UI/UX Designer & Frontend Developer dari Jakarta. Spesialisasi dalam pembuatan pengalaman digital interaktif, Next.js, React, dan Branding.",
  keywords: [
    "Muhammad Faqih Hasan",
    "Faqih Hasan",
    "Faqih",
    "UI UX Designer Jakarta",
    "Frontend Developer LP3I",
    "Muhammad Faqih Hasan Portfolio",
    "Desainer Web Jakarta",
  ],
  authors: [{ name: "Muhammad Faqih Hasan" }],
  creator: "Muhammad Faqih Hasan",
  
  // Tag Google Search Console Baru
  verification: {
    google: "94QwAHR4nKIttpJao-gj2eNcJsrQ4aym-3GfG0fMpZ0",
  },

  // Open Graph (Tampilan saat link portofolio dibagikan di WA/LinkedIn/Twitter)
  openGraph: {
    title: "Muhammad Faqih Hasan — Personal Portfolio",
    description: "UI/UX Designer & Frontend Developer Portfolio.",
    url: "https://muhammadfaqihhasan.my.id", // Ganti dengan domain .my.id kamu
    siteName: "Muhammad Faqih Hasan Portfolio",
    locale: "id_ID",
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className="h-full antialiased scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col font-['Nunito',sans-serif] bg-[#050505] text-white">
        {children}
      </body>
    </html>
  );
}