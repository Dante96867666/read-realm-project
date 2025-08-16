import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, UserCheck, UserX, Mail, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'student';
  joinDate: string;
  status: 'active' | 'suspended';
  borrowedBooks: number;
}

const UserManagement: React.FC = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');

  // Mock user data
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'João Silva',
      email: 'joao@email.com',
      role: 'student',
      joinDate: '2024-01-15',
      status: 'active',
      borrowedBooks: 2
    },
    {
      id: '2',
      name: 'Maria Santos',
      email: 'maria@email.com',
      role: 'student',
      joinDate: '2024-02-20',
      status: 'active',
      borrowedBooks: 1
    },
    {
      id: '3',
      name: 'Pedro Admin',
      email: 'admin@bibliotech.com',
      role: 'admin',
      joinDate: '2023-12-01',
      status: 'active',
      borrowedBooks: 0
    },
    {
      id: '4',
      name: 'Ana Costa',
      email: 'ana@email.com',
      role: 'student',
      joinDate: '2024-03-10',
      status: 'suspended',
      borrowedBooks: 0
    }
  ]);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggleStatus = (userId: string) => {
    setUsers(prev => 
      prev.map(user => 
        user.id === userId 
          ? { ...user, status: user.status === 'active' ? 'suspended' : 'active' }
          : user
      )
    );
    
    const user = users.find(u => u.id === userId);
    if (user) {
      toast({
        title: user.status === 'active' ? 'Usuário suspenso' : 'Usuário reativado',
        description: `${user.name} foi ${user.status === 'active' ? 'suspenso' : 'reativado'} com sucesso.`,
      });
    }
  };

  const handleSendEmail = (user: User) => {
    toast({
      title: "Email enviado",
      description: `Email enviado para ${user.name} (${user.email}).`,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Usuários do Sistema</h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Buscar usuários..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-64"
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Data de Cadastro</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Livros Emprestados</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                    {user.role === 'admin' ? 'Administrador' : 'Estudante'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-3 w-3 mr-1" />
                    {new Date(user.joinDate).toLocaleDateString('pt-BR')}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={user.status === 'active' ? 'default' : 'destructive'}>
                    {user.status === 'active' ? 'Ativo' : 'Suspenso'}
                  </Badge>
                </TableCell>
                <TableCell>{user.borrowedBooks}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleSendEmail(user)}
                    >
                      <Mail className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant={user.status === 'active' ? 'destructive' : 'default'}
                      onClick={() => handleToggleStatus(user.id)}
                    >
                      {user.status === 'active' ? (
                        <UserX className="h-3 w-3" />
                      ) : (
                        <UserCheck className="h-3 w-3" />
                      )}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {filteredUsers.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">Nenhum usuário encontrado.</p>
        </div>
      )}

      <div className="flex justify-between items-center text-sm text-muted-foreground">
        <p>Total de usuários: {users.length}</p>
        <p>Usuários ativos: {users.filter(u => u.status === 'active').length}</p>
      </div>
    </div>
  );
};

export default UserManagement;