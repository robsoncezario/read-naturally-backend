const joi = require('joi');

const patchStudents = joi.object().keys({
  id: joi.number().integer().min(1).required(),
  firstName: joi.string().optional(),
  lastName: joi.string().optional(),
  schoolName: joi.string().optional(),
  license: joi.string().valid('licensed', 'not licensed').optional(),
});

module.exports = patchStudents;
