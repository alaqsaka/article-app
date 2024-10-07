import ArticleCard from "@/components/ArticleCard";
import { CarouselArticle } from "@/components/CarouselArticle";
import { ArticlesResponse } from "@/types/article";
import Link from 'next/link';

async function getArticles(page: number) {
  const res = await fetch(`${process.env.API_URL}/api/v1/articles?limit=12&page=${page}`);
  const data: ArticlesResponse = await res.json();
  return data;
}

export default async function Home({ searchParams }: { searchParams: { page?: string } }) {
  const currentPage = searchParams.page ? parseInt(searchParams.page, 10) : 1;

  const articles = await getArticles(currentPage);
  const featuredArticles = articles.data.data.slice(0, 4);
  const latestArticles = articles.data.data.slice(4);
  const totalPages = articles.data.metadata.total_pages || 1;

  return (
    <section className="bg-white px-4 pb-4 rounded shadow-md md:col-span-2 h-fit">
      <h2 className="text-2xl font-semibold mt-3">Featured Articles</h2>
      <CarouselArticle data={{ ...articles, data: { ...articles.data, data: featuredArticles } }} />

      <h2 className="text-2xl font-semibold mt-3">Latest Articles</h2>
      <div className="grid gap-3 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 grid-rows-3">
        {latestArticles.map(article => (
         <ArticleCard article={article} key={article.id}/>
        ))}
      </div>

      <div className="flex justify-between items-center mt-6">
        <Link href={`/?page=${currentPage - 1}`} passHref>
          <button
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Previous
          </button>
        </Link>

        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>

        <Link href={`/?page=${currentPage + 1}`} passHref>
          <button
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Next
          </button>
        </Link>
      </div>
    </section>
  );
}
