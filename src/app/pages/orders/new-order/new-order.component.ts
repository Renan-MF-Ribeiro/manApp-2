import { Component, inject, Input, OnInit } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import {
  IonButton,
  IonIcon,
  IonSelect,
  IonSelectOption
} from '@ionic/angular/standalone';
import { InputTextModule } from 'primeng/inputtext';
import { Order } from '../model/order.model';
import { DropdownModule } from 'primeng/dropdown';
import { Product } from '../../products/model/product.model';
import { ProductsService } from '../../../services/products.service';
import { firstValueFrom } from 'rxjs';
import { DataViewModule } from 'primeng/dataview';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-new-order',
  standalone: true,
  imports: [
    InputTextModule,
    ReactiveFormsModule,
    IonButton,
    FormsModule,
    DropdownModule,
    IonSelect,
    IonSelectOption,
    DataViewModule,
    CurrencyPipe,
    IonIcon
  ],
  templateUrl: './new-order.component.html',
  styleUrl: './new-order.component.scss'
})
export class NewOrderComponent {
  deleteOrder(_t27: any) {
    throw new Error('Method not implemented.');
  }
  editOrder(_t27: any) {
    throw new Error('Method not implemented.');
  }

  @Input() order?: Order;

  @Input({ required: true }) products: Product[] = [];

  orderForm = new FormGroup({
    itens: new FormArray<FormGroup>([]),
    total: new FormControl(''),
    client: new FormControl('')
  });

  addProduct(event: Event) {
    const target = event.target as HTMLIonSelectElement;
    const selectedProductId = target.value;
    target.value = ''; // Clear the select after adding
    const selectedProduct = this.products.find(
      (product) => product.id === selectedProductId
    );
    if (selectedProduct) {
      (this.orderForm.get('itens') as FormArray)?.push(
        new FormGroup({
          item: new FormControl(selectedProduct),
          quantity: new FormControl(1),
          total: new FormControl(selectedProduct.price)
        })
      ); // Clear the selected product after adding
    }
  }

  incrementQuantity(index: number) {
    const item = (this.orderForm.get('itens') as FormArray).at(index);
    const quantity = item.get('quantity')?.value;
    const productPrice = item.get('item')?.value.price;

    item.get('quantity')?.setValue(quantity + 1);
    item.get('total')?.setValue((quantity + 1) * productPrice);
  }

  decrementQuantity(index: number) {
    const item = (this.orderForm.get('itens') as FormArray).at(index);
    const quantity = item.get('quantity')?.value;
    const productPrice = item.get('item')?.value.price;

    if (quantity > 1) {
      item.get('quantity')?.setValue(quantity - 1);
      item.get('total')?.setValue((quantity - 1) * productPrice);
    }
  }
}
