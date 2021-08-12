import { mainFunc } from './lib/scraping';
import { client } from './dynamodb/database';
import { appConfig } from './config';
import { Post } from './types';

const savePosts = async () => {
  const { tableName } = appConfig;
  const results = await mainFunc() as Post[];

  console.log(JSON.stringify(results, null, 2));

  await client.batchWrite({
    RequestItems: {
      [tableName]: results.map(Item => ({
        PutRequest: {
          Item,
        },
      }))
    }
  }).promise().then(() => console.log('success!'));
};

savePosts().catch(er => console.error(er));
