import { addIcons } from 'ionicons';
import { Component } from '@angular/core';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import { add, remove } from 'ionicons/icons';
import { NewProductComponent } from './new-product/new-product.component';
import { DialogModule } from 'primeng/dialog';

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
    DialogModule
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  newProductVisible = false;

  constructor() {
    // Initialization code can go here if needed
    addIcons({ add, remove });
  }
}
