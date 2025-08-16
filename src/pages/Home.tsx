import React, { useState } from 'react';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import BookCard, { Book } from '@/components/common/BookCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, BookOpen, Users, Clock, Star } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for featured books
  const featuredBooks: Book[] = [
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
    }
  ];

  const filteredBooks = featuredBooks.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBookAction = (book: Book) => {
    if (user) {
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/student');
      }
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-hero py-20 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Bem-vindo à BiblioTech
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-primary-foreground/90">
            Explore um mundo de conhecimento com nossa biblioteca digital moderna. 
            Encontre, reserve e gerencie livros de forma simples e eficiente.
          </p>
          <div className="flex justify-center space-x-4">
            {!user ? (
              <>
                <Button 
                  size="lg" 
                  variant="secondary"
                  onClick={() => navigate('/register')}
                  className="bg-library-gold text-primary hover:bg-library-gold/90"
                >
                  Começar Agora
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => navigate('/login')}
                  className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                >
                  Entrar
                </Button>
              </>
            ) : (
              <Button 
                size="lg" 
                variant="secondary"
                onClick={() => user.role === 'admin' ? navigate('/admin') : navigate('/student')}
                className="bg-library-gold text-primary hover:bg-library-gold/90"
              >
                Ir para Dashboard
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-library-light">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="flex justify-center">
                <BookOpen className="h-12 w-12 text-library-gold" />
              </div>
              <h3 className="text-3xl font-bold text-primary">10,000+</h3>
              <p className="text-muted-foreground">Livros Disponíveis</p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-center">
                <Users className="h-12 w-12 text-library-gold" />
              </div>
              <h3 className="text-3xl font-bold text-primary">5,000+</h3>
              <p className="text-muted-foreground">Usuários Ativos</p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-center">
                <Clock className="h-12 w-12 text-library-gold" />
              </div>
              <h3 className="text-3xl font-bold text-primary">24/7</h3>
              <p className="text-muted-foreground">Acesso Online</p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-center">
                <Star className="h-12 w-12 text-library-gold" />
              </div>
              <h3 className="text-3xl font-bold text-primary">4.9</h3>
              <p className="text-muted-foreground">Avaliação Média</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Books Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Livros em Destaque</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Descubra nossa seleção cuidadosamente escolhida dos melhores livros em diversas categorias.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Buscar livros, autores ou categorias..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Book Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onAction={handleBookAction}
                actionLabel={user ? "Ver Detalhes" : "Entrar para Ver"}
              />
            ))}
          </div>

          {filteredBooks.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Nenhum livro encontrado</h3>
              <p className="text-muted-foreground">
                Tente buscar com termos diferentes ou explore nossa coleção completa.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;