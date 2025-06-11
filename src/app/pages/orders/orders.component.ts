import { Component, inject, OnInit } from '@angular/core';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonRefresher,
  IonRefresherContent,
  IonItem,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonButtons,
  IonButton
} from '@ionic/angular/standalone';
import { NewOrderComponent } from './new-order/new-order.component';
import { DialogModule } from 'primeng/dialog';
import { OrdersService } from '../../services/orders.service';
import { LoadingService } from '../../services/loading.service';
import { firstValueFrom } from 'rxjs';
import { Order } from './model/order.model';
import { DataViewModule } from 'primeng/dataview';
import { CurrencyPipe } from '@angular/common';
import { ToastService } from '../../services/toast.service';
import { Product } from '../products/model/product.model';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    NewOrderComponent,
    IonIcon,
    DialogModule,
    IonRefresher,
    IonRefresherContent,
    IonItem,
    IonItemSliding,
    IonItemOptions,
    IonItemOption,
    DataViewModule,
    CurrencyPipe,
    IonButtons,
    IonButton
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {
  private readonly _ordersService = inject(OrdersService);
  private readonly _products = inject(ProductsService);
  private readonly _loading = inject(LoadingService);
  private readonly _toast = inject(ToastService);

  products: Product[] = [];
  orders!: Order[];
  orderToEdit?: Order;
  formOrderVisible = false;

  ngOnInit(): void {
    this.listOrders();
  }

  async listOrders(event?: CustomEvent) {
    this._loading.show();
    this.orders = [];
    this.orders = await firstValueFrom(this._ordersService.getAllOrders());
    (event?.target as HTMLIonRefresherElement)?.complete();
    this._loading.hide();
  }

  async loadProducts() {
    this.products = await firstValueFrom(this._products.getAllProductsActive());
  }

  openFormOrder() {
    this.loadProducts();
    this.formOrderVisible = true;
    this.orderToEdit = undefined;
  }

  dialogClosed(refresh: boolean) {
    this.formOrderVisible = false;
    this.orderToEdit = undefined;
    if (refresh) {
      this.listOrders();
    }
  }

  editOrder(order: Order) {
    this.orderToEdit = order;
    this.formOrderVisible = true;
  }

  async deleteOrder(order: Order) {
    this._loading.show();
    await firstValueFrom(this._ordersService.deleteOrder(order.id));
    this._toast.showToast('Pedido removido com sucesso!');
    this.listOrders();
    this._loading.hide();
  }
}
