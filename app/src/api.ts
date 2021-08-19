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

// DBのデータを初期化する
export const deletePosts = async () => {
  const posts = await client.scan({ TableName: tableName }).promise();
  const items = posts?.Items;

  if (items) {
    for (const post of items) {
      await client
        .delete({
          TableName: tableName,
          Key: {
            title: post['title'],
            createdAt: post['createdAt'],
          },
        })
        .promise();
    }
  }
};

// DBにデータの登録を行う
export const savePosts = async () => {
  const results = (await mainFunc()) as Post[][];

  await deletePosts();

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
