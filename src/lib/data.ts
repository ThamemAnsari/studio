import { PlaceHolderImages } from './placeholder-images';

export const timelineData = [
  {
    id: 1,
    date: new Date('2020-02-14'),
    title: 'Our First Date',
    description: 'A coffee date that turned into a five-hour conversation. We both knew this was something special.',
    image: PlaceHolderImages.find(img => img.id === 'first-date')?.imageUrl,
    imageHint: PlaceHolderImages.find(img => img.id === 'first-date')?.imageHint,
  },
  {
    id: 2,
    date: new Date('2020-04-01'),
    title: 'First Kiss',
    description: 'Under a sky full of stars, you stole my heart with the sweetest kiss. The world faded away.',
    image: PlaceHolderImages.find(img => img.id === 'first-kiss')?.imageUrl,
    imageHint: PlaceHolderImages.find(img => img.id === 'first-kiss')?.imageHint,
  },
  {
    id: 3,
    date: new Date('2021-07-20'),
    title: 'Beach Getaway',
    description: 'Our first trip together. We built sandcastles, watched sunsets, and fell even more in love.',
    image: PlaceHolderImages.find(img => img.id === 'beach-trip')?.imageUrl,
    imageHint: PlaceHolderImages.find(img => img.id === 'beach-trip')?.imageHint,
  },
  {
    id: 4,
    date: new Date('2022-12-25'),
    title: 'She Said Yes!',
    description: 'On a magical Christmas morning, I asked you to be my forever. Hearing you say "Yes" was the greatest gift.',
    image: PlaceHolderImages.find(img => img.id === 'engagement')?.imageUrl,
    imageHint: PlaceHolderImages.find(img => img.id === 'engagement')?.imageHint,
  },
  {
    id: 5,
    date: new Date('2023-10-07'),
    title: 'Our Wedding Day',
    description: 'In front of our friends and family, we promised each other a lifetime of love and adventure. The perfect day.',
    image: PlaceHolderImages.find(img => img.id === 'wedding-day')?.imageUrl,
    imageHint: PlaceHolderImages.find(img => img.id === 'wedding-day')?.imageHint,
  },
];

export const photoAlbumData = PlaceHolderImages;

export const quotesData = [
  { id: 1, text: "You are my today and all of my tomorrows.", author: "Leo Christopher" },
  { id: 2, text: "If I know what love is, it is because of you.", author: "Hermann Hesse" },
  { id: 3, text: "To the world you may be one person, but to one person you are the world.", author: "Dr. Seuss" },
  { id: 4, text: "My heart is and always will be yours.", author: "Jane Austen" },
  { id: 5, text: "Every moment with you is a new favorite memory.", author: "Us" },
  { id: 6, text: "I love you more than I have ever found a way to say to you.", author: "Ben Folds" },
];

export const playlist = [
    { id: 1, title: "Perfect", artist: "Ed Sheeran", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", reason: "Because from the very first day, everything about us just felt... perfect." },
    { id: 2, title: "A Thousand Years", artist: "Christina Perri", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", reason: "It feels like I've waited a lifetime for you, and I'd wait a thousand more." },
    { id: 3, title: "All of Me", artist: "John Legend", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", reason: "This song says it all. I love all your perfect imperfections." },
    { id: 4, title: "Thinking Out Loud", artist: "Ed Sheeran", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", reason: "Our love story for the ages. I can't wait to grow old with you." },
];

export const ANNIVERSARY_DATE = new Date('2023-10-07T00:00:00');
