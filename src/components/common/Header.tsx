import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { BookOpen, User, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleDashboard = () => {
    if (user?.role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/student');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-gradient-primary border-b border-library-muted shadow-elegant">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div 
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={handleLogoClick}
          >
            <div className="p-2 bg-library-gold rounded-lg group-hover:shadow-glow transition-all duration-300">
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-primary-foreground">BiblioTech</h1>
              <p className="text-sm text-primary-foreground/80">Sistema de Biblioteca</p>
            </div>
          </div>

          <nav className="flex items-center space-x-4">
            {user ? (
              <>
                <Button 
                  variant="ghost" 
                  onClick={handleDashboard}
                  className="text-primary-foreground hover:bg-white/10"
                >
                  <User className="h-4 w-4 mr-2" />
                  Dashboard
                </Button>
                <Button 
                  variant="ghost"
                  onClick={handleLogout}
                  className="text-primary-foreground hover:bg-white/10"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sair
                </Button>
                <div className="text-primary-foreground/80 text-sm">
                  Olá, {user.name}
                </div>
              </>
            ) : (
              <div className="space-x-2">
                <Button 
                  variant="ghost"
                  onClick={() => navigate('/login')}
                  className="text-primary-foreground hover:bg-white/10"
                >
                  Entrar
                </Button>
                <Button 
                  variant="secondary"
                  onClick={() => navigate('/register')}
                  className="bg-library-gold text-primary hover:bg-library-gold/90"
                >
                  Registrar
                </Button>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;