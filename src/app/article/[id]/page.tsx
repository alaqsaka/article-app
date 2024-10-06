import { ArticleDetailResponse } from "@/types/article";


export default async function  Page({ params }: { params: { id: number } }) {
    const data = await fetch(`${process.env.API_URL}/api/v1/articles/${params.id}`);
    const article: ArticleDetailResponse = await data.json();

    console.log('data article', article);


    return <div className="bg-white px-4 pb-4 rounded shadow-md col-span-2">My Article {article.data.title}</div>
  }