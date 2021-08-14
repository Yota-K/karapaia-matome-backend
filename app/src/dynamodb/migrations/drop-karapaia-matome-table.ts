import { dbFunc } from '../database';
import { appConfig } from '../../config';

const { deleteTable } = dbFunc();
const { tableName } = appConfig;

deleteTable(tableName).catch((er) => console.error(JSON.stringify(er, null, 2)));
