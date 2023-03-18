using System;

namespace StudentAPI.Entities.BaseEntity
{
    public abstract class CommonEntity
    {
        public int Id { get; set; }
        public int CreatedBy { get; set; }
        public int UpdatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public bool IsDeleted { get; set; } = false;

    }
}
