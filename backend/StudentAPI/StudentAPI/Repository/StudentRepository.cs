using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using StudentAPI.Data;
using StudentAPI.Entities;
using StudentAPI.Interface;
using StudentAPI.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudentAPI.Repository
{
    public class StudentRepository : IStudent
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        public StudentRepository(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<int> AddStudent(StudentModel student)
        {
            using (var dbContextTransaction = _context.Database.BeginTransaction())
            {
                try
                {
                    if (student != null)
                    {
                        Student stu = new Student();
                        stu.Address = student.Address;
                        stu.Age = student.Age;
                        stu.Name = student.Name;
                        stu.CreatedDate = DateTime.UtcNow;
                        await _context.Student.AddAsync(stu);
                        await _context.SaveChangesAsync();
                        foreach (var empQualification in student.Qualifications)
                        {
                            var qual = new StudentQualification()
                            {
                                QualificationId = empQualification.QualificationId,
                                StudentId = stu.Id,
                                Marks = empQualification.Marks,
                                Remarks = empQualification.Remarks,
                                CreatedDate = DateTime.UtcNow,
                            };
                            await _context.StudentQualifications.AddAsync(qual);
                            await _context.SaveChangesAsync();
                        }
                        dbContextTransaction.Commit();
                        return stu.Id;
                    }
                    return 0;
                }
                catch (Exception ex)
                {
                    dbContextTransaction.Rollback();
                    throw ex;
                }
            }
        }

        public async Task<int> DeleteStudent(int studentId)
        {
            using (var dbContextTransaction = _context.Database.BeginTransaction())
            {
                try
                {
                    var student = await _context.Student.Where(x => x.Id == studentId).Include(x => x.StudentQualifications).FirstOrDefaultAsync();
                    student.IsDeleted = true;
                    _context.Student.Update(student);
                    foreach (var qualification in student.StudentQualifications)
                    {
                        qualification.IsDeleted = true;
                        _context.StudentQualifications.Update(qualification);
                    }
                    _context.SaveChanges();
                    dbContextTransaction.Commit();
                    return 1;
                }
                catch (Exception ex)
                {
                    dbContextTransaction.Rollback();
                    throw ex;
                }
            }
        }

        public async Task<List<StudentModel>> GetStudent()
        {
            try
            {
                var student = await _context.Student.Where(x => x.IsDeleted == false).ToListAsync();
                var studentModel = _mapper.Map<List<StudentModel>>(student);
                return studentModel;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<StudentQualificationModel>> GetStudentById(int studentId)
        {
            try
            {
                var Qualification = await (from qualification in _context.StudentQualifications
                                           where qualification.StudentId == studentId
                                           join qual in _context.Qualifications
                                           on qualification.QualificationId equals qual.Id
                                           select new StudentQualificationModel
                                           {
                                               QualificationId = qualification.QualificationId,
                                               QualificationName = qual.Alias,
                                               Marks = qualification.Marks,
                                               Remarks = qualification.Remarks,
                                               Id = qualification.Id
                                           }).ToListAsync();

                return Qualification;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<int> UpdateStudent(int id, StudentModel student)
        {
            using (var dbContextTransaction = _context.Database.BeginTransaction())
            {
                try
                {
                    var stu = await _context.Student.Where(x => x.Id == id).Include(x => x.StudentQualifications).FirstOrDefaultAsync();
                    stu.UpdatedDate = DateTime.UtcNow;
                    stu.Name = student.Name;
                    stu.Address = student.Address;
                    stu.Age = student.Age;
                    _context.Student.Update(stu);
                    _context.StudentQualifications.RemoveRange(_context.StudentQualifications.Where(x => x.StudentId == stu.Id).ToList());
                    _context.SaveChanges();
                    foreach (var qualification in student.Qualifications)
                    {
                        var qual = new StudentQualification()
                        {
                            QualificationId = qualification.QualificationId,
                            StudentId = stu.Id,
                            Marks = qualification.Marks,
                            Remarks = qualification.Remarks,
                            CreatedDate = DateTime.UtcNow,
                        };
                        await _context.StudentQualifications.AddAsync(qual);
                        await _context.SaveChangesAsync();
                    }
                    dbContextTransaction.Commit();
                    return 1;
                }
                catch (Exception ex)
                {
                    dbContextTransaction.Rollback();
                    throw ex;
                }
            }
        }
    }
}
