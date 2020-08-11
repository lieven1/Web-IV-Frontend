using Microsoft.AspNetCore.Identity;
using Web4Api.Models;
using System.Linq;
using System.Threading.Tasks;

namespace Web4Api.Data
{
    public class DataInitializer
    {
        private readonly DbContext _dbContext;
        private readonly UserManager<IdentityUser> _userManager;

        public DataInitializer(DbContext dbContext, UserManager<IdentityUser> userManager)
        {
            _dbContext = dbContext;
            _userManager = userManager;
        }

        public async Task InitializeData()
        {
            _dbContext.Database.EnsureDeleted();
            if (_dbContext.Database.EnsureCreated())
            {
                Gebruiker gebruiker1 = new Gebruiker { UserName = "peterpan", Email = "peterpan@gmail.be", FirstName = "Peter", LastName = "Pan" };
                _dbContext.Gebruikers.Add(gebruiker1);
                await CreateUser(gebruiker1.Email, "P@ssword1234");
                Gebruiker gebruiker2 = new Gebruiker { UserName = "alpacino", Email = "al@gmail.be", FirstName = "Al", LastName = "Pacino" };
                _dbContext.Gebruikers.Add(gebruiker2);
                await CreateUser(gebruiker2.Email, "P@ssword1234");
                _dbContext.SaveChanges();
            }
        }

        private async Task CreateUser(string email, string password)
        {
            var user = new IdentityUser { UserName = email, Email = email };
            await _userManager.CreateAsync(user, password);
        }
    }
}

