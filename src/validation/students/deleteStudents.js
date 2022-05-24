const joi = require('joi');

const deleteStudents = joi.object().keys({
  studentsIds: joi.array().items(joi.number().integer().min(1)),
});

module.exports = deleteStudents;
