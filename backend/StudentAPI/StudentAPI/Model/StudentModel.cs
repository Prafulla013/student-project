using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace StudentAPI.Model
{
    public class StudentModel
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Address { get; set; }
        [Required]
        public float Age { get; set; }
        public ICollection<StudentQualificationModel> Qualifications { get; set; }
    }
}
