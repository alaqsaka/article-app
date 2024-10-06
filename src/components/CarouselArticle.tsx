import * as React from "react"

import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
} from "@/components/ui/carousel"
import { ArticlesResponse } from "@/types/article"
import ArticleCardCarousel from "./ArticleCardCarousel"

type CarouselArticle = {
    data: ArticlesResponse;
}

export function CarouselArticle({data}: CarouselArticle) {
  return (
    <Carousel className="w-full">
      <CarouselContent>
        {data.data.data.map((article, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <ArticleCardCarousel article={article}/>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselDots />
    </Carousel>
  )
}
