import React from 'react'
import { Card, CardTitle } from './ui/card'
import Link from 'next/link'
import { Article } from '@/types/article'

type ArticleCardProps = {
  article: Article
}

const ArticleCard: React.FC<ArticleCardProps> = ({article}) => {
  return (
    <Card className='p-4'>
        <Link href={`/article/${article.id}`}>
            <CardTitle>{article.title}</CardTitle >
        </Link>
    </Card>
  )
}

export default ArticleCard;
