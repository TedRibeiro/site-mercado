using SiteMercado.Domain.Entities;
using System;
using System.Collections.Generic;

namespace SiteMercado.Domain.Interfaces
{
    public interface IBaseRepository<TEntity> where TEntity : BaseEntity
    {
        void Insert(TEntity obj);
        void Update(TEntity obj);
        void Delete(TEntity obj);
        IList<TEntity> Get(TEntity obj);
        TEntity Get(Guid id);
    }
}
