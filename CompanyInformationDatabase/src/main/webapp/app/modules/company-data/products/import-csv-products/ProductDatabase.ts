import Dexie from 'dexie';
import { IProduct } from 'app/shared/model/product.model';

export class ProductDatabase extends Dexie {
  productData: Dexie.Table<any, string>;

  constructor() {
    super('CIDDatabase');
    // Define tables and indexes
    // (Here's where the implicit table props are dynamically created)
    //
    this.version(1).stores({
      productData: 'id, products'
    });
    this.open().catch(e => {
      // log any errors
      throw new Error(e.stack || e);
    });
    // The following lines are needed for it to work across typescipt using babel-preset-typescript:
    this.productData = this.table('productData');
  }
}
