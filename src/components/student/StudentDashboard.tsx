import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Clock, Star, TrendingUp } from 'lucide-react';
import BookSearch from './BookSearch';
import MyLoans from './MyLoans';
import BookCard, { Book } from '@/components/common/BookCard';
import { useToast } from '@/hooks/use-toast';

const StudentDashboard: React.FC = () => {
  const { toast } = useToast();
  
  const [loans, setLoans] = useState([
    {
      id: '1',
      bookId: '1',
      bookTitle: 'Dom Casmurro',
      author: 'Machado de Assis',
      borrowDate: '2024-01-15',
      dueDate: '2024-02-15',
      status: 'active' as 'active' | 'overdue' | 'returned'
    },
    {
      id: '2',
      bookId: '2',
      bookTitle: 'Clean Code',
      author: 'Robert C. Martin',
      borrowDate: '2024-01-10',
      dueDate: '2024-02-10',
      status: 'overdue' as 'active' | 'overdue' | 'returned'
    }
  ]);

  // Mock recommended books
  const recommendedBooks: Book[] = [
    {
      id: '3',
      title: 'O Alquimista',
      author: 'Paulo Coelho',
      isbn: '978-85-325-1107-1',
      category: 'Ficção',
      available: true,
      publishedYear: 1988,
      description: 'A jornada de Santiago em busca de seu tesouro pessoal.'
    },
    {
      id: '4',
      title: 'Sapiens',
      author: 'Yuval Noah Harari',
      isbn: '978-0-06-231609-7',
      category: 'História',
      available: true,
      publishedYear: 2011,
      description: 'Uma breve história da humanidade.'
    }
  ];

  const stats = {
    activeLoans: loans.filter(l => l.status === 'active').length,
    overdueLoans: loans.filter(l => l.status === 'overdue').length,
    totalLoansThisYear: 12,
    favoriteCategory: 'Literatura Brasileira'
  };

  const handleBorrowBook = (book: Book) => {
    const newLoan = {
      id: Date.now().toString(),
      bookId: book.id,
      bookTitle: book.title,
      author: book.author,
      borrowDate: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'active' as 'active' | 'overdue' | 'returned'
    };
    
    setLoans(prev => [...prev, newLoan]);
    toast({
      title: "Livro emprestado com sucesso!",
      description: `"${book.title}" foi adicionado aos seus empréstimos.`,
    });
  };

  const handleReturnBook = (loanId: string) => {
    setLoans(prev => prev.filter(loan => loan.id !== loanId));
    toast({
      title: "Livro devolvido com sucesso!",
      description: "O livro foi removido dos seus empréstimos.",
    });
  };

  const handleRenewLoan = (loanId: string) => {
    setLoans(prev => 
      prev.map(loan => 
        loan.id === loanId 
          ? { 
              ...loan, 
              dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
              status: 'active' as 'active' | 'overdue' | 'returned'
            }
          : loan
      )
    );
    toast({
      title: "Empréstimo renovado!",
      description: "O prazo de devolução foi estendido por mais 30 dias.",
    });
  };

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Empréstimos Ativos</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeLoans}</div>
            <p className="text-xs text-muted-foreground">
              Livros em sua posse
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Em Atraso</CardTitle>
            <Clock className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{stats.overdueLoans}</div>
            <p className="text-xs text-muted-foreground">
              Devoluções pendentes
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Este Ano</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalLoansThisYear}</div>
            <p className="text-xs text-muted-foreground">
              Livros lidos em 2024
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categoria Favorita</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{stats.favoriteCategory}</div>
            <p className="text-xs text-muted-foreground">
              Sua preferência
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions & Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 shadow-card">
          <CardHeader>
            <CardTitle>Recomendações para Você</CardTitle>
            <CardDescription>
              Livros selecionados baseados no seu histórico de leitura
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recommendedBooks.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  onAction={handleBorrowBook}
                  actionLabel="Emprestar"
                />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-sm">
              <h4 className="font-medium mb-2">Próximas Devoluções</h4>
              {loans.filter(l => l.status !== 'returned').slice(0, 3).map((loan) => (
                <div key={loan.id} className="flex justify-between items-center py-2 border-b last:border-b-0">
                  <div>
                    <p className="font-medium text-sm">{loan.bookTitle}</p>
                    <p className="text-xs text-muted-foreground">
                      Vence: {new Date(loan.dueDate).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded ${
                    loan.status === 'overdue' 
                      ? 'bg-destructive/10 text-destructive' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {loan.status === 'overdue' ? 'Atrasado' : 'Ativo'}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="search" className="space-y-4">
        <TabsList>
          <TabsTrigger value="search">Buscar Livros</TabsTrigger>
          <TabsTrigger value="loans">Meus Empréstimos</TabsTrigger>
        </TabsList>

        <TabsContent value="search">
          <BookSearch onBorrowBook={handleBorrowBook} />
        </TabsContent>

        <TabsContent value="loans">
          <MyLoans 
            loans={loans}
            onReturnBook={handleReturnBook}
            onRenewLoan={handleRenewLoan}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentDashboard;