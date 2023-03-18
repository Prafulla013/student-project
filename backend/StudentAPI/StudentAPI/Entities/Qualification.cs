using StudentAPI.Entities.BaseEntity;
using System;

namespace StudentAPI.Entities
{
    public class Qualification : CommonEntity
    {
        public string Name { get; set; }
        public string Alias { get; set; }
    }
}
