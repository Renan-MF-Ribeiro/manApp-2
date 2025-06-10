import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProductsService } from '../../../services/products.service';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { LoadingService } from '../../../services/loading.service';
import { Product } from '../model/product.model';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-new-product',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    InputNumberModule
  ],
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.scss'
})
export class NewProductComponent implements OnChanges {
  private readonly _productService = inject(ProductsService);
  private readonly _loading = inject(LoadingService);
  private readonly _toast = inject(ToastService);

  @Input() product?: Product;
  @Output() productCreated = new EventEmitter<void>();

  productForm = new FormGroup({
    name: new FormControl(''),
    price: new FormControl(0),
    status: new FormControl(true)
  });

  ngOnChanges(changes: SimpleChanges) {
    if (changes['product'] && this.product) {
      this.productForm.patchValue({
        name: this.product.name,
        price: this.product.price,
        status: this.product.status
      });
    } else {
      this.productForm.reset({
        name: '',
        price: 0,
        status: true
      });
    }
  }

  saveProduct() {
    this._loading.show();
    if (this.product) {
      this.updateProductDetails();
    } else {
      this.createNewProduct();
    }
  }

  private updateProductDetails() {
    this._productService
      .updateProduct(this.product!.id, this.productForm.value)
      .subscribe({
        next: () => {
          this.productCreated.emit();
          this._toast.showToast('Produto atualizado com sucesso!');
        },
        error: (error) => console.error('Error updating product:', error),
        complete: () => this._loading.hide()
      });
  }

  private createNewProduct() {
    this._productService.createProduct(this.productForm.value).subscribe({
      next: () => {
        this.productCreated.emit();
        this._toast.showToast('Produto cadastrado com sucesso!');
      },
      error: (error) => console.error('Error creating product:', error),
      complete: () => this._loading.hide()
    });
  }
}
