import { KarapaiaApi } from '../api';

const api = new KarapaiaApi();
api.savePosts().catch((er) => console.error(er));
