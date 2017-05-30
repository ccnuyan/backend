const get_tenant_by_id = (pool, { id }) => {
  return pool.query('select * from membership.get_tenant_by_id($1)', [id]);
};

const get_tenants_by_ids = (pool, { ids }) => {
  return pool.query('select * from membership.get_tenants_by_ids($1)', [ids]);
};

const get_all_tenants = (pool) => {
  return pool.query('select * from membership.get_all_tenants()');
};

export default {
  get_tenants_by_ids,
  get_tenant_by_id,
  get_all_tenants,
};
