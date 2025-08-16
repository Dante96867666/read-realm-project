import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Users, Clock, TrendingUp, Plus, Search } from 'lucide-react';
import AddBookForm from './AddBookForm';
import UserManagement from './UserManagement';
import BookCard, { Book } from '@/components/common/BookCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const AdminDashboard: React.FC = () => {
  const { toast } = useToast();
  const [books, setBooks] = useState<Book[]>([
    {
      id: '1',
      title: 'Dom Casmurro',
      author: 'Machado de Assis',
      isbn: '978-85-359-0277-5',
      category: 'Literatura Brasileira',
      available: true,
      publishedYear: 1899,
      description: 'Uma das mais importantes obras da literatura brasileira.'
    },
    {
      id: '2',
      title: 'Clean Code',
      author: 'Robert C. Martin',
      isbn: '978-0-13-235088-4',
      category: 'Tecnologia',
      available: false,
      publishedYear: 2008,
      description: 'Um guia prático para escrever código limpo e manutenível.'
    }
  ]);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    totalBooks: books.length,
    availableBooks: books.filter(b => b.available).length,
    borrowedBooks: books.filter(b => !b.available).length,
    totalUsers: 150
  };

  const handleAddBook = (newBook: Omit<Book, 'id'>) => {
    const book: Book = {
      ...newBook,
      id: Date.now().toString()
    };
    setBooks(prev => [...prev, book]);
    toast({
      title: "Livro adicionado com sucesso!",
      description: `"${book.title}" foi adicionado ao catálogo.`,
    });
  };

  const handleBookAction = (book: Book) => {
    // Toggle availability for demo
    setBooks(prev => 
      prev.map(b => 
        b.id === book.id 
          ? { ...b, available: !b.available }
          : b
      )
    );
    toast({
      title: book.available ? "Livro emprestado" : "Livro devolvido",
      description: `Status de "${book.title}" foi atualizado.`,
    });
  };

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Livros</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalBooks}</div>
            <p className="text-xs text-muted-foreground">
              +2 novos este mês
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Livros Disponíveis</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.availableBooks}</div>
            <p className="text-xs text-muted-foreground">
              {((stats.availableBooks / stats.totalBooks) * 100).toFixed(1)}% do total
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Empréstimos Ativos</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.borrowedBooks}</div>
            <p className="text-xs text-muted-foreground">
              3 vencem esta semana
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuários Ativos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              +12 novos este mês
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="books" className="space-y-4">
        <TabsList>
          <TabsTrigger value="books">Gerenciar Livros</TabsTrigger>
          <TabsTrigger value="add-book">Adicionar Livro</TabsTrigger>
          <TabsTrigger value="users">Gerenciar Usuários</TabsTrigger>
        </TabsList>

        <TabsContent value="books" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-bold">Catálogo de Livros</h3>
            <div className="flex space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Buscar livros..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onAction={handleBookAction}
                actionLabel={book.available ? "Marcar como Emprestado" : "Marcar como Disponível"}
              />
            ))}
          </div>

          {filteredBooks.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Nenhum livro encontrado</h3>
              <p className="text-muted-foreground">
                Tente buscar com termos diferentes.
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="add-book">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Plus className="h-5 w-5" />
                <span>Adicionar Novo Livro</span>
              </CardTitle>
              <CardDescription>
                Preencha as informações do livro para adicioná-lo ao catálogo.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AddBookForm onSubmit={handleAddBook} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Gerenciamento de Usuários</span>
              </CardTitle>
              <CardDescription>
                Visualize e gerencie usuários do sistema.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <UserManagement />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;