using StudentAPI.Entities;
using StudentAPI.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace StudentAPI.Interface
{
    public interface IStudent
    {
        Task<int> AddStudent(StudentModel student);
        Task<int> UpdateStudent(int studentid, StudentModel student);
        Task<int> DeleteStudent(int studentId);
        Task<List<StudentQualificationModel>> GetStudentById(int studentId);
        Task<List<StudentModel>> GetStudent();
    }
}
