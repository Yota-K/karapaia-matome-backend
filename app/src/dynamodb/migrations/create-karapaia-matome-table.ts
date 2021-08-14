import { dbFunc } from '../database';
import { appConfig } from '../../config';

const { createTable } = dbFunc();
const { tableName } = appConfig;

createTable(tableName, {
  TableName: tableName,
  BillingMode: 'PAY_PER_REQUEST',
  AttributeDefinitions: [
    {
      // number
      AttributeName: 'postId',
      AttributeType: 'N',
    },
    {
      // string
      AttributeName: 'createdAt',
      AttributeType: 'S',
    },
  ],
  KeySchema: [
    {
      // Partition key
      AttributeName: 'postId',
      KeyType: 'HASH',
    },
    {
      // Sort key
      AttributeName: 'createdAt',
      KeyType: 'RANGE',
    },
  ],
}).catch((er) => console.error(JSON.stringify(er, null, 2)));
