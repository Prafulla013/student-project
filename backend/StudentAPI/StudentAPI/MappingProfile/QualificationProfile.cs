using AutoMapper;
using StudentAPI.Entities;
using StudentAPI.Model;

namespace StudentAPI.MappingProfile
{
    public class QualificationProfile : Profile
    {
        public QualificationProfile()
        {
            CreateMap<Qualification, QualificationModel>()
                 .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));
        }
    }
}
