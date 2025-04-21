using Final413.API.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Final413.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EntertainerController : ControllerBase
    {
        private readonly EntertainerDbContext _context;

        public EntertainerController(EntertainerDbContext context)
        {
            _context = context;
        }

        // GET: api/Entertainer
        [HttpGet]
        public IActionResult GetEntertainersSummary()
        {
            var result = _context.Entertainers
                .Select(e => new
                {
                    e.EntertainerID,
                    e.EntStageName,
                    TimesBooked = _context.Engagements.Count(eng => eng.EntertainerID == e.EntertainerID),
                    LastBookingDate = _context.Engagements
                        .Where(eng => eng.EntertainerID == e.EntertainerID)
                        .Select(eng => eng.EndDate)
                        .OrderByDescending(date => date)
                        .FirstOrDefault() ?? "Never"

                })
                .ToList();

            return Ok(result);
        }

        // GET: api/Entertainer/5
        [HttpGet("{id}")]
        public IActionResult GetEntertainer(int id)
        {
            var entertainer = _context.Entertainers.Find(id);

            if (entertainer == null)
                return NotFound();

            return Ok(entertainer);
        }

        // POST: api/Entertainer
        [HttpPost]
        public IActionResult AddEntertainer([FromBody] Entertainer newEntertainer)
        {
            _context.Entertainers.Add(newEntertainer);
            _context.SaveChanges();
            return Ok(newEntertainer);
        }

        // PUT: api/Entertainer/5
        [HttpPut("{id}")]
        public IActionResult UpdateEntertainer(int id, [FromBody] Entertainer updated)
        {
            var existing = _context.Entertainers.Find(id);
            if (existing == null) return NotFound();

            _context.Entry(existing).CurrentValues.SetValues(updated);
            _context.SaveChanges();

            return Ok(existing);
        }

        // DELETE: api/Entertainer/5
        [HttpDelete("{id}")]
        public IActionResult DeleteEntertainer(int id)
        {
            var toDelete = _context.Entertainers.Find(id);
            if (toDelete == null) return NotFound();

            _context.Entertainers.Remove(toDelete);
            _context.SaveChanges();
            return NoContent();
        }
    }
}
