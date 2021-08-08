import { DynamoDB } from 'aws-sdk';
import { awsConfigUpdate } from '../config'

awsConfigUpdate();

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
export const client = new DynamoDB.DocumentClient(devOptions);

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
