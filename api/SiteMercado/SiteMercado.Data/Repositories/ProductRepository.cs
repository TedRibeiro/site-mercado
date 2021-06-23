using SiteMercado.Domain.Core.Repositories;
using SiteMercado.Domain.Entities;
using SiteMercado.Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SiteMercado.Data.Repositories
{
    public class ProductRepository : BaseRepository<Product>, IProductRepository
    {
        public ProductRepository(AppDbContext db) : base(db)
        {
        }

        public override IQueryable<Product> ApplyFilter<TQueryParams>(TQueryParams queryParams, IQueryable<Product> query)
        {
            var filter = queryParams as ProductQueryParameters;
            var searchTerm = filter.SearchTerm;

            if (!string.IsNullOrWhiteSpace(searchTerm))
            {
                query = query.Where(q => q.Name.ToLower().Contains(searchTerm));
            }

            return query;
        }
    }
}
