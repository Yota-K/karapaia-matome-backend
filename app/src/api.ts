import { mainFunc } from './lib/scraping';
import { client } from './dynamodb/database';
import { appConfig } from './config';
import { Post } from './types';

const { tableName } = appConfig;

// スクレイピング結果をDBから取得する
export const getPosts = async () => {
  const posts = await client.scan({ TableName: tableName }).promise();

  if (!posts) return;

  return posts.Items?.sort((a, b) => {
    return a.createdAt < b.createdAt ? 1 : -1;
  });
};

// DBにデータの登録を行う
export const savePosts = async () => {
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

// savePosts().catch((er) => console.error(er));
