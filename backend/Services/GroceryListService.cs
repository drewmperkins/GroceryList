using backend;
using static backend.GroceryListModel;

namespace backend.Services;

public interface IGroceryListService
{
    List<GroceryList> Get(int? GroceryListId);
    int Post(GroceryList gl);
    void Delete(int GroceryListId);
}

public class GroceryListService : IGroceryListService
{
    private readonly DataContext _dbContext;
    public GroceryListService(DataContext dbContext)
    {
        _dbContext = dbContext;
    }

    public List<GroceryList> Get(int? GroceryListId)
    {
        IQueryable<GroceryList>? gl = _dbContext.GroceryList.AsQueryable();
        if (GroceryListId != null)
        {
            gl = gl.Where(x => x.GroceryListId == GroceryListId);
            gl.First().GroceryItems = _dbContext.GroceryItem.Where(x => x.GroceryListId == GroceryListId).ToList();
        }
        return gl.OrderByDescending(x => x.GroceryListId).ToList();
    }

    public int Post(GroceryList gl)
    {
        // update list
        IQueryable<GroceryList> dbGroceryList = _dbContext.GroceryList.Where(x => x.GroceryListId == gl.GroceryListId);
        if (dbGroceryList.Count() == 0) {
            _dbContext.GroceryList.Add(gl);
        } else {
            var objGL = dbGroceryList.First();
            objGL.Title = gl.Title;
            objGL.Updated = gl.Updated;
        }

        // remove items
        IQueryable<GroceryItem> dbGroceryItems = _dbContext.GroceryItem.Where(x => x.GroceryListId == gl.GroceryListId);
        foreach (GroceryItem gi in dbGroceryItems)
            _dbContext.GroceryItem.Remove(gi);
        // add items
        foreach (GroceryItem gi in gl.GroceryItems!) {
            if (gi.Name == null) continue;
            gi.GroceryListId = gl.GroceryListId;
            _dbContext.GroceryItem.Add(gi);
        }

        _dbContext.SaveChanges();
        return gl.GroceryListId!.Value;
    }

    public void Delete(int GroceryListId)
    {
        // remove items
        IQueryable<GroceryItem> dbGroceryItems = _dbContext.GroceryItem.Where(c => c.GroceryListId == GroceryListId);
        if (dbGroceryItems.Count() > 0)
            foreach (GroceryItem gi in dbGroceryItems)
                _dbContext.Remove(gi);
        
        // remove list
        IQueryable<GroceryList> dbGroceryList = _dbContext.GroceryList.Where(c => c.GroceryListId == GroceryListId);
        if (dbGroceryList.Count() > 0)
            _dbContext.Remove(dbGroceryList.First());

        _dbContext.SaveChanges();
    }
}