using Microsoft.EntityFrameworkCore;
using SiteMercado.Domain.Entities;

namespace SiteMercado.Data
{
    public class AppDbContext: DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }
        
        public DbSet<Product> Products { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Product>().HasKey(m => m.Id);
            base.OnModelCreating(builder);
        }
    }
}