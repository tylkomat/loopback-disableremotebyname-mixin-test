'use strict';

const server = require('../server/server.js');
const request = require('supertest').agent(server);

const expect = require('chai').expect;

const api = '/api/users';

const createAuthenticatedUsers = require('./helper/create-authenticated-users');

let userData = {
  email: 'admin@test.de',
  password: 'admin',
};

const PlatformUser = server.models.PlatformUser;

beforeAll(async function() {

  await PlatformUser.destroyAll();
  userData = (await createAuthenticatedUsers([userData]))[0];
});

afterAll(async function() {

  await PlatformUser.dataSource.connector.db.close();
});

test('users can not be deleted', async function() {

  const response = await request
    .delete(api)
    .set({
      'Content-Type': 'application/json',
      'Authorization': userData.token,
    })
    .expect(404)
    .expect(res => console.log(res.body.error.message))
  ;

  console.log(response.body.error.message);
});
