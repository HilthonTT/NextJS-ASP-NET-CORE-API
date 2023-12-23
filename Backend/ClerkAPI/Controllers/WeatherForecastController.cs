using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Clerk.Net.Client;
using System.Text.Json;

namespace ClerkAPI.Controllers;
[ApiController]
[Route("[controller]")]
[Authorize]
public class WeatherForecastController : ControllerBase
{
    private static readonly string[] Summaries =
    [
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    ];

    private readonly ILogger<WeatherForecastController> _logger;
    private readonly ClerkApiClient _client;

    public WeatherForecastController(ILogger<WeatherForecastController> logger, ClerkApiClient client)
    {
        _logger = logger;
        _client = client;
    }

    [HttpGet(Name = "GetWeatherForecast")]
    public async Task<IEnumerable<WeatherForecast>> Get()
    {
        var claims = HttpContext.User.Claims;
        foreach (var claim in claims)
        {
            Console.WriteLine(claim);
        }

        string userId = claims.FirstOrDefault(x => 
            x.Type.Contains("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier", 
                StringComparison.InvariantCultureIgnoreCase))?.Value;

        var users = await _client.Users.GetAsync();
        var user = users.FirstOrDefault(x => x.Id == userId);

        if (user is not null)
        {
            var options =  new JsonSerializerOptions() { WriteIndented = true };
            string jsonifiedUser = JsonSerializer.Serialize(user, options);
            Console.WriteLine(jsonifiedUser);
        }
        else
        {
            Console.WriteLine("Null");
        }

        return Enumerable.Range(1, 5).Select(index => new WeatherForecast
        {
            Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            TemperatureC = Random.Shared.Next(-20, 55),
            Summary = Summaries[Random.Shared.Next(Summaries.Length)]
        })
        .ToArray();
    }
}
