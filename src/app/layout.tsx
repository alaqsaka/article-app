import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Category, CategoryResponse } from "@/types/article";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const response = await fetch(`${process.env.API_URL}/api/v1/categories`);
  const categories: CategoryResponse = await response.json(); 

  // TODO: Fetch article by category

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <header className="sticky top-0 z-10 text-white body-font bg-gradient-to-r from-violet-800 to-indigo-500">
          <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
            <a href="/" className="flex title-font font-medium items-center tex-white mb-4 md:mb-0">
              <span className="ml-3 text-xl font-bold">Dealls!</span>
            </a>
          </div>
        </header>

        <div className="min-h-screen bg-gray-100">
          <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {children}
              <aside className="space-y-4">
                {categories.data.map((category: Category) => (
                  <div key={category.id} className="bg-white p-4 rounded shadow-md">
                    <h3 className="text-xl font-semibold mb-2">{category.name} Articles</h3>
                    <ul className="space-y-2">
                      {/* TODO: articles based on category */}
                      <li>article 1</li>
                      <li>article 1</li>
                      <li>article 1</li>
                    </ul>
                  </div>
                ))}
              </aside>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
