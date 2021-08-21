import { APIGatewayEvent, Callback, Context, Handler } from 'aws-lambda';
import { config } from 'aws-sdk';
import { generateResponseHeader } from './lib/generate-res-header';
import { getPosts, savePosts } from './api';

// DBに保存されている記事を全件、日付の降順で取得する
export const getKarapaiaPosts: Handler = async (_event: APIGatewayEvent, _context: Context, cb: Callback) => {
  // MEMO: API周りの処理をクラス化してインスタンスを生成したときにconfig.updateするようにしたい
  // 警告を回避するためにconfig.updateでregionを指定
  // https://www.fixes.pub/program/578906.html
  config.update({
    region: 'ap-north-east-1',
  });

  try {
    const posts = await getPosts();

    cb(null, generateResponseHeader(200, JSON.stringify(posts)));
  } catch (er) {
    cb(null, generateResponseHeader(500, JSON.stringify(er)));
  }
};

// スクレイピング結果をDBに保存するバッチ処理
export const saveKarapaiaPosts = async () => {
  config.update({
    region: 'ap-north-east-1',
  });

  try {
    await savePosts();
    console.info('スクレイピング結果をDBに保存しました');
  } catch (er) {
    console.error(er);
  }
};
