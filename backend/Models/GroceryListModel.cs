using System.ComponentModel.DataAnnotations.Schema;

namespace backend;

public class GroceryListModel
{
    public class GroceryList
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int? GroceryListId { get; set; }
        public string? Title { get; set; }
        [System.ComponentModel.DataAnnotations.Schema.NotMapped]
        public List<GroceryItem>? GroceryItems { get; set; }
        public string? Updated { get; set; }
    }

    public class GroceryItem
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int? GroceryItemId { get; set; }
        public int? GroceryListId { get; set; }
        public bool Checked { get; set; }
        public string? Name { get; set; }
        public int? SortOrder { get; set; }
    }
}