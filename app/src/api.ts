import { mainFunc } from './lib/scraping';
import { client } from './dynamodb/database';
import { appConfig } from './config';
import { Post } from './types';

const savePosts = async () => {
  const { tableName } = appConfig;
  const results = (await mainFunc()) as Post[][];

  console.log(JSON.stringify(results, null, 2));

  let count = 0;

  while (count < results.length) {
    await client
      .batchWrite({
        RequestItems: {
          [tableName]: results[count].map((Item) => ({
            PutRequest: {
              Item,
            },
          })),
        },
      })
      .promise()
      .then(() => console.log('success!'));

    count++;
  }
};

savePosts().catch((er) => console.error(er));
