using API.Data;
using API.Entities;
using API.Extensions;
using API.RequestHelpers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Globalization;
using System.Text.Json;

namespace API.Controllers
{
    public class ProductsController : BaseApiController
    {
        private readonly StoreContext _context;

        public ProductsController(StoreContext storeContext)
        {
            _context = storeContext;
        }

        [HttpGet]
        public async Task<ActionResult<PagedList<Product>>> GetAll([FromQuery] ProductParams productParams)
        {
            await Task.Delay(1000);

            var query = _context.Products
            .Sort(productParams.OrderBy)
           .Search(productParams.SearchTerm)
           .Filter(productParams.Brands, productParams.Types)
           .AsQueryable();

            var products = await PagedList<Product>.ToPagedList(query, productParams.PageNumber, productParams.PageSize);

            Response.Headers.Add("Pagination", JsonSerializer.Serialize(products.MetaData));

            return Ok(products);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> Get(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }

            await Task.Delay(500);
            return Ok(product);
        }

        [HttpGet("filters")]
        public async Task<ActionResult> GetFilters()
        {
            var brands = await _context.Products.Select(p => p.Brand).Distinct().OrderBy(b => b).ToListAsync();
            var types = await _context.Products.Select(p => p.Type).Distinct().OrderBy(t => t).ToListAsync();

            return Ok(new { types, brands });
        }

    }
}
