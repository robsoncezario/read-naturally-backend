const joi = require('joi');

const getStudents = joi.object().keys({
  page: joi.number().integer().min(1).required(),
  rows: joi.number().integer().min(5).max(50)
    .required(),
  sortBy: joi
    .string()
    .valid('id', 'firstName', 'lastName', 'schoolName', 'license')
    .default('id')
    .required(),
  orderBy: joi.string().valid('ASC', 'DESC').default('DESC').required(),
});

module.exports = getStudents;
