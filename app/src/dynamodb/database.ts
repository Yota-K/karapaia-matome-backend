import { DynamoDB } from 'aws-sdk';

const localOptions = {
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
export const client = new DynamoDB.DocumentClient(process.env.isDevelopment ? localOptions : undefined);

export const dbFunc = () => {
  const createTable = async (tableName: string, params: DynamoDB.CreateTableInput) => {
    console.log(`${tableName}: テーブルの作成を行います。`);

    await new DynamoDB(localOptions).createTable(params).promise();

    console.log(`${tableName}: テーブルの作成に成功しました。`);
  };

  const deleteTable = async (tableName: string) => {
    console.log(`${tableName}: テーブルの削除を行います。`);

    await new DynamoDB(localOptions)
      .deleteTable({
        TableName: tableName,
      })
      .promise();

    console.log(`${tableName}: テーブルの削除に成功しました。`);
  };

  return {
    createTable,
    deleteTable,
  };
};
