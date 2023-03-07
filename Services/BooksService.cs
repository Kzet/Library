using Core.Interfaces;
using Core.Models;
using Core.ViewModels;
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
    public class BooksService : IBooksService
    {
        private readonly Context _db;
        public BooksService(Context db) {
            _db = db;
        }

        public async Task<Book> AddBook(Book book)
        {
            var books = await _db.Books.Where(_ => _.Name == book.Name).AsNoTracking().ToArrayAsync();
            if (books.Any())
            {
                throw new Exception("Книга уже существует в библиотеке");
            }
            var res = await _db.Books.AddAsync(book);
            await _db.SaveChangesAsync();
            return res.Entity;
        }

        public async Task<Book> GetBookById(int id)
        {
            var book = await _db.Books.AsNoTracking().FirstOrDefaultAsync(_ => _.Id == id);
            if (book is null)
            {
                throw new Exception("Книга не существует в библиотеке");
            }
            return book;
        }

        public async Task<List<Book>> GetBooks()
        {
            var books = await _db.Books.Include(_ => _.Genre).AsNoTracking().ToListAsync();
            return books;
        }

        public async Task<List<Book>> GetAvailableBooks()
        {
            var books = await _db.Books.Include(_ => _.Genre).Where(_ => _.Available).AsNoTracking().ToListAsync();
            return books;
        }

        public async Task<List<Book>> GetBooksByClientId(int clientId)
        {
            var books = await _db.Books
                .Include(_ => _.Genre)
                .AsNoTracking()
                .Where(_ => _.ClientId != null && _.ClientId == clientId)
                .ToListAsync();
            return books;
        }

        public async Task<List<Genre>> GetGenres()
        {
            var genres = await _db.Genres.AsNoTracking().ToListAsync();
            return genres;
        }

        public async Task<bool> Transfer(TransferRequest transferRequest)
        {
            try
            {
                var client = _db.Clients.AsNoTracking().FirstOrDefault(_ => _.Id == transferRequest.ClientId);
                var book = _db.Books.AsNoTracking().FirstOrDefault(_ => _.Id == transferRequest.BookId);
                if (book is null || client is null)
                {
                    throw new Exception("Не удалось передать книгу");
                }
                book.Available = false;
                book.ClientId = client.Id;
                book.DateReturn = DateTime.Now.AddDays(7);
                _db.Books.Update(book);
                await _db.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<bool> ReturnBook(TransferRequest transferRequest)
        {
            try
            {
                var book = _db.Books.AsNoTracking().FirstOrDefault(_ => _.Id == transferRequest.BookId);
                if (book is null)
                {
                    throw new Exception("Не удалось вернуть книгу");
                }
                book.Available = true;
                book.ClientId = null;
                book.DateReturn = null;
                _db.Books.Update(book);
                await _db.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
