import { Component, inject, OnInit } from '@angular/core';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
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
import { ToastService } from '../../services/toast.service';
import { LoadingService } from '../../services/loading.service';

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
    IonRefresherContent,
    IonItem,
    IonItemSliding,
    IonItemOptions,
    IonItemOption
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  private readonly _productsService = inject(ProductsService);
  private readonly _toast = inject(ToastService);
  private readonly _loading = inject(LoadingService);

  newProductVisible = false;
  products: Product[] = [];
  productToEdit?: Product;

  ngOnInit() {
    this.listProducts();
  }

  async listProducts(event?: CustomEvent) {
    this._loading.show();
    this.products = [];
    this.products = await firstValueFrom(
      this._productsService.getAllProducts()
    );
    (event?.target as HTMLIonRefresherElement)?.complete();
    this._loading.hide();
  }

  dialogClosed(refresh: boolean) {
    this.newProductVisible = false;
    this.productToEdit = undefined;
    if (refresh) {
      this.listProducts();
    }
  }

  async deleteProduct(product: Product) {
    this._loading.show();
    await firstValueFrom(this._productsService.deleteProduct(product.id));
    this._toast.showToast('Produto removido com sucesso!');
    this.listProducts();
    this._loading.hide();
  }

  editProduct(product: Product) {
    this.productToEdit = product;
    this.newProductVisible = true;
  }

  async updateProductStatus(product: Product) {
    this._loading.show();
    await firstValueFrom(
      this._productsService.updateProduct(product.id, product)
    );
    this._toast.showToast('Produto atualizado com sucesso!');
    this.listProducts();
    this._loading.hide();
  }
}
