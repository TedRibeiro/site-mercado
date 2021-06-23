using Microsoft.EntityFrameworkCore;
using SiteMercado.Domain.Core.Repositories;
using SiteMercado.Domain.Models;
using SiteMercado.Shared.Helpers;
using SiteMercado.Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SiteMercado.Data.Repositories
{
    public class BaseRepository<TEntity> : IBaseRepository<TEntity> where TEntity : class
    {
        private readonly AppDbContext db;

        public BaseRepository(AppDbContext db)
        {
            this.db = db;
        }

        public void Add(TEntity obj)
        {
            db.Set<TEntity>().Add(obj);
            db.SaveChanges();
        }

        public IEnumerable<TEntity> GetAll()
        {
            return db.Set<TEntity>().ToList();
        }

        public TEntity GetById(int id)
        {
            return db.Set<TEntity>().Find(id);
        }

        public void Remove(TEntity obj)
        {
            db.Set<TEntity>().Remove(obj);
            db.SaveChanges();
        }

        public void Update(TEntity obj)
        {
            db.Entry(obj).State = EntityState.Modified;
            db.SaveChanges();
        }

        public PagedList<TEntity> GetPaged<TQueryParams>(TQueryParams queryParams) where TQueryParams : BaseQueryParameters
        {
            var collection = ApplyFilter(queryParams, db.Set<TEntity>());
            collection = ApplySort(queryParams, collection);
            return PagedList<TEntity>.ToPagedList(collection, queryParams.PageNumber, queryParams.PageSize);
        }

        public virtual IQueryable<TEntity> ApplyFilter<TQueryParams>(TQueryParams queryParams, IQueryable<TEntity> query)
            where TQueryParams : BaseQueryParameters
        {
            return query;
        }

        public virtual IQueryable<TEntity> ApplySort<TQueryParams>(TQueryParams queryParams, IQueryable<TEntity> query)
            where TQueryParams : BaseQueryParameters
        {
            return query;
        }
    }
}