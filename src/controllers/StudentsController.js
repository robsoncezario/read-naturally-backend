const studentsService = require('../services/StudentsService');

class StudentsController {
  static async create(req, res) {
    const {
      firstName, lastName, schoolName, license,
    } = req.body;
    const student = await studentsService.create({
      firstName,
      lastName,
      schoolName,
      license,
    });

    return res.json(student);
  }

  static async findAll(req, res) {
    const {
      page, rows, sortBy, orderBy,
    } = req.query;

    const { students, count } = await studentsService.findAll({
      page: parseInt(page, 10),
      rows: parseInt(rows, 10),
      sortBy,
      orderBy,
    });

    return res.json({
      students,
      count,
    });
  }

  static async update(req, res) {
    const {
      id, firstName, lastName, schoolName, license,
    } = req.body;
    const affectedCount = await studentsService.update({
      id,
      firstName,
      lastName,
      schoolName,
      license,
    });

    if (affectedCount === 0) {
      return res.status(404).send({ error: 'Not found' });
    }

    return res.json({
      affectedCount,
    });
  }

  static async deleteMany(req, res) {
    const { studentsIds } = req.body;
    const destroyedCount = await studentsService.deleteMany(studentsIds);

    if (destroyedCount === 0) {
      return res.status(404).send({ error: 'Not found' });
    }

    return res.json({
      destroyedCount,
    });
  }
}

module.exports = StudentsController;
