using SiteMercado.Application.DTOs;
using SiteMercado.Domain.Models;
using SiteMercado.Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SiteMercado.Application.Interfaces
{
    public interface IApplicationServiceProduct
    {
        ProductDto Add(ProductDto ProductDto);

        ProductDto Update(ProductDto ProductDto);

        void Remove(int id);

        IEnumerable<ProductDto> GetAll();

        ProductDto GetById(int id);

        IEnumerable<ProductDto> GetPaged(ProductQueryParameters parameters);
    }
}
