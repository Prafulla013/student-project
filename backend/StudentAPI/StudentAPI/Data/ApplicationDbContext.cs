using Microsoft.EntityFrameworkCore;
using StudentAPI.Entities;
using System;

namespace StudentAPI.Data
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<Qualification> Qualifications { get; set; }
        public DbSet<Student> Student { get; set; }
        public DbSet<StudentQualification> StudentQualifications { get; set; }
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
        { }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var connectionString = "Server=localhost; Database=studentdb; Integrated Security=True;TrustServerCertificate=True";
            optionsBuilder.UseSqlServer(connectionString);
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Qualification>().HasData(
                new Qualification
                {
                    Id = 1,
                    Name = "School Leaving Certificate",
                    Alias = "SLC",
                },
                new Qualification
                {
                    Id = 2,
                    Name = "Higher Secondary School",
                    Alias = "10 +2",
                },
                new Qualification
                {
                    Id = 3,
                    Name = "Bachelor",
                    Alias = "Bachelor",
                },
                new Qualification
                {
                    Id = 4,
                    Name = "Master",
                    Alias = "Master",
                });
        }
    }
}
