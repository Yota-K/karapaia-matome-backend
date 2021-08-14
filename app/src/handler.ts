import { APIGatewayEvent, Callback, Context, Handler } from 'aws-lambda';
import { generateResponseHeader } from './lib/generate-res-header';
import { getPosts } from './api';

export const getKarapaiaPosts: Handler = async (event: APIGatewayEvent, context: Context, cb: Callback) => {
  console.log(event);

  try {
    const posts = await getPosts();

    cb(null, generateResponseHeader(200, JSON.stringify(posts.Items)));
  } catch (er) {
    cb(null, generateResponseHeader(500, JSON.stringify(er)));
  }
};
