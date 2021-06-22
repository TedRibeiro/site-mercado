using SiteMercado.Domain.Core.Repositories;
using SiteMercado.Domain.Core.Services;
using SiteMercado.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SiteMercado.Domain.Services
{
    public class ProductService : BaseService<Product>, IProductService
    {
        private readonly IProductRepository productRepository;

        public ProductService(IProductRepository productRepository)
            : base(productRepository)
        {
            this.productRepository = productRepository;
        }
    }
}