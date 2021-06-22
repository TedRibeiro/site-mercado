using SiteMercado.Domain.Core.Services;
using SiteMercado.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace SiteMercado.Domain.Services
{
    public class AuthService : IAuthService
    {
        private readonly IHttpClientFactory _clientFactory;

        public AuthService(IHttpClientFactory clientFactory)
        {
            _clientFactory = clientFactory;
        }

        public async Task<string> TryLogIn(UserAuthModel user)
        {
            var request = new HttpRequestMessage(HttpMethod.Post, "login");
            var byteArray = Encoding.ASCII.GetBytes($"{user.Username}:{user.Password}");
            request.Headers.Authorization = new AuthenticationHeaderValue("Basic", Convert.ToBase64String(byteArray));
            
            var client = _clientFactory.CreateClient("SiteMercadoApi");
            var response = await client.SendAsync(request);
            
            response.EnsureSuccessStatusCode();

            return response.Content.ReadAsStringAsync().Result;
        }
    }
}
