import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Book } from '@/components/common/BookCard';

interface AddBookFormProps {
  onSubmit: (book: Omit<Book, 'id'>) => void;
}

const AddBookForm: React.FC<AddBookFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    isbn: '',
    category: '',
    publishedYear: '',
    description: '',
    coverUrl: ''
  });

  const categories = [
    'Literatura Brasileira',
    'Literatura Estrangeira',
    'Ficção Científica',
    'Romance',
    'Mistério',
    'Biografia',
    'História',
    'Ciência',
    'Tecnologia',
    'Filosofia',
    'Arte',
    'Autoajuda'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.author || !formData.isbn || !formData.category) {
      return;
    }

    const newBook: Omit<Book, 'id'> = {
      title: formData.title,
      author: formData.author,
      isbn: formData.isbn,
      category: formData.category,
      publishedYear: parseInt(formData.publishedYear) || new Date().getFullYear(),
      description: formData.description,
      available: true,
      coverUrl: formData.coverUrl || undefined
    };

    onSubmit(newBook);
    
    // Reset form
    setFormData({
      title: '',
      author: '',
      isbn: '',
      category: '',
      publishedYear: '',
      description: '',
      coverUrl: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">Título *</Label>
          <Input
            id="title"
            placeholder="Digite o título do livro"
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="author">Autor *</Label>
          <Input
            id="author"
            placeholder="Nome do autor"
            value={formData.author}
            onChange={(e) => handleInputChange('author', e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="isbn">ISBN *</Label>
          <Input
            id="isbn"
            placeholder="978-85-359-0277-5"
            value={formData.isbn}
            onChange={(e) => handleInputChange('isbn', e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="publishedYear">Ano de Publicação</Label>
          <Input
            id="publishedYear"
            type="number"
            placeholder="2024"
            min="1000"
            max={new Date().getFullYear()}
            value={formData.publishedYear}
            onChange={(e) => handleInputChange('publishedYear', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Categoria *</Label>
          <Select onValueChange={(value) => handleInputChange('category', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione uma categoria" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="coverUrl">URL da Capa (opcional)</Label>
          <Input
            id="coverUrl"
            type="url"
            placeholder="https://exemplo.com/capa.jpg"
            value={formData.coverUrl}
            onChange={(e) => handleInputChange('coverUrl', e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descrição</Label>
        <Textarea
          id="description"
          placeholder="Breve descrição do livro..."
          rows={3}
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
        />
      </div>

      <div className="flex justify-end space-x-2">
        <Button 
          type="button" 
          variant="outline"
          onClick={() => setFormData({
            title: '',
            author: '',
            isbn: '',
            category: '',
            publishedYear: '',
            description: '',
            coverUrl: ''
          })}
        >
          Limpar
        </Button>
        <Button type="submit">
          Adicionar Livro
        </Button>
      </div>
    </form>
  );
};

export default AddBookForm;