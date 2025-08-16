import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, BookOpen } from 'lucide-react';

export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  category: string;
  available: boolean;
  publishedYear: number;
  description: string;
  coverUrl?: string;
}

interface BookCardProps {
  book: Book;
  onAction?: (book: Book) => void;
  actionLabel?: string;
  showActions?: boolean;
}

const BookCard: React.FC<BookCardProps> = ({ 
  book, 
  onAction, 
  actionLabel = "Ver Detalhes",
  showActions = true 
}) => {
  return (
    <Card className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 bg-card shadow-card">
      <CardHeader className="pb-4">
        <div className="aspect-[3/4] bg-gradient-primary rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
          {book.coverUrl ? (
            <img 
              src={book.coverUrl} 
              alt={book.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <BookOpen className="h-16 w-16 text-primary-foreground opacity-50" />
          )}
          <Badge 
            variant={book.available ? "default" : "destructive"}
            className="absolute top-2 right-2"
          >
            {book.available ? "Disponível" : "Emprestado"}
          </Badge>
        </div>
        <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors">
          {book.title}
        </h3>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <div className="flex items-center text-sm text-muted-foreground">
          <User className="h-4 w-4 mr-2" />
          <span>{book.author}</span>
        </div>
        
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="h-4 w-4 mr-2" />
          <span>{book.publishedYear}</span>
        </div>
        
        <Badge variant="outline" className="w-fit">
          {book.category}
        </Badge>
        
        <p className="text-sm text-muted-foreground line-clamp-3">
          {book.description}
        </p>
      </CardContent>
      
      {showActions && (
        <CardFooter>
          <Button 
            onClick={() => onAction?.(book)}
            className="w-full"
            variant={book.available ? "default" : "outline"}
            disabled={!book.available && actionLabel.includes("Emprestar")}
          >
            {actionLabel}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default BookCard;