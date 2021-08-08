import { dbFunc } from '../database';

const { createTable } = dbFunc();

createTable({
  TableName: 'sample_table',
  BillingMode: 'PAY_PER_REQUEST',
  AttributeDefinitions: [
    {
      // number
      AttributeName: 'user_id', AttributeType: 'N'
    },
    {
      // string
      AttributeName: 'created_at', AttributeType: 'S'
    },
  ],
  KeySchema: [
    {
      // Partition key
      AttributeName: 'user_id', KeyType: 'HASH'
    },
    {
     // Sort key
      AttributeName: 'created_at', KeyType: 'RANGE'
    },
  ],
}).catch(er => console.error(JSON.stringify(er, null, 2)));
