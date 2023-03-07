using Core.Models;
using Core.ViewModels;
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
        Task<Book> GetBookById(int id);
        Task<bool> Transfer(TransferRequest transferRequest);
        Task<bool> ReturnBook(TransferRequest transferRequest);
        Task<List<Book>> GetBooksByClientId(int clientId);
        Task<List<Book>> GetAvailableBooks();
    }
}
