import { expect } from 'chai';
import Helpers from '../lib/helper';
import authentication from '../services/authentication';

const helpers = new Helpers();
let pool = null;
let registeredUser = null;

describe('authentication', () => {
  before(async () => {
    pool = await helpers.initDb();
    return authentication.register(pool, {
      username: 'ccnuyan',
      password: 'password',
    }).then((res) => {
      registeredUser = res.rows[0];
      return registeredUser;
    });
  });

  describe('with a valid login', () => {
    let authResult = null;
    before(() => {
      return authentication.authentiacate(pool, {
        username: 'ccnuyan',
        password: 'password',
      }).then((res) => {
        authResult = res.rows[0];
        return authResult;
      });
    });
    it('is successful', () => {
      expect(authResult.success).to.be.true;
    });
  });

  describe('invalid login', () => {
    let authResult = null;
    before(() => {
      return authentication.authentiacate(pool, {
        username: 'ccnuyan',
        password: 'password1',
      }).then((res) => {
        authResult = res.rows[0];
        return authResult;
      });
    });
    it('is not successful', () => {
      expect(authResult.success).to.be.false;
    });
  });

  describe('with a valid token', () => {
    let authResult = null;
    before(() => {
      return authentication.authenticate_by_token(pool, {
        token: registeredUser.authentication_token,
      }).then((res) => {
        authResult = res.rows[0];
        return authResult;
      });
    });
    it('is successful', () => {
      expect(authResult.success).to.be.true;
    });
  });
});


// describe('release the pool', () => {
//   before(() => {
//     return pool.release();
//   });
//   it('released', () => {
//     assert.equal(0, 0);
//   });
// });
