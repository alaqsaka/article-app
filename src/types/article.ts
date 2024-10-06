export type Article = {
    id: number;
    slug: string;
    title: string;
  };
  
  export type ArticleDetail = {
    id: number;
    slug: string;
    title: string;
    content: string;
    created_at: string; 
    updated_at: string; 
  };
  
  export type ArticlesResponse = {
    code: number;
    data: {
      data: Article[];
      metadata: {
        page: number;
        limit: number;
        total_docs: number;
        total_pages: number;
        has_next_page: boolean;
      };
    };
  };
  
  export type ArticleDetailResponse = {
    code: number;
    data: ArticleDetail;
  };
  