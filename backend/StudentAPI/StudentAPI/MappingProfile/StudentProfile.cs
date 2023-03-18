using AutoMapper;
using StudentAPI.Entities;
using StudentAPI.Model;

namespace StudentAPI.MappingProfile
{
    public class StudentProfile : Profile
    {
        public StudentProfile()
        {
            CreateMap<Student, StudentModel>()
             .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));
        }
    }
}
