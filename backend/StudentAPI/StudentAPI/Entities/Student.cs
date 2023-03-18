using StudentAPI.Entities.BaseEntity;
using System.Collections.Generic;

namespace StudentAPI.Entities
{
    public class Student : CommonEntity
    {
        public string Name { get; set; }
        public string Address { get; set; }
        public float Age { get; set; }
        public ICollection<StudentQualification> StudentQualifications { get; set; }
    }
}
