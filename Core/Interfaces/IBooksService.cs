using Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface IBooksService
    {
        Task<Book> AddBook(Book book);
        Task<List<Book>> GetBooks();
        Task<List<Genre>> GetGenres();
    }
}
