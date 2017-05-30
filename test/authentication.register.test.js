import { expect } from 'chai';
import Helpers from '../lib/helper';
import authentication from '../services/authentication';

const helpers = new Helpers();
let pool = null;

describe('registration', () => {
  before(async () => {
    pool = await helpers.initDb();
  });
  describe('with valid creds', () => {
    let regResult = null;
    before(() => {
      return authentication.register(pool, {
        username: 'test',
        password: 'password',
      }).then((res) => {
        regResult = res.rows[0];
        return regResult;
      });
    });
    it('is successful', () => {
      expect(regResult.success).to.be.true;
    });
    it('returns a new id', () => {
      expect(regResult.id).to.not.be.null;
    });
    it('return a role', () => {
      expect(regResult.role).to.equal(10);
    });
    it('returns correct username', () => {
      expect(regResult.username).to.equal('test');
    });
    it('return an authentication_token', () => {
      expect(regResult.authentication_token).to.exist;
    });
  });
  describe('trying an existing user', () => {
    let regResult = null;
    before(() => {
      return authentication.register(pool, {
        username: 'test',
        password: 'password',
      }).then((res) => {
        regResult = res.rows[0];
        return regResult;
      });
    });
    it('is not successful', () => {
      expect(regResult.success).to.be.false;
    });
  });
});

// describe('release the pool', () => {
//   before(() => {
//     return pool.release();
//   });
//   it('released', () => {
//     console.log(pool);
//     expect(pool).to.equal('released');
//   });
// });
