// バッチ処理できるまではこいつで最新の記事の取得を行う
import { savePosts, } from './api';
savePosts().catch((er) => console.error(er));

// deletePosts().catch((er) => console.error(er));
