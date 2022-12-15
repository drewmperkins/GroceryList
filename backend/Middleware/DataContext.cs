using backend;
using Microsoft.EntityFrameworkCore;
using static backend.GroceryListModel;

public class DataContext : DbContext
{
    protected readonly IConfiguration Configuration;

    public DataContext(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    protected override void OnConfiguring(DbContextOptionsBuilder options)
    {
        // connect to mysql with connection string from app settings
        var connectionString = Configuration.GetConnectionString("dbGroceryList");
        options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
    }

    public DbSet<GroceryList> GroceryList => Set<GroceryList>();
    public DbSet<GroceryItem> GroceryItem => Set<GroceryItem>();
}