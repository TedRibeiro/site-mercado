using SiteMercado.Shared.Helpers;
using SiteMercado.Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SiteMercado.Domain.Core.Repositories
{
    public interface IBaseRepository<TEntity> where TEntity : class
    {
        void Add(TEntity obj);

        void Update(TEntity obj);

        void Remove(TEntity obj);

        IEnumerable<TEntity> GetAll();

        TEntity GetById(int id);

        PagedList<TEntity> GetPaged<TQueryParams>(TQueryParams filter) 
            where TQueryParams : BaseQueryParameters;
    }
}
