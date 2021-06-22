using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SiteMercado.Api.Services;
using SiteMercado.Domain.Core.Services;
using SiteMercado.Domain.Models;
using System.Text.Json;

namespace SiteMercado.Api.Controllers
{
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
            var response = _authService.TryLogIn(user).Result;

            var authResult = JsonSerializer.Deserialize<AuthResultModel>(response);
            if (!authResult.Success)
            {
                ModelState.AddModelError("Auth", "Usuário ou senha inválidos.");
                return BadRequest(ModelState);
            }

            var token = TokenService.GenerateToken(user);

            return Ok(token);
        }
    }
}
