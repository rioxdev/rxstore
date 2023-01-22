using API.Entities;

namespace API.Extensions
{
    public static class ProductExtensions
    {
        public static IQueryable<Product> Sort(this IQueryable<Product> query, string orderBy)
        {
            if (string.IsNullOrEmpty(orderBy))
                return query.OrderBy(p=> p.Name);
            
            return orderBy switch
            {
                "price" => query.OrderBy(p => p.Price),
                "priceDesc" => query.OrderByDescending(p => p.Price),
                _ => query.OrderBy(p => p.Name)
            };

        }

        public static IQueryable<Product> Search(this IQueryable<Product> query, string filter)
        {
            if (string.IsNullOrEmpty(filter))
                return query;

            return query.Where(p=> p.Name.ToLower().Contains(filter.ToLower()));    

        }

        public static IQueryable<Product> Filter(this IQueryable<Product> query, string brands, string types)
        {

            List<string> brandList = string.IsNullOrEmpty(brands) ?
                new List<string>() : brands.ToLower().Split(",").ToList();

            List<string> typeList = string.IsNullOrEmpty(types)?
                new List<string>() : types.ToLower().Split(",").ToList();

            query = query.Where(p=> !brandList.Any() || brandList.Contains(p.Brand.ToLower()));
            query = query.Where(p=> !typeList.Any() || typeList.Contains(p.Type.ToLower()));
            
            return query;
        }

    }
}
