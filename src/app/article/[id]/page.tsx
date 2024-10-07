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

  const shareUrl = `${process.env.APP_URL}/articles/${article.data.id}`;
  const title = `Check out this Article ${article.data.title}!`;

  return (
    <div className="bg-white px-6 py-6 rounded shadow-md col-span-2 h-fit">
      <h2 className="text-3xl font-semibold mb-4">{article.data.title}</h2>

      <p className="text-sm text-gray-600 mb-2">
        <strong>Slug:</strong> {article.data.slug}
      </p>
      
      <p className="text-sm text-gray-600 mb-2">
        <strong>Created at:</strong> {formatDate(article.data.created_at)}
      </p>
      
      <p className="text-sm text-gray-600 mb-2">
        <strong>Updated at:</strong> {formatDate(article.data.updated_at)}
      </p>

      <div dangerouslySetInnerHTML={{ __html: article.data.content }} className="mt-4 prose"></div>

      {/* Share section */}
      <h3 className="text-xl font-semibold mt-4">
        Share
      </h3>
      <div className="flex space-x-2 mt-2">
        <ShareButtons url={shareUrl} title={title} />
      </div>
    </div>
  );
}
