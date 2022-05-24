const supertest = require('supertest');
const createServer = require('../src/app');

const app = createServer();

describe('POST /students', () => {
  const studentData = {
    firstName: 'Robson',
    lastName: 'Silva',
    schoolName: 'Universidade do Vale do Itajai',
    license: 'licensed',
  };

  it('should insert a student successfully', (done) => {
    supertest(app)
      .post('/api/students')
      .send(studentData)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(200)
      .then((response) => {
        const student = JSON.parse(response.text);

        expect(student).toHaveProperty('firstName');
        expect(student).toHaveProperty('lastName');
        expect(student).toHaveProperty('schoolName');
        expect(student).toHaveProperty('license');
        expect(student.firstName).toBe('Robson');
        expect(student.lastName).toBe('Silva');
        expect(student.schoolName).toBe('Universidade do Vale do Itajai');
        expect(student.license).toBe('licensed');

        done();
      });
  });

  const bodyProps = Object.entries(studentData);
  const incompleteBody = bodyProps.map(([key]) => bodyProps.filter(([k]) => k !== key));

  incompleteBody.forEach((q, index) => {
    const fields = Object.fromEntries(q);

    it(`insert should fail if body doesn\`t contain ${bodyProps[index][0]} field`, (done) => {
      supertest(app).post('/api/students').send(fields).expect(400, done);
    });
  });
});

describe('PATCH /students', () => {
  const studentData = {
    id: 1,
    firstName: 'Robson',
    lastName: 'Silva',
    schoolName: 'Universidade Federal de Santa Catarina',
    license: 'not licensed',
  };

  it('should update a existing user', (done) => {
    supertest(app)
      .patch('/api/students')
      .send(studentData)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(200, done);
  });

  it('update should fail with error code 404, invalid id', (done) => {
    supertest(app)
      .patch('/api/students')
      .send({
        ...studentData,
        ...{ id: 999999 },
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(404, done);
  });

  it('update should fail with error code 400, id missing', (done) => {
    supertest(app)
      .patch('/api/students')
      .send({
        ...studentData,
        ...{ id: undefined },
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(400, done);
  });
});

describe('GET /students', () => {
  const exampleQuery = {
    page: 1,
    rows: 5,
    sortBy: 'id',
    orderBy: 'DESC',
  };

  it('should succeed and return an array of students and count', (done) => {
    supertest(app)
      .get('/api/students')
      .query(exampleQuery)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty('students');
        expect(response.body).toHaveProperty('count');
        expect(Array.isArray(response.body.students)).toBeTruthy();
        done();
      });
  });

  const queryProps = Object.entries(exampleQuery);
  const incompleteQueries = queryProps.map(([key]) => queryProps.filter(([k]) => k !== key));

  incompleteQueries.forEach((q, index) => {
    const fields = Object.fromEntries(q);

    it(`should receive response code 400 if query doesn\`t contain ${queryProps[index][0]} field`, (done) => {
      supertest(app).get('/api/students').query(fields).expect(400, done);
    });
  });
});

describe('DELETE /students', () => {
  const studentsIds = [1];

  it('should delete user with id 1', (done) => {
    supertest(app)
      .del('/api/students')
      .send({ studentsIds })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(200, done);
  });
});
