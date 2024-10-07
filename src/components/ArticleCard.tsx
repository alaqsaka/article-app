import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription } from './ui/card'
import Link from 'next/link'
import { Article } from '@/types/article'

type ArticleCardProps = {
  article: Article
}

const ArticleCard: React.FC<ArticleCardProps> = ({article}) => {
  return (
    <Link href={`/article/${article.id}`}>
    <Card className='p-2'>
      <CardHeader>
        <CardTitle>{article.title}</CardTitle>
        <CardDescription>{article.slug}</CardDescription>     
      </CardHeader>
    </Card>
  </Link>
  )
}

export default ArticleCard;
