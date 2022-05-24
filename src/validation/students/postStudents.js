const joi = require('joi');

const postStudents = joi.object().keys({
  firstName: joi.string().required(),
  lastName: joi.string().required(),
  schoolName: joi.string().required(),
  license: joi.string().required().valid('licensed', 'not licensed'),
});

module.exports = postStudents;
