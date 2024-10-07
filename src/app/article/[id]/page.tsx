import ShareButtons from "@/components/ShareButtons";
import { ArticleDetailResponse } from "@/types/article";

function formatDate(dateString: string) {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

export default async function Page({ params }: { params: { id: number } }) {
  const response = await fetch(`${process.env.API_URL}/api/v1/articles/${params.id}`);
  const article: ArticleDetailResponse = await response.json();

  const shareUrl = `${process.env.NEXT_PUBLIC_APP_URL}/articles/${article.data.id}`;
  const title = `Check out this Article ${article.data.title}!`;

  return (
    <div className="bg-white px-6 py-6 rounded shadow-md col-span-2 h-fit">
      <h2 className="text-4xl font-bold text-indigo-700 mb-6">{article.data.title}</h2>

      <div className="text-gray-500 text-sm mb-4 flex flex-wrap space-y-1 md:space-y-0 md:space-x-4">
        <p>
          <strong>Slug:</strong> {article.data.slug}
        </p>
        <p>
          <strong>Created at:</strong> {formatDate(article.data.created_at)}
        </p>
        <p>
          <strong>Updated at:</strong> {formatDate(article.data.updated_at)}
        </p>
      </div>

      <div dangerouslySetInnerHTML={{ __html: article.data.content }} className="prose max-w-none mb-8 text-gray-800 leading-relaxed"></div>

      <div className="mt-8 border-t pt-6">
        <h3 className="text-2xl font-semibold mb-3 text-indigo-700">Share this article</h3>
        <div className="flex flex-wrap items-center space-x-3">
          <ShareButtons url={shareUrl} title={title} />
        </div>
      </div>
    </div>
  );
}
