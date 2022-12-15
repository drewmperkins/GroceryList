using System.Net;
using backend.Controllers;
using backend.Services;
using Microsoft.AspNetCore.Mvc;
using Moq;
using static backend.GroceryListModel;

namespace backend_test;

public class GroceryListControllerTest
{
    private readonly Mock<IGroceryListService> groceryListService;
    public GroceryListControllerTest()
    {
        groceryListService = new Mock<IGroceryListService>();
    }

    [Theory]
    [InlineData(null)]
    [InlineData(3)]
    public void Get_GroceryLists(int? GroceryListId = null)
    {
        //arrange
        var glMockData = GetGroceryListData();
        groceryListService.Setup(x => x.Get(GroceryListId)).Returns(glMockData);
        var groceryListController = new GroceryListController(groceryListService.Object);

        //act
        ActionResult<List<GroceryList>> actionResult = groceryListController.Get(GroceryListId);

        //assert
        Assert.NotNull(actionResult);
        Assert.NotNull(actionResult.Result);
        
        Assert.IsType<OkObjectResult>(actionResult.Result!);
        var glOkObj = (OkObjectResult)actionResult.Result!;
        Assert.Equal((int)HttpStatusCode.OK, glOkObj.StatusCode);

        Assert.IsType<List<GroceryList>>(glOkObj.Value);
        var glValue = glOkObj.Value as List<GroceryList>;
        Assert.NotNull(glValue);
        Assert.Equal(glMockData.Count(), glValue!.Count());
        Assert.Equal(glMockData.ToString(), glValue!.ToString());
        Assert.True(glMockData.Equals(glValue));
    }

    [Fact]
    public void Delete_GroceryList()
    {
        //arrange
        var glMockData = GetGroceryListData();
        groceryListService.Setup(x => x.Delete(1));
        var groceryListController = new GroceryListController(groceryListService.Object);

        //act
        ActionResult<bool> actionResult = groceryListController.Delete(1);

        //assert
        Assert.NotNull(actionResult);
        Assert.NotNull(actionResult.Result);
        Assert.IsType<OkObjectResult>(actionResult.Result!);
    }

    private List<GroceryList> GetGroceryListData()
    {
        List<GroceryList> gl = new List<GroceryList>
        {
            new GroceryList
            {
                GroceryListId = 1,
                Title = "List for tonight",
                Updated = "2022-12-21T15:10:01.021Z",
                GroceryItems = new List<GroceryItem>
                {
                    new GroceryItem
                    {
                        GroceryItemId = 1,
                        GroceryListId = 1,
                        Checked = false,
                        Name = "milk",
                        SortOrder = null,
                    },
                    new GroceryItem
                    {
                        GroceryItemId = 2,
                        GroceryListId = 1,
                        Checked = true,
                        Name = "cheese",
                        SortOrder = null,
                    },
                    new GroceryItem
                    {
                        GroceryItemId = 3,
                        GroceryListId = 1,
                        Checked = false,
                        Name = "bread",
                        SortOrder = null,
                    }
                }
            },
            new GroceryList
            {
                GroceryListId = 2,
                Title = "List for 12/25",
                Updated = "2022-12-24T10:10:01.021Z",
                GroceryItems = null,
            },
            new GroceryList
            {
                GroceryListId = 3,
                Title = "New grocery list",
                Updated = "2022-12-27T18:20:01.021Z",
                GroceryItems = new List<GroceryItem>
                {
                    new GroceryItem
                    {
                        GroceryItemId = 1,
                        GroceryListId = 3,
                        Checked = false,
                        Name = "orange juice",
                        SortOrder = null,
                    },
                    new GroceryItem
                    {
                        GroceryItemId = 2,
                        GroceryListId = 3,
                        Checked = true,
                        Name = "cottage cheese",
                        SortOrder = null,
                    },
                    new GroceryItem
                    {
                        GroceryItemId = 3,
                        GroceryListId = 3,
                        Checked = false,
                        Name = "tortillas",
                        SortOrder = null,
                    }
                }
            },
        };
        return gl;
    }
}