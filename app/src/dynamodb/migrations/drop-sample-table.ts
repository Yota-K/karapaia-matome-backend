import { dbFunc } from '../database';

const { deleteTable } = dbFunc();
deleteTable('sample_table').catch(er => console.error(JSON.stringify(er, null, 2)));
