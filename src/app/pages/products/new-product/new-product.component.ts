import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProductsService } from '../../../services/products.service';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-new-product',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    InputGroupModule,
    InputGroupAddonModule,
    IonIcon
  ],
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.scss'
})
export class NewProductComponent {
  private readonly _productService = inject(ProductsService);
  @Output() productCreated = new EventEmitter<void>();

  productForm = new FormGroup({
    name: new FormControl(''),
    price: new FormControl(''),
    status: new FormControl(true)
  });

  saveProduct() {
    this._productService.createProduct(this.productForm.value).subscribe({
      next: (product) => {
        console.log('Product created:', product);
        this.productCreated.emit();
      },
      error: (error) => {
        console.error('Error creating product:', error);
      }
    });
  }
}
