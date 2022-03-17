using System;
using System.Collections.Generic;

namespace api.Models
{
    public partial class Movie
    {
        public long Id { get; set; }
        public string? Name { get; set; }
        public double? Cost { get; set; }
        public double? Retail { get; set; }
        public string? Genre { get; set; }
        public string? ReleaseDate { get; set; }
        public string? Director { get; set; }
        public long? Quantity { get; set; }
        public double? Imdb { get; set; }
    }
}
