const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const StudentsController = require('./controllers/StudentsController');
const { validateBody, validateQuery } = require('./middlewares/joi');

const {
  getStudentsSchema,
  postStudentsSchema,
  patchStudentsSchema,
  deleteStudentsSchema,
} = require('./validation/students');

const routes = express.Router();

routes.get(
  '/students',
  validateQuery(getStudentsSchema),
  StudentsController.findAll,
);
routes.post(
  '/students',
  validateBody(postStudentsSchema),
  StudentsController.create,
);
routes.patch(
  '/students',
  validateBody(patchStudentsSchema),
  StudentsController.update,
);
routes.delete(
  '/students',
  validateBody(deleteStudentsSchema),
  StudentsController.deleteMany,
);

module.exports = routes;
