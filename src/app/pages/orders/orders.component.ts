import { addIcons } from 'ionicons';
import { Component } from '@angular/core';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonIcon
} from '@ionic/angular/standalone';
import { add } from 'ionicons/icons';
import { NewOrderComponent } from './new-order/new-order.component';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    NewOrderComponent,
    IonIcon
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {
  constructor() {
    addIcons({ add });
  }
}
