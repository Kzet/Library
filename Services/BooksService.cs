using Core.Interfaces;
using Core.Models;
using Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public class BooksService: IBooksService
    {
        private readonly Context _db;
        public BooksService(Context db) {
            _db = db;
        }

        public async Task<Book> AddBook(Book book)
        {
            var books = await _db.Books.Where(_ => _.Name == book.Name).ToArrayAsync();
            if (books.Any())
            {
                throw new Exception("Книга уже существует в библиотеке");
            }
            var res = await _db.Books.AddAsync(book);
            await _db.SaveChangesAsync();
            return res.Entity;
        }

        public async Task<List<Book>> GetBooks()
        {
            var books = await _db.Books.ToListAsync();
            return books;
        }

        public async Task<List<Genre>> GetGenres()
        {
            var genres = await _db.Genres.ToListAsync();
            return genres;
        }

        
    }
}
