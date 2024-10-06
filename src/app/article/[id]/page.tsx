import { ArticleDetailResponse } from "@/types/article";

function formatDate(dateString: string) {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

export default async function Page({ params }: { params: { id: number } }) {
  const response = await fetch(`${process.env.API_URL}/api/v1/articles/${params.id}`);
  const article: ArticleDetailResponse = await response.json();

  return (
    <div className="bg-white px-6 py-6 rounded shadow-md col-span-2 h-fit">

      {/* TODO: Add Share Functionality */}
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
    </div>
  );
}
