using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Web4Api.Models;

namespace Web4Api.Data
{
    public class DbContext : IdentityDbContext
    {
        public DbSet<Gebruiker> Gebruikers { get; set; }

        public DbContext(DbContextOptions<DbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<Gebruiker>()
                .HasKey(u => u.Id);
            builder.Entity<Gebruiker>().Property(u => u.UserName).IsRequired().HasMaxLength(50);
            builder.Entity<Gebruiker>().Property(u => u.FirstName).IsRequired().HasMaxLength(50);
            builder.Entity<Gebruiker>().Property(u => u.LastName).IsRequired().HasMaxLength(50);
            builder.Entity<Gebruiker>().Property(u => u.Email).IsRequired().HasMaxLength(50);

        }
    }
}