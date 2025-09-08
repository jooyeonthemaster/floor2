import { BookGrid } from '@/components/BookGrid';
import { books } from '@/lib/books';

export default function HomePage() {
  return (
    <main className="min-h-screen py-8">
      <BookGrid books={books} />
    </main>
  );
}