using System.Collections.Generic;
using System.Linq;

namespace SiteMercado.Shared.Helpers
{
    public class PagedList<T> : List<T>
    {
        public int PageIndex { get; private set; }
        public int PageSize { get; private set; }
        public int Length { get; private set; }

        public PagedList(List<T> items, int count, int pageNumber, int pageSize)
        {
            PageIndex = pageNumber;
            Length = count;
            PageSize = pageSize;

            AddRange(items);
        }

        public static PagedList<T> ToPagedList(IQueryable<T> source, int pageNumber, int pageSize)
        {
            var count = source.Count();
            var items = source.Skip(pageNumber * pageSize)
                .Take(pageSize)
                .ToList();

            return new PagedList<T>(items, count, pageNumber, pageSize);
        }
    }
}
