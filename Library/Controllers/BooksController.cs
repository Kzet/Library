using Core.Interfaces;
using Core.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Services;

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
    }
}
