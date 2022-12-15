using System.ComponentModel.DataAnnotations;
using backend.Services;
using Microsoft.AspNetCore.Mvc;
using static backend.GroceryListModel;

namespace backend.Controllers;

[ApiController]
[Route("[controller]")]
public class GroceryListController : ControllerBase
{
    private readonly IGroceryListService _service;

    public GroceryListController(IGroceryListService service)
    {
        _service = service;
    }

    [HttpGet]
    public ActionResult<List<GroceryList>> Get([FromQuery] int? GroceryListId)
    {
        var result = _service.Get(GroceryListId);
        return Ok(result);
    }

    [HttpPost]
    public ActionResult<int> Post([FromBody] GroceryList gl)
    {
        var result = _service.Post(gl);
        return Ok(result);
    }

    [HttpDelete]
    public ActionResult<bool> Delete([Required, FromQuery] int GroceryListId)
    {
        _service.Delete(GroceryListId);
        return Ok(true);
    }
}
