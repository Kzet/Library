using Core.Interfaces;
using Core.Models;
using Core.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Services;
using System.Net;

namespace Library.Controllers
{
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly IBooksService _booksService;
        public BooksController(IBooksService booksService) {
            _booksService = booksService;
        }

        [HttpGet]
        [Route("api/books/getBooks")]
        public async Task<ActionResult> GetBooks()
        {
            try
            {
                var res = await _booksService.GetBooks();

                return Ok(res);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }

        [HttpGet]
        [Route("api/books/getAvailableBooks")]
        public async Task<ActionResult> GetAvailableBooks()
        {
            try
            {
                var res = await _booksService.GetAvailableBooks();

                return Ok(res);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }

        [HttpGet]
        [Route("api/books/getBooksByClientId")]
        public async Task<ActionResult> GetBooksByClientId(int clientId)
        {
            try
            {
                var res = await _booksService.GetBooksByClientId(clientId);

                return Ok(res);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }

        [HttpGet]
        [Route("api/books/getGenres")]
        public async Task<ActionResult> GetGenres()
        {

            try
            {
                var res = await _booksService.GetGenres();

                return Ok(res);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }

        [HttpPost]
        [Route("api/books/addBook")]
        public async Task<IActionResult> AddBook(Book book)
        {

            try
            {
                if (book == null)
                {
                    return BadRequest("Поля не заполнены");
                }
                var res = await _booksService.AddBook(book);
                if (res != null)
                {
                    return Ok();
                }
                else
                {
                    return BadRequest("Неудалось добавить книгу");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("api/books/getBookById")]
        public async Task<ActionResult> GetBookById(int id)
        {
            try
            {

                var res = await _booksService.GetBookById(id);

                return Ok(res);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }

        [HttpPost]
        [Route("api/books/transfer")]
        public async Task<IActionResult> Transfer(TransferRequest transferRequest)
        {

            try
            {
                
                var res = await _booksService.Transfer(transferRequest);
                if (res)
                {
                    return Ok();
                }
                else
                {
                    return BadRequest("Неудалось передать книгу");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("api/books/returnBook")]
        public async Task<IActionResult> ReturnBook(TransferRequest transferRequest)
        {

            try
            {
                
                var res = await _booksService.ReturnBook(transferRequest);
                if (res)
                {
                    return Ok();
                }
                else
                {
                    return BadRequest("Неудалось вернуть книгу");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
