using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SiteMercado.Domain.Models
{
    public class AuthResultModel
    {
        public bool Success { get; set; }
        public string Error { get; set; }
        public string Token { get; set; }
    }
}
