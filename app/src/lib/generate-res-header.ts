// レスポンスヘッダーの生成
export const generateResponseHeader = (statusCode: number, body: string) => {
  return {
    statusCode,
    body,
  };
};
