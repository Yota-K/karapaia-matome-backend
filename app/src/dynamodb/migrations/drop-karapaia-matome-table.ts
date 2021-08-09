import { dbFunc } from '../database';

const { deleteTable } = dbFunc();
deleteTable('karapaia_matome').catch(er => console.error(JSON.stringify(er, null, 2)));
