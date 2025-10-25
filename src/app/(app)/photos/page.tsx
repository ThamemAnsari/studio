import Image from 'next/image';
import { photoAlbumData } from '@/lib/data';
import { formatDate } from '@/lib/utils';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { ImagePlaceholder } from '@/lib/placeholder-images';

export default function PhotoAlbumPage() {
  return (
    <div className="container mx-auto">
      <div className="text-center mb-8">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-accent">
          Our Photo Album
        </h1>
        <p className="mt-2 text-lg text-foreground/80">
          A collection of our cherished moments.
        </p>
      </div>
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        className="w-full max-w-4xl mx-auto"
      >
        <CarouselContent>
          {photoAlbumData.map((photo: ImagePlaceholder) => (
            <CarouselItem key={photo.id}>
              <div className="p-1">
                <Card className="glass-card overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                  <CardContent className="p-0">
                    <div className="aspect-video relative">
                      <Image
                        src={photo.imageUrl}
                        alt={photo.description}
                        fill
                        className="object-cover"
                        data-ai-hint={photo.imageHint}
                      />
                    </div>
                  </CardContent>
                  <CardHeader>
                    <CardTitle className="font-headline text-primary">{formatDate(new Date(photo.date))}</CardTitle>
                    <CardDescription className="text-foreground/90">{photo.description}</CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>
    </div>
  );
}
