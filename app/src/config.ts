import dotenv from 'dotenv';

dotenv.config();

export const appConfig = {
  tableName: process.env.isDevelopment ? 'karapaia_matome_dev' : process.env.TABLE_NAME as string,
  vercelDeployUrl: process.env.VERCEL_DEPLOYMENT_URL,
  url: 'https://karapaia.com/',
  pageNum: 5,
} as const;
