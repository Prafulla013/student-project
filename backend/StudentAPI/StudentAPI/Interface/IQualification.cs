using StudentAPI.Entities;
using StudentAPI.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace StudentAPI.Interface
{
    public interface IQualification
    {
        public Task<IEnumerable<QualificationModel>> GetQualificationsList();
    }
}
