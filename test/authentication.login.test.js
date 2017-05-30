import { expect } from 'chai';
import Helpers from '../lib/helper';

const helpers = new Helpers();
let pool = null;
let registeredUser = null;
const params = {
  username: 'ccnuyan',
  password: 'password',
};

describe('authentication', () => {
  before(async () => {
    pool = await helpers.initDb();
    return pool.query('select * from membership.register($1, $2)', [params.username, params.password])
    .then((res) => {
      registeredUser = res.rows[0];
      return registeredUser;
    });
  });

  describe('with a valid login', () => {
    let authResult = null;
    before(() => {
      return pool.query('select * from membership.authenticate($1, $2)', [params.username, params.password])
      .then((res) => {
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
      return pool.query('select * from membership.authenticate($1, $2)', [params.username, 'password1'])
      .then((res) => {
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
      return pool.query('select * from membership.authenticate_by_token($1)', [registeredUser.authentication_token])
      .then((res) => {
        authResult = res.rows[0];
        return authResult;
      });
    });
    it('is successful', () => {
      expect(authResult.success).to.be.true;
    });
  });
});
