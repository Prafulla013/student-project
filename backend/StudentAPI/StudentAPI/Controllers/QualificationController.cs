using Microsoft.AspNetCore.Mvc;
using StudentAPI.Interface;
using System.Linq;
using System.Threading.Tasks;

namespace StudentAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class QualificationController : ControllerBase
    {
        private readonly IQualification _qualification;
        public QualificationController(IQualification qualification)
        {
            _qualification = qualification;
        }
        [HttpGet]
        public async Task<IActionResult> GetQualificationList()
        {
            var list = await _qualification.GetQualificationsList();
            return Ok(list);
        }
    }
}
