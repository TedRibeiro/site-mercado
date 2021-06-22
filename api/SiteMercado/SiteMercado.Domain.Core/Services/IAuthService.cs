using SiteMercado.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SiteMercado.Domain.Core.Services
{
    public interface IAuthService
    {
        Task<string> TryLogIn(UserAuthModel user);
    }
}
