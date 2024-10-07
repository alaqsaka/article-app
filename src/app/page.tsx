import ArticleCard from "@/components/ArticleCard";
import { CarouselArticle } from "@/components/CarouselArticle";

import { ArticlesResponse } from "@/types/article";

export default async function Home() {
  const data = await fetch(`${process.env.API_URL}/api/v1/articles?limit=12&page=1`);
  const articles: ArticlesResponse = await data.json();

  const featuredArticles = articles.data.data.slice(0, 4);
  const latestArticles = articles.data.data.slice(4); 

  return (
    <section className="bg-white px-4 pb-4 rounded shadow-md col-span-2 h-fit">
      <h2 className="text-2xl font-semibold mt-3">Featured Articles</h2>
      <CarouselArticle data={{ ...articles, data: { ...articles.data, data: featuredArticles } }} />

      <h2 className="text-2xl font-semibold mt-3">Latest Articles</h2>
      <div className="grid gap-2 grid-cols-1 md:grid-cols-3 grid-rows-3">
        {latestArticles.map(article => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>

      {/* TODO: PAGINATION */}
    </section>
  );
}
