using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Models;

namespace Data.Mapping
{
    public class BookConfiguration : IEntityTypeConfiguration<Book>
    {
        public void Configure(EntityTypeBuilder<Book> builder)
        {
            builder.ToTable("Books");
            builder.HasKey(_ => _.Id);
            builder.Property(_ => _.Id).ValueGeneratedOnAdd();
            builder.HasOne(_ => _.Genre).WithMany(_ => _.Books).HasForeignKey(x => x.GenreId).OnDelete(DeleteBehavior.Cascade);
            builder.HasOne(_ => _.Client).WithMany(_ => _.Books).HasForeignKey(x => x.ClientId).OnDelete(DeleteBehavior.Cascade);
        }
    }
}
