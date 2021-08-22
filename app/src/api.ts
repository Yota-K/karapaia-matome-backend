import { config } from 'aws-sdk';
import { mainFunc } from './lib/scraping';
import { client } from './dynamodb/database';
import { appConfig } from './config';
import { Post } from './types';

export class KarapaiaApi {
  tableName: string;

  constructor() {
    // 警告を回避するためにconfig.updateでregionを指定
    // https://www.fixes.pub/program/578906.html
    config.update({
      region: 'ap-north-east-1',
    });

    const { tableName } = appConfig;
    this.tableName = tableName;
  }

  // スクレイピング結果をDBから取得する
  public async getPosts() {
    const posts = await client.scan({ TableName: this.tableName }).promise();

    if (!posts) return;

    return posts.Items?.sort((a, b) => {
      return a.createdAt < b.createdAt ? 1 : -1;
    });
  }

  // DBのデータを初期化する
  public async deletePosts() {
    const posts = await client.scan({ TableName: this.tableName }).promise();
    const items = posts?.Items;

    if (items) {
      for (const post of items) {
        await client
          .delete({
            TableName: this.tableName,
            Key: {
              title: post['title'],
              createdAt: post['createdAt'],
            },
          })
          .promise();
      }
    }
  }

  // DBにデータの登録を行う
  public async savePosts() {
    console.info('データの書き込みをおこないます。');

    const results = (await mainFunc()) as Post[][];

    await this.deletePosts();

    let count = 0;

    while (count < results.length) {
      await client
        .batchWrite({
          RequestItems: {
            [this.tableName]: results[count].map((Item) => ({
              PutRequest: {
                Item,
              },
            })),
          },
        })
        .promise();

      count++;
    }
  }
}
