import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';
import { DbService } from './db.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private readonly _db = inject(DbService);

  createOrder(order: any) {
    return this._db.add('orders', order);
  }

  getOrder(id: number) {
    return this._db.getById('orders', id);
  }

  getAllOrders() {
    return this._db.listAll('orders');
  }

  getAllOrdersActive() {
    return this._db
      .listAll('orders')
      .pipe(map((orders) => orders.filter((order) => order.status)));
  }

  updateOrder(id: string, order: any) {
    return this._db.update('orders', id, order);
  }

  deleteOrder(id: string) {
    return this._db.delete('orders', id);
  }
}
