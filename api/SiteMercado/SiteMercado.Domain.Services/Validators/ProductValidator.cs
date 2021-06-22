using FluentValidation;
using SiteMercado.Domain.Entities;

namespace SiteMercado.Domain.Services.Validators
{
    public class ProductValidator: AbstractValidator<Product>
    {
        public ProductValidator()
        {
            RuleFor(prop => prop.Name)
                    .NotEmpty()
                    .MaximumLength(60);

            RuleFor(prop => prop.Description)
                    .NotEmpty()
                    .MaximumLength(300);
            
            RuleFor(prop => prop.Price)
                    .NotNull();
            
            RuleFor(prop => prop.PhotoUrl)
                    .NotEmpty();
        }
    }
}
