import { dbFunc } from '../database';

const { createTable } = dbFunc();

createTable('karapaia_matome', {
  TableName: 'karapaia_matome',
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
      KeyType: 'HASH'
    },
    {
     // Sort key
      AttributeName: 'createdAt',
      KeyType: 'RANGE',
    },
  ],
}).catch(er => console.error(JSON.stringify(er, null, 2)));
