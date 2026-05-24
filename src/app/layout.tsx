import type { Metadata } from "next";
import { Outfit, Inter, Prompt } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import { LanguageToggle } from "@/components/LanguageToggle";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const prompt = Prompt({
  variable: "--font-prompt",
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["thai", "latin"],
});

export const metadata: Metadata = {
  title: "MyTurn - The Peak-Hour Revenue Optimization Engine",
  description:
    "The Peak-Hour Revenue Optimization Engine for busy restaurants.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.variable} ${inter.variable} ${prompt.variable}`}>
        <LanguageProvider>
          <ThemeProvider>
            {children}
            <div
              style={{
                position: "fixed",
                bottom: "24px",
                right: "24px",
                zIndex: 10000,
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <LanguageToggle />
              <ThemeToggle />
            </div>
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
