import React from 'react'
import { Card, CardContent } from './ui/card'
import { Article } from '@/types/article'
import Link from 'next/link'

type ArticleCardProps = {
  article: Article
}

const ArticleCardCarousel: React.FC<ArticleCardProps> = ({article}) => {
  return (
    <Card>
      <Link href={`/article/${article.id}`}>
        <CardContent className='flex aspect-square items-center justify-center p-6 max-h-[500px]'>{article.title}</CardContent >
      </Link>
    </Card>
  )
}

export default ArticleCardCarousel;
