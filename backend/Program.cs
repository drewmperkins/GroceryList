using backend;
using backend.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<DataContext>();
builder.Services.AddScoped<IGroceryListService, GroceryListService>();
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
// PascalCase - json properties
builder.Services.AddControllers().AddJsonOptions(jsonOptions =>
{
    jsonOptions.JsonSerializerOptions.PropertyNamingPolicy = null;
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(
    options => options.WithOrigins("https://localhost", "http://localhost:4200", "http://127.0.0.1:4200").AllowAnyMethod().AllowAnyHeader()
);

app.UseMiddleware<ErrorHandlerMiddleware>();
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();