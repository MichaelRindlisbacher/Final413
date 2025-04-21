using System.Linq;
using System.Reflection;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq.Dynamic.Core;
using System.Collections.Generic;

namespace Final413.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GenericEntityController<TEntity> : ControllerBase where TEntity : class
    {
        private readonly DbContext _context;
        private readonly DbSet<TEntity> _dbSet;

        public GenericEntityController(DbContext context)
        {
            _context = context;
            _dbSet = _context.Set<TEntity>();
        }

        [HttpGet("All")]
        public IActionResult GetAll(
            int pageHowMany = 10,
            int pageNum = 1,
            string order = "id",
            string direction = "asc")
        {
            var query = _dbSet.AsQueryable();

            var total = query.Count();

            var result = query
                .OrderBy(direction.ToLower() == "desc" ? order + " DESC" : order + " ASC")
                .Skip(pageHowMany * (pageNum - 1))
                .Take(pageHowMany)
                .ToList();

            return Ok(new
            {
                items = result,
                totalItems = total
            });
        }

        [HttpPost("Add")]
        public IActionResult Add([FromBody] TEntity newItem)
        {
            _dbSet.Add(newItem);
            _context.SaveChanges();
            return Ok(newItem);
        }

        [HttpPut("Update/{id}")]
        public IActionResult Update(int id, [FromBody] TEntity updatedItem)
        {
            var entity = _dbSet.Find(id);
            if (entity == null)
                return NotFound(new { message = "Item not found" });

            // Update properties dynamically
            foreach (var prop in typeof(TEntity).GetProperties())
            {
                if (prop.Name.Equals("id", StringComparison.OrdinalIgnoreCase)) continue;

                var newValue = prop.GetValue(updatedItem);
                prop.SetValue(entity, newValue);
            }

            _dbSet.Update(entity);
            _context.SaveChanges();

            return Ok(entity);
        }

        [HttpDelete("Delete/{id}")]
        public IActionResult Delete(int id)
        {
            var entity = _dbSet.Find(id);
            if (entity == null)
                return NotFound(new { message = "Item not found" });

            _dbSet.Remove(entity);
            _context.SaveChanges();

            return NoContent();
        }
    }
}
