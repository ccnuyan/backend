const get_container_by_id = (pool, { id }) => {
  return pool.query('select * from membership.get_container_by_id($1)', [id]);
};

const get_containers_by_ids = (pool, { ids }) => {
  return pool.query('select * from membership.get_containers_by_ids($1)', [ids]);
};

const get_tenant_containers = (pool, { tid }) => {
  return pool.query('select * from membership.get_tenant_containers($1)', [tid]);
};

const create_container = (pool, { uid, tid, name }) => {
  return pool.query('select * from membership.create_container($1, $2, $3)', [uid, tid, name]);
};

const delete_container = (pool, { uid, tid, id }) => {
  return pool.query('select * from membership.delete_container($1, $2, $3)', [uid, tid, id]);
};

const lock_container = (pool, { tid, id }) => {
  return pool.query('select * from membership.lock_container($1, $2)', [tid, id]);
};
const unlock_container = (pool, { tid, id }) => {
  return pool.query('select * from membership.unlock_container($1, $2)', [tid, id]);
};

export default {
  get_container_by_id,
  get_containers_by_ids,
  get_tenant_containers,
  create_container,
  delete_container,

  lock_container,
  unlock_container,
};
