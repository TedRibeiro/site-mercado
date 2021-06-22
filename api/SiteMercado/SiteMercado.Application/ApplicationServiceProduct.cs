using AutoMapper;
using SiteMercado.Application.DTOs;
using SiteMercado.Application.Interfaces;
using SiteMercado.Domain.Core.Services;
using SiteMercado.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SiteMercado.Application
{
    public class ApplicationServiceProduct : IApplicationServiceProduct
    {
        private readonly IProductService productService;
        private readonly IMapper mapper;

        public ApplicationServiceProduct(IProductService serviceProduto, IMapper mapper)
        {
            this.productService = serviceProduto;
            this.mapper = mapper;
        }

        public ProductDto Add(ProductDto ProductDto)
        {
            var product = mapper.Map<Product>(ProductDto);
            productService.Add(product);
            return mapper.Map<ProductDto>(product);
        }

        public IEnumerable<ProductDto> GetAll()
        {
            var products = productService.GetAll();
            var productsDto = mapper.Map<IEnumerable<ProductDto>>(products);
            return productsDto;
        }

        public ProductDto GetById(int id)
        {
            var product = productService.GetById(id);
            var productDto = mapper.Map<ProductDto>(product);
            return productDto;
        }

        public void Remove(int id)
        {
            var product = productService.GetById(id);
            productService.Remove(product);
        }

        public ProductDto Update(ProductDto productDto)
        {
            var product = mapper.Map<Product>(productDto);
            productService.Update(product);
            return mapper.Map<ProductDto>(product);
        }
    }
}