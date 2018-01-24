'use strict';

const server = require('../server/server.js');
const request = require('supertest').agent(server);

const expect = require('chai').expect;

const api = '/api/people';

const createAuthenticatedUsers = require('./helper/create-authenticated-users');

const PlatformUser = server.models.PlatformUser;
const Person = server.models.Person;

let userData = {email: 'admin@test.de', password: 'admin'};

const personData = {

};

beforeAll(async function() {

  await PlatformUser.destroyAll();
  await Person.destroyAll();

  userData = (await createAuthenticatedUsers([userData]))[0];
});

afterAll(async function() {

  await PlatformUser.dataSource.connector.db.close();
  await Person.dataSource.connector.db.close();
});

test('persons can not be deleted', async function() {

  const person = await Person.create(personData);

  expect(person).to.have.property('id');

  await request
    .delete(api + '/' + person.id)
    .set({
      'Content-Type': 'application/json',
      'Authorization': userData.token,
    })
    .expect(404)
    .expect(res => console.log(res.body.error.message))
  ;
});
