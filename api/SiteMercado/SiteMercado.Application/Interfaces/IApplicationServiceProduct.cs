using SiteMercado.Application.DTOs;
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

        void Remove(ProductDto ProductDto);

        IEnumerable<ProductDto> GetAll();

        ProductDto GetById(int id);
    }
}
