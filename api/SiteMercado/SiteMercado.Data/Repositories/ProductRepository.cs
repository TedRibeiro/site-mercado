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
        
        public override IQueryable<Product> ApplySort<TQueryParams>(TQueryParams queryParams, IQueryable<Product> query)
        {
            var filter = queryParams as ProductQueryParameters;
            var sortActive = filter.SortActive;

            if (!string.IsNullOrWhiteSpace(sortActive))
            {
                var isAsc = filter.SortDirection == "asc";

                if (sortActive == "name")
                {
                    query = isAsc ? query.OrderBy(q => q.Name) : query.OrderByDescending(q => q.Name);
                }
                else if (sortActive == "price")
                {
                    query = isAsc ? query.OrderBy(q => q.Price) : query.OrderByDescending(q => q.Price);
                }

            }

            return query;
        }
    }
}
