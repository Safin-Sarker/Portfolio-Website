import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeWrapper from "@/components/ThemeWrapper";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MD Safin Sarker | Full Stack Developer & AI Specialist",
  description: "Full Stack Developer with expertise in ASP.NET Core, React, Next.js, and AI/ML. Specializing in Generative AI and building scalable software solutions. Currently at Laerdal Medical, Norway.",
  keywords: [
    "MD Safin Sarker",
    "Safin Sarker",
    "Full Stack Developer",
    "AI Specialist",
    "Machine Learning",
    "Stable Diffusion",
    "ASP.NET Core",
    "React",
    "Next.js",
    "Python",
    "TypeScript",
    "Norway Developer",
    "Stavanger",
    "Portfolio",
    "Software Engineer",
    "Generative AI",
    "LoRA Fine-tuning",
    "ComfyUI",
  ],
  authors: [{ name: "MD Safin Sarker" }],
  creator: "MD Safin Sarker",
  icons: {
    icon: '/images/logo.png',
    shortcut: '/images/logo.png',
    apple: '/images/logo.png',
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://safinsarker.com",
    title: "MD Safin Sarker | Full Stack Developer & AI Specialist",
    description: "Full Stack Developer with expertise in ASP.NET Core, React, Next.js, and AI/ML. Specializing in Generative AI and building scalable software solutions.",
    siteName: "MD Safin Sarker Portfolio",
    images: [
      {
        url: '/images/Safin .jpg',
        width: 1200,
        height: 630,
        alt: 'MD Safin Sarker - Full Stack Developer & AI Specialist',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MD Safin Sarker | Full Stack Developer & AI Specialist",
    description: "Full Stack Developer with expertise in ASP.NET Core, React, Next.js, and AI/ML. Specializing in Generative AI and building scalable software solutions.",
    images: ['/images/Safin .jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth dark" suppressHydrationWarning>
      <body className={inter.className}>
        <Script id="theme-script" strategy="beforeInteractive">
          {`
            (function() {
              try {
                var savedTheme = localStorage.getItem('theme');
                var theme = savedTheme || 'dark';
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (e) {}
            })();
          `}
        </Script>
        <ThemeWrapper>
          {children}
        </ThemeWrapper>
      </body>
    </html>
  );
}
