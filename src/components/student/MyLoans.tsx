import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BookOpen, Calendar, RotateCcw, CheckCircle, AlertCircle } from 'lucide-react';

interface Loan {
  id: string;
  bookId: string;
  bookTitle: string;
  author: string;
  borrowDate: string;
  dueDate: string;
  status: 'active' | 'overdue' | 'returned';
}

interface MyLoansProps {
  loans: Loan[];
  onReturnBook: (loanId: string) => void;
  onRenewLoan: (loanId: string) => void;
}

const MyLoans: React.FC<MyLoansProps> = ({ loans, onReturnBook, onRenewLoan }) => {
  const activeLoans = loans.filter(loan => loan.status !== 'returned');
  const overdueLoans = loans.filter(loan => loan.status === 'overdue');

  const getDaysUntilDue = (dueDate: string) => {
    const due = new Date(dueDate);
    const today = new Date();
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getStatusBadge = (loan: Loan) => {
    const daysUntilDue = getDaysUntilDue(loan.dueDate);
    
    if (loan.status === 'overdue') {
      return <Badge variant="destructive">Atrasado</Badge>;
    }
    
    if (daysUntilDue <= 3) {
      return <Badge variant="destructive">Vence em breve</Badge>;
    }
    
    if (daysUntilDue <= 7) {
      return <Badge variant="outline">Vence esta semana</Badge>;
    }
    
    return <Badge variant="default">Ativo</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="shadow-card">
          <CardContent className="flex items-center p-6">
            <BookOpen className="h-8 w-8 text-primary mr-4" />
            <div>
              <p className="text-2xl font-bold">{activeLoans.length}</p>
              <p className="text-sm text-muted-foreground">Empréstimos Ativos</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="flex items-center p-6">
            <AlertCircle className="h-8 w-8 text-destructive mr-4" />
            <div>
              <p className="text-2xl font-bold text-destructive">{overdueLoans.length}</p>
              <p className="text-sm text-muted-foreground">Em Atraso</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="flex items-center p-6">
            <CheckCircle className="h-8 w-8 text-library-gold mr-4" />
            <div>
              <p className="text-2xl font-bold">{loans.filter(l => l.status === 'returned').length}</p>
              <p className="text-sm text-muted-foreground">Devolvidos</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Loans Table */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BookOpen className="h-5 w-5" />
            <span>Meus Empréstimos Ativos</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {activeLoans.length > 0 ? (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Livro</TableHead>
                    <TableHead>Autor</TableHead>
                    <TableHead>Data do Empréstimo</TableHead>
                    <TableHead>Data de Devolução</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activeLoans.map((loan) => {
                    const daysUntilDue = getDaysUntilDue(loan.dueDate);
                    
                    return (
                      <TableRow key={loan.id}>
                        <TableCell className="font-medium">{loan.bookTitle}</TableCell>
                        <TableCell>{loan.author}</TableCell>
                        <TableCell>
                          <div className="flex items-center text-sm">
                            <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
                            {new Date(loan.borrowDate).toLocaleDateString('pt-BR')}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center text-sm">
                            <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
                            {new Date(loan.dueDate).toLocaleDateString('pt-BR')}
                            {daysUntilDue >= 0 && (
                              <span className="ml-2 text-xs text-muted-foreground">
                                ({daysUntilDue} dias)
                              </span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(loan)}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => onRenewLoan(loan.id)}
                              disabled={loan.status === 'overdue'}
                            >
                              <RotateCcw className="h-3 w-3 mr-1" />
                              Renovar
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => onReturnBook(loan.id)}
                            >
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Devolver
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-8">
              <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Nenhum empréstimo ativo</h3>
              <p className="text-muted-foreground">
                Você não possui livros emprestados no momento.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Overdue Notice */}
      {overdueLoans.length > 0 && (
        <Card className="border-destructive shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-destructive">
              <AlertCircle className="h-5 w-5" />
              <span>Atenção: Livros em Atraso</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Você possui {overdueLoans.length} livro(s) em atraso. Por favor, 
              devolva-os o mais rápido possível para evitar multas.
            </p>
            <div className="space-y-2">
              {overdueLoans.map((loan) => (
                <div key={loan.id} className="flex justify-between items-center p-3 bg-destructive/5 rounded-lg">
                  <div>
                    <p className="font-medium">{loan.bookTitle}</p>
                    <p className="text-sm text-muted-foreground">
                      Venceu em: {new Date(loan.dueDate).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => onReturnBook(loan.id)}
                  >
                    Devolver Agora
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MyLoans;