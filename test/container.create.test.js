import { expect } from 'chai';

import Helpers from '../lib/helper';
import authentication from '../services/authentication';
import container from '../services/container';

const helpers = new Helpers();
let pool = null;
let admin = null;

let user = {
  username: 'ccnuyan',
  password: 'password',
};

let createdcontainer = null;
const name0 = 'my container0';

describe('container create', () => {
  before(async () => {
    pool = await helpers.initDb();
    await pool.query('select * from membership.users where username=$1', ['admin']).then((res) => {
      admin = res.rows[0];
      return admin;
    });
    await authentication.register(pool, user).then((res) => {
      user = res.rows[0];
      user.id = res.rows[0].id;
      return user;
    });
  });

  it('with correct record', () => {
    expect(admin).to.exist;
    expect(user.id).to.exist;
  });

  // USER 1

  describe('getting containers of a not-existed user', () => {
    let changeResult = null;
    before(() => {
      return container.get_tenant_containers(pool, {
        tid: 1234567890,
      }).then((res) => {
        changeResult = res.rows;
        return changeResult;
      });
    });
    it('with no record', () => {
      expect(changeResult.length).to.equal(0);
    });
  });

  describe('getting containers of a brand new user', () => {
    let changeResult = null;
    before(() => {
      return container.get_tenant_containers(pool, {
        tid: user.id,
      }).then((res) => {
        changeResult = res.rows;
        return changeResult;
      });
    });
    it('with no record', () => {
      expect(changeResult.length).to.equal(0);
    });
  });

  describe('creating container', () => {
    let changeResult = null;
    before(() => {
      return container.create_container(pool, {
        uid: admin.id,
        tid: user.id,
        name: name0,
      }).then((res) => {
        changeResult = res.rows;
        createdcontainer = res.rows[0];
        return createdcontainer;
      });
    });
    it('with correct container name', () => {
      expect(changeResult).has.length(1);
      expect(name0).to.equal(changeResult[0].name);
    });
  });

  describe('getting containers of user', () => {
    let changeResult = null;
    before(() => {
      return container.get_tenant_containers(pool, {
        tid: user.id,
      }).then((res) => {
        changeResult = res.rows;
        return changeResult;
      });
    });
    it('with 1 record', () => {
      expect(changeResult.length).to.equal(1);
    });
  });

  describe('lock container', () => {
    let changeResult = null;
    before(() => {
      return container.lock_container(pool, {
        tid: user.id,
        id: createdcontainer.id,
      }).then((res) => {
        changeResult = res.rows;
        createdcontainer = res.rows[0];
        return createdcontainer;
      });
    });
    it('with correct container status', () => {
      expect(changeResult).has.length(1);
      expect(changeResult[0].active).to.equal(false);
    });
  });

  describe('unlock container', () => {
    let changeResult = null;
    before(() => {
      return container.unlock_container(pool, {
        tid: user.id,
        id: createdcontainer.id,
      }).then((res) => {
        changeResult = res.rows;
        createdcontainer = res.rows[0];
        return createdcontainer;
      });
    });
    it('with correct container status', () => {
      expect(changeResult).has.length(1);
      expect(changeResult[0].active).to.equal(true);
    });
  });

  describe('delete container', () => {
    let changeResult = null;
    before(() => {
      return container.delete_container(pool, {
        uid: admin.id,
        tid: user.id,
        id: createdcontainer.id,
      }).then((res) => {
        changeResult = res.rows;
        return changeResult;
      });
    });
    it('with correct container name', () => {
      expect(changeResult).has.length(1);
      expect(name0).to.equal(changeResult[0].name);
    });
  });


  describe('getting containers of user', () => {
    let changeResult = null;
    before(() => {
      return container.get_tenant_containers(pool, {
        tid: user.id,
      }).then((res) => {
        changeResult = res.rows;
        return changeResult;
      });
    });
    it('with no record', () => {
      expect(changeResult.length).to.equal(0);
    });
  });
});
