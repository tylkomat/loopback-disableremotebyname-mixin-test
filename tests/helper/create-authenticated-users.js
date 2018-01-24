const server = require('../../server/server.js');
const PlatformUser = server.models.PlatformUser;

module.exports = async function(userData) {

  return await Promise.all(userData.map(async (singleUserData) => {

    delete singleUserData.id;
    delete singleUserData.token;

    const user = await PlatformUser.create(singleUserData);
    singleUserData.id = user.id;

    const token = await PlatformUser.login({
      email: singleUserData.email,
      password: singleUserData.password
    });
    singleUserData.token = token.id;

    return singleUserData;
  }));
}
