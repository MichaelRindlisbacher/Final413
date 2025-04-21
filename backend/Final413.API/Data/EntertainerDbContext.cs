using Microsoft.EntityFrameworkCore;

namespace Final413.API.Data
{
    public class EntertainerDbContext : DbContext
    {
        public EntertainerDbContext(DbContextOptions<EntertainerDbContext> options) : base(options)
        {
        }

        public DbSet<Entertainer> Entertainers { get; set; }
        public DbSet<Engagement> Engagements { get; set; } // You'll need this to calculate bookings
    }
}
