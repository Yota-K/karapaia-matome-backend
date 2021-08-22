import { APIGatewayEvent, Callback, Context, Handler } from 'aws-lambda';
import { generateResponseHeader } from './lib/generate-res-header';
import { KarapaiaApi } from './api';

// DBに保存されている記事を全件、日付の降順で取得する
export const getKarapaiaPosts: Handler = async (_event: APIGatewayEvent, _context: Context, cb: Callback) => {
  const api = new KarapaiaApi();

  try {
    const posts = await api.getPosts();

    cb(null, generateResponseHeader(200, JSON.stringify(posts)));
  } catch (er) {
    cb(null, generateResponseHeader(500, JSON.stringify(er)));
  }
};

// スクレイピング結果をDBに保存するバッチ処理
export const saveKarapaiaPosts = async () => {
  const api = new KarapaiaApi();

  try {
    await api.savePosts();
    console.info('スクレイピング結果をDBに保存しました');
  } catch (er) {
    console.error(er);
  }
};
