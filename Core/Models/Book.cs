using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Models
{
    public class Book
    {
        /// <summary>
        /// Идентификатор
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Название
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// ФИО автора
        /// </summary>
        public string Author { get; set; }

        /// <summary>
        /// Жанр
        /// </summary>
        public Genre? Genre { get; set; }

        /// <summary>
        /// Идентификатор жанра
        /// </summary>
        public int GenreId { get; set; }

        /// <summary>
        /// Клиент
        /// </summary>
        public Client? Client { get; set; }

        /// <summary>
        /// Идентификатор клиента
        /// </summary>
        public int? ClientId { get; set; }

        /// <summary>
        /// Доступна
        /// </summary>
        public bool Available { get; set; }

        /// <summary>
        /// Дата возврата
        /// </summary>
        public DateTime? DateReturn { get; set; }
    }
}
