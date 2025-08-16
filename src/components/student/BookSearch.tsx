import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import BookCard, { Book } from '@/components/common/BookCard';
import { Search, Filter, BookOpen, SortAsc } from 'lucide-react';

interface BookSearchProps {
  onBorrowBook: (book: Book) => void;
}

const BookSearch: React.FC<BookSearchProps> = ({ onBorrowBook }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('title');
  const [showFilters, setShowFilters] = useState(false);

  // Mock book data
  const allBooks: Book[] = [
    {
      id: '1',
      title: 'Dom Casmurro',
      author: 'Machado de Assis',
      isbn: '978-85-359-0277-5',
      category: 'Literatura Brasileira',
      available: true,
      publishedYear: 1899,
      description: 'Uma das mais importantes obras da literatura brasileira, narrando a história de Bentinho e sua paixão por Capitu.'
    },
    {
      id: '2',
      title: 'O Alquimista',
      author: 'Paulo Coelho',
      isbn: '978-85-325-1107-1',
      category: 'Ficção',
      available: true,
      publishedYear: 1988,
      description: 'A jornada de Santiago em busca de seu tesouro pessoal, uma fábula sobre seguir seus sonhos.'
    },
    {
      id: '3',
      title: 'Clean Code',
      author: 'Robert C. Martin',
      isbn: '978-0-13-235088-4',
      category: 'Tecnologia',
      available: false,
      publishedYear: 2008,
      description: 'Um guia prático para escrever código limpo, legível e manutenível.'
    },
    {
      id: '4',
      title: 'Sapiens',
      author: 'Yuval Noah Harari',
      isbn: '978-0-06-231609-7',
      category: 'História',
      available: true,
      publishedYear: 2011,
      description: 'Uma breve história da humanidade, desde a evolução até os dias atuais.'
    },
    {
      id: '5',
      title: 'O Cortiço',
      author: 'Aluísio Azevedo',
      isbn: '978-85-16-01234-5',
      category: 'Literatura Brasileira',
      available: true,
      publishedYear: 1890,
      description: 'Romance naturalista que retrata a vida em um cortiço do Rio de Janeiro.'
    },
    {
      id: '6',
      title: 'Algoritmos',
      author: 'Thomas H. Cormen',
      isbn: '978-85-352-3699-6',
      category: 'Tecnologia',
      available: true,
      publishedYear: 2009,
      description: 'Introdução completa aos algoritmos e estruturas de dados.'
    }
  ];

  const categories = ['Literatura Brasileira', 'Ficção', 'Tecnologia', 'História', 'Ciência'];

  const filteredBooks = allBooks
    .filter(book => {
      const matchesSearch = 
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = !selectedCategory || book.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'author':
          return a.author.localeCompare(b.author);
        case 'year':
          return b.publishedYear - a.publishedYear;
        default:
          return 0;
      }
    });

  const availableBooks = filteredBooks.filter(book => book.available);
  const unavailableBooks = filteredBooks.filter(book => !book.available);

  return (
    <div className="space-y-6">
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Search className="h-5 w-5" />
            <span>Buscar Livros</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Buscar por título, autor ou descrição..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filtros
            </Button>
            
            {showFilters && (
              <>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todas as categorias</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="title">
                      <div className="flex items-center">
                        <SortAsc className="h-4 w-4 mr-2" />
                        Título
                      </div>
                    </SelectItem>
                    <SelectItem value="author">Autor</SelectItem>
                    <SelectItem value="year">Ano</SelectItem>
                  </SelectContent>
                </Select>

                {(selectedCategory || searchTerm) && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('');
                    }}
                  >
                    Limpar filtros
                  </Button>
                )}
              </>
            )}
          </div>

          {/* Active Filters */}
          {(selectedCategory || searchTerm) && (
            <div className="flex flex-wrap gap-2">
              {searchTerm && (
                <Badge variant="secondary">
                  Busca: "{searchTerm}"
                </Badge>
              )}
              {selectedCategory && (
                <Badge variant="secondary">
                  Categoria: {selectedCategory}
                </Badge>
              )}
            </div>
          )}

          {/* Results Summary */}
          <div className="text-sm text-muted-foreground">
            {filteredBooks.length} livro(s) encontrado(s) - {availableBooks.length} disponível(eis)
          </div>
        </CardContent>
      </Card>

      {/* Available Books */}
      {availableBooks.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4 text-primary">Livros Disponíveis</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onAction={onBorrowBook}
                actionLabel="Emprestar"
              />
            ))}
          </div>
        </div>
      )}

      {/* Unavailable Books */}
      {unavailableBooks.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4 text-muted-foreground">Livros Indisponíveis</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {unavailableBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                actionLabel="Reservar"
                showActions={true}
              />
            ))}
          </div>
        </div>
      )}

      {/* No Results */}
      {filteredBooks.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Nenhum livro encontrado</h3>
          <p className="text-muted-foreground">
            Tente ajustar seus filtros ou termos de busca.
          </p>
        </div>
      )}
    </div>
  );
};

export default BookSearch;