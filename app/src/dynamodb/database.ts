import { config, DynamoDB } from 'aws-sdk';

// 警告を回避するためにconfig.updateでregionを指定
// https://www.fixes.pub/program/578906.html
config.update({
  region: 'ap-north-east-1'
});

const devOptions = {
  credentials: {
    accessKeyId: 'key',
    secretAccessKey: 'key',
  },
  // DockerコンテナからDB用のDockerに接続するので、Dockerコンテナのホスト名を指定する
  endpoint: 'http://karapaia_matome_db:8000',
};

// JSでDynamoDBを操作するために必要な関数
// DocumentClientを使用するとJSのデータ型を自動的にDynamoDB上の型に変換してくれるので、
// コードが簡潔になる
export const client = new DynamoDB.DocumentClient(process.env.IS_LOCAL ? devOptions : undefined);

export const dbFunc = () => {
  const createTable = async (params: DynamoDB.CreateTableInput) => {
    console.log('テーブルの作成を行います。');

    await new DynamoDB(devOptions).createTable(params).promise();

    console.log('テーブルの作成に成功しました。');
  };

  const deleteTable = async (tableName: string) => {
    console.log('テーブルの削除を行います。');

    await new DynamoDB(devOptions).deleteTable({
      TableName: tableName,
    }).promise();

    console.log('テーブルの削除に成功しました。');
  };

  return {
    createTable,
    deleteTable,
  }
};
