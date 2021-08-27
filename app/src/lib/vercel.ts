import fetch from 'node-fetch';
import { appConfig } from '../config';

export const deployToVercel = async () => {
  const { vercelDeployUrl } = appConfig;

  try {
    if (!vercelDeployUrl) throw new Error('Environment variables not set');

    await fetch(vercelDeployUrl, { method: 'POST' });

    console.info('Vercelへのデプロイが成功しました。');
  } catch (er) {
    console.error(er);
  }
};
