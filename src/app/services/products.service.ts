import { inject, Injectable } from '@angular/core';
import { DbService } from './db.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private readonly _db = inject(DbService);

  createProduct(product: any) {
    return this._db.add('products', product);
  }

  getProduct(id: number) {
    return this._db.getById('products', id);
  }

  getAllProducts() {
    return this._db.listAll('products');
  }

  getAllProductsActive() {
    return this._db
      .listAll('products')
      .pipe(map((products) => products.filter((product) => product.status)));
  }

  updateProduct(id: string, product: any) {
    return this._db.update('products', id, product);
  }

  deleteProduct(id: string) {
    return this._db.delete('products', id);
  }
}
