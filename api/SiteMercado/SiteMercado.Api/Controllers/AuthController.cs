using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SiteMercado.Api.Services;
using SiteMercado.Domain.Core.Services;
using SiteMercado.Domain.Models;
using System.Text.Json;

namespace SiteMercado.Api.Controllers
{
    [Route("auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [AllowAnonymous]
        [HttpPost]
        public IActionResult Authenticate([FromBody] UserAuthModel user)
        {
            if (string.IsNullOrWhiteSpace(user.Username) || string.IsNullOrWhiteSpace(user.Password))
            {
                ModelState.AddModelError("Auth", "Os dados de acesso estão incompletos");
                return BadRequest(ModelState);
            }

            var response = _authService.TryLogIn(user).Result;

            var authResult = JsonSerializer
                .Deserialize<AuthResultModel>(response, 
                new JsonSerializerOptions {
                    PropertyNameCaseInsensitive = true
                });

            if (!authResult.Success)
            {
                ModelState.AddModelError("Auth", "Usuário ou senha inválidos");
                return BadRequest(ModelState);
            }

            authResult.Token = TokenService.GenerateToken(user);

            return Ok(authResult);
        }
    }
}
