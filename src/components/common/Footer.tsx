import React from 'react';
import { BookOpen, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-primary-foreground mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-library-gold rounded-lg">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold">BiblioTech</h3>
                <p className="text-sm text-primary-foreground/80">Sistema de Biblioteca</p>
              </div>
            </div>
            <p className="text-primary-foreground/80 text-sm">
              Conectando conhecimento e comunidade através da tecnologia.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contato</h4>
            <div className="space-y-2 text-sm text-primary-foreground/80">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>contato@bibliotech.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>(11) 1234-5678</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>São Paulo, SP</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Horário de Funcionamento</h4>
            <div className="space-y-1 text-sm text-primary-foreground/80">
              <p>Segunda a Sexta: 8h às 22h</p>
              <p>Sábado: 9h às 18h</p>
              <p>Domingo: 10h às 16h</p>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-4 text-center text-sm text-primary-foreground/60">
          <p>&copy; 2024 BiblioTech. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;