using System;
using System.Collections.Generic;

namespace api.Models
{
    public partial class TransactionMovie
    {
        public long Id { get; set; }
        public long? TransactionId { get; set; }
        public long? MovieId { get; set; }
        public long? Quantity { get; set; }
    }
}
