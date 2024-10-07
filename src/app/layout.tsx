import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Article, CategoryResponse } from "@/types/article";
import Link from "next/link";

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
  title: "Dealls Article!",
  description: "Article by Dealls!",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const response = await fetch(`${process.env.API_URL}/api/v1/categories`);
  const categories: CategoryResponse = await response.json(); 

  const articlesCategory = await Promise.all(
    categories.data.map(async (category) => {
      const articlesByCategory = await fetch(
        `${process.env.API_URL}/api/v1/articles?limit=5&page=1&category_id=${category.id}`
      );
      const articlesResponse = await articlesByCategory.json();
      return {
        categoryName: category.name,
        articles: articlesResponse.data.data,
      };
    })
  );

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
                {articlesCategory.map((category, index) => (
                  <div key={index} className="bg-white p-4 rounded shadow-md">
                    <h3 className="text-xl font-semibold mb-2">{category.categoryName} Articles</h3>
                    <ul className="space-y-2">
                      {category.articles.map((article: Article) => (
                        <Link key={article.id} href={`/article/${article.id}`} className="p-1 underline">
                          <li>
                            {article.title}
                          </li>
                        </Link>
                      ))}
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
