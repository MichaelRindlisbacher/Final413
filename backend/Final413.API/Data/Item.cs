using System.ComponentModel.DataAnnotations;

namespace Final413.API.Data
{
    public class Item
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public double Price { get; set; }

        // [Required]
        // public string Category { get; set; }

        // [Required]
        // public int Quantity { get; set; }

        // Add more fields here as needed for the exam
    }
}
