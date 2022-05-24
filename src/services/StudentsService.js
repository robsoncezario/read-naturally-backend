const Student = require('../models/Student');

class StudentsService {
  static async create({
    firstName, lastName, schoolName, license,
  }) {
    const student = await Student.create({
      firstName,
      lastName,
      schoolName,
      license,
    });

    return student;
  }

  static async findAll({
    page, rows, sortBy, orderBy,
  }) {
    const { count, rows: students } = await Student.findAndCountAll({
      offset: (page - 1) * rows,
      limit: rows,
      order: [[sortBy, orderBy]],
    });

    return {
      students,
      count,
    };
  }

  static async update({
    id, firstName, lastName, schoolName, license,
  }) {
    const columns = {
      firstName,
      lastName,
      schoolName,
      license,
    };

    const data = Object.fromEntries(
      Object.entries(columns).filter(([, v]) => v != null),
    );
    const [affectedCount] = await Student.update(data, { where: { id } });
    return affectedCount;
  }

  static async deleteMany(studentsIds) {
    const destroyedCount = await Student.destroy({
      where: { id: studentsIds },
    });

    return destroyedCount;
  }
}

module.exports = StudentsService;
