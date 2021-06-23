using AutoMapper;
using SiteMercado.Application.DTOs;
using SiteMercado.Application.Interfaces;
using SiteMercado.Domain.Core.Services;
using SiteMercado.Domain.Entities;
using SiteMercado.Domain.Models;
using SiteMercado.Shared.Helpers;
using SiteMercado.Shared.Models;
using System.Collections.Generic;

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

        public PagedList<ProductDto> GetPaged(ProductQueryParameters parameters)
        {
            var products = productService.GetPaged(parameters);
            var productsDto = mapper.Map<IEnumerable<ProductDto>>(products);

            return new PagedList<ProductDto>(productsDto as List<ProductDto>, products.Length, products.PageIndex, products.PageSize);
        }
    }
}