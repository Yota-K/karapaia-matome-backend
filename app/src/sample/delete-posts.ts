import { KarapaiaApi } from '../api';

const api = new KarapaiaApi();
api.deletePosts().catch((er) => console.error(er));
