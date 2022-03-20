using System;
using System.Collections.Generic;

namespace api.Models
{
    public partial class Transaction
    {
        public long? Id { get; set; }
        public long TransactionId { get; set; }
        public long? TotalCost { get; set; }
        public long? TotalTax { get; set; }
        public long? SubTotal { get; set; }
        public string? PaymentMethod { get; set; }
    }
}
