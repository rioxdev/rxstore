using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class BasketController : BaseApiController
    {
        private readonly StoreContext _storeContext;

        public BasketController(StoreContext storeContext)
        {
            _storeContext = storeContext;
        }

        [HttpGet(Name = "GetBasket")]
        public async Task<ActionResult<BasketDto>> GetBasket()
        {
            Basket basket = await RetrieveBasket();

            if (basket == null)
            {
                return NotFound();
            }

            return MapBasketToDto(basket);
        }

        private BasketDto MapBasketToDto(Basket basket)
        {
            return new BasketDto
            {
                Id = basket.Id,
                BuyerId = basket.BuyerId,
                Items = basket.Items.Select(item => new BasketItemDto
                {
                    Brand = item.Product.Brand,
                    Name = item.Product.Name,
                    PictureUrl = item.Product.PictureUrl,
                    Price = item.Product.Price,
                    ProductId = item.ProductId,
                    Quantity = item.Quantity,
                    Type = item.Product.Type

                }).ToList()
            };
        }

        [HttpPost]
        public async Task<ActionResult<BasketDto>> AddItemToBasket(int productId, int quantity)
        {
            Basket basket = await RetrieveBasket() ?? CreateBasket();
            Product product = await _storeContext.Products.FindAsync(productId);
            if (product == null) return NotFound();

            await Task.Delay(1000);

            basket.AddItem(product, quantity);

            var result = await _storeContext.SaveChangesAsync() > 0;

            if (result)
            {
                return CreatedAtRoute("GetBasket", MapBasketToDto(basket));
            }

            return BadRequest(new ProblemDetails
            {
                Title = "Problem saving item to basket"
            });
        }

        [HttpDelete]
        public async Task<ActionResult> RemoveItem(int productId, int quantity)
        {
            var basket = await RetrieveBasket();

            if (basket == null) return NotFound();

            basket.RemoveItem(productId, quantity);

            _storeContext.SaveChanges();

            return Ok();
        }

        private async Task<Basket> RetrieveBasket()
        {
            return await _storeContext.Baskets
                .Include(i => i.Items)
                .ThenInclude(p => p.Product)
                .FirstOrDefaultAsync(b => b.BuyerId == Request.Cookies["buyerId"]);
        }

        public Basket CreateBasket()
        {
            var buyerId = Guid.NewGuid().ToString();
            var cookieOptions = new CookieOptions
            {
                IsEssential = true,
                Expires = DateTime.UtcNow.AddDays(30)
            };

            Response.Cookies.Append("buyerId", buyerId, cookieOptions);

            var basket = new Basket() { BuyerId = buyerId };
            _storeContext.Baskets.Add(basket);

            return basket;
        }

    }
}
