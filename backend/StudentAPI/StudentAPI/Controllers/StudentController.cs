using Microsoft.AspNetCore.Mvc;
using StudentAPI.Interface;
using StudentAPI.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace StudentAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class StudentController : ControllerBase
    {
        private readonly IStudent _student;
        public StudentController(IStudent student)
        {
            _student = student;
        }
        [HttpGet]
        public async Task<IActionResult> GetStudentList()
        {
            var list = await _student.GetStudent();
            return Ok(list);
        }
        [HttpPost]
        public async Task<IActionResult> AddStudent([FromBody] StudentModel student)
        {
            var isSave = await _student.AddStudent(student);
            return Ok(isSave);
        }
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteStudent(int id)
        {
            var isDelete = await _student.DeleteStudent(id);
            return Ok(isDelete);
        }
        [HttpPut("{id:int}")]
        public async Task<IActionResult> UpdateStudent(int id, [FromBody] StudentModel student)
        {
            var isUpdate = await _student.UpdateStudent(id, student);
            return Ok(isUpdate);
        }
        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetStudentDetailById(int id)
        {
            var detail = await _student.GetStudentById(id);
            return Ok(detail);
        }
    }
}
