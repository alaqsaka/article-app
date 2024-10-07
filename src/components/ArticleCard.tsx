"use client";

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from './ui/card';
import Link from 'next/link';
import { Article } from '@/types/article';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Share2 } from 'lucide-react';
import ShareButtons from './ShareButtons';

type ArticleCardProps = {
  article: Article;
};

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const [open, setOpen] = useState(false);
  const shareUrl = `${process.env.NEXT_PUBLIC_APP_URL}/articles/${article.id}`;
  const title = `Check out this Article ${article.title}!`;

  const handleShareClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(true);
  };

  return (
    <div>
      <Card className="p-4 transition transform hover:-translate-y-1 hover:shadow-lg rounded-lg border border-gray-200 hover:border-gray-300 bg-white h-full">
        <Link href={`/article/${article.id}`}>
          <div className="cursor-pointer">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900 transition hover:text-blue-600">
                {article.title}
              </CardTitle>
              <CardDescription className="text-gray-600 text-sm mt-1">{article.slug}</CardDescription>
            </CardHeader>
          </div>
        </Link>

        <CardFooter className="flex justify-end mt-4">
          <button
            onClick={handleShareClick}
            aria-label="Share"
            className="transition transform hover:scale-110 text-gray-500 hover:text-blue-600"
          >
            <Share2 className="w-6 h-6" />
          </button>
        </CardFooter>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button className="hidden" />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <p>{shareUrl}</p>
          </DialogHeader>
          <ShareButtons url={shareUrl} title={title} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ArticleCard;
