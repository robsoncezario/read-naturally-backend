const getStudents = require('./getStudents');
const postStudents = require('./postStudents');
const patchStudents = require('./patchStudents');
const deleteStudents = require('./deleteStudents');

module.exports = {
  getStudentsSchema: getStudents,
  postStudentsSchema: postStudents,
  patchStudentsSchema: patchStudents,
  deleteStudentsSchema: deleteStudents,
};
