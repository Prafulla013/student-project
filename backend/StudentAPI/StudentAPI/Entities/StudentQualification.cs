using StudentAPI.Entities.BaseEntity;
using System.ComponentModel.DataAnnotations.Schema;

namespace StudentAPI.Entities
{
    public class StudentQualification : CommonEntity
    {
        public int QualificationId { get; set; }
        [ForeignKey("QualificationId")]
        public Qualification Qualification { get; set; }
        public int StudentId { get; set; }
        [ForeignKey("StudentId")]
        public Student Student { get; set; }
        public float Marks { get; set; }
        public string Remarks { get; set; }
    }
}
