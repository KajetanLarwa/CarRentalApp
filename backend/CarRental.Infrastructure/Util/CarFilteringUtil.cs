using System.Collections.Generic;
using System.Linq;
using CarRental.Domain.Dto;

namespace CarRental.Infrastructure.Util
{
    public static class CarFilteringUtil
    {
        public static List<CarDetails> FilterCars(IEnumerable<CarDetails> cars, CarListFilter filter)
        {
            return cars.Where(car => ((filter.Brands.Contains(car.Brand) && filter.Models.Contains(car.Model)) ||
                                     (filter.Brands.Length == 0 && filter.Models.Length == 0) ||
                                     (filter.Models.Length == 0 && filter.Brands.Contains(car.Brand))) &&
                                     (filter.Categories.Contains(car.Category) || filter.Categories.Length == 0 || car.Category == null) &&
                                     (car.Capacity >= filter.CapacityMin || !car.Capacity.HasValue) &&
                                     (car.Capacity <= filter.CapacityMax || !car.Capacity.HasValue) &&
                                     car.ProductionYear >= filter.ProductionYearMin &&
                                     car.ProductionYear <= filter.ProductionYearMax &&
                                     car.HorsePower >= filter.HorsePowerMin &&
                                     car.HorsePower <= filter.HorsePowerMax).ToList();
        }
    }
}