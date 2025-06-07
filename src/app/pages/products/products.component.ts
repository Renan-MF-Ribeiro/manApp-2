import { Component, inject, OnInit } from '@angular/core';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import { NewProductComponent } from './new-product/new-product.component';
import { DialogModule } from 'primeng/dialog';
import { ProductsService } from '../../services/products.service';
import { Product } from './model/product.model';
import { firstValueFrom } from 'rxjs';
import { DataViewModule } from 'primeng/dataview';
import { CurrencyPipe } from '@angular/common';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonButton,
    IonIcon,
    NewProductComponent,
    DialogModule,
    DataViewModule,
    CurrencyPipe,
    InputSwitchModule,
    FormsModule,
    IonRefresher,
    IonRefresherContent
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  private readonly _productsService = inject(ProductsService);

  newProductVisible = false;
  products: Product[] = [];

  ngOnInit() {
    this.listProducts();
  }

  async listProducts(event?: CustomEvent) {
    this.products = [];
    this.products = await firstValueFrom(
      this._productsService.getAllProducts()
    );
    (event?.target as HTMLIonRefresherElement)?.complete();
  }

  productCreated() {
    this.newProductVisible = false;
    this.listProducts();
  }

  async updateProductStatus(product: Product) {
    await firstValueFrom(
      this._productsService.updateProduct(product.id, product)
    );
  }
}
