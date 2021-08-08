import { client } from '../database';
import { awsConfigUpdate } from '../../config'
import { createTime } from '../../utils/create-time';

awsConfigUpdate();

const insertFunc = async (userId: number, name: string, age: number) => {
  client.put({
    TableName: 'sample_table',
    Item: {
      "user_id": userId,
      "name": name,
      "age": age,
      "created_at": createTime,
    },
  }, (er) => {
    if (er) {
      console.error(er);
    } else {
      console.log('succeeded!');
    }
  })
};

insertFunc(1, '山田', 100);
insertFunc(2, 'カルキチ', 200);
insertFunc(3, '竈門', 30);
