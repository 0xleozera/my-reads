import BaseService from './BaseService';

class BookService extends BaseService {
  getAll = async () => await this.get('/books');

  update = async (book, shelf) => await this.update(`/books/${book.id}`, { shelf });

  search = async (query) => await this.post('/search', { query });
}

export default new BookService();
