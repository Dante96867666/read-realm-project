import React from 'react';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import StudentDashboard from '@/components/student/StudentDashboard';
import { useAuth } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';

const StudentPortal: React.FC = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== 'student') {
    return <Navigate to="/admin" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-library-light">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-primary mb-2">
              Minha Biblioteca
            </h1>
            <p className="text-muted-foreground">
              Gerencie seus empréstimos e descubra novos livros.
            </p>
          </div>
          
          <StudentDashboard />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default StudentPortal;