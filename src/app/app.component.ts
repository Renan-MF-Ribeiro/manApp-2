import { Component, EnvironmentInjector } from '@angular/core';
import {
  IonContent,
  IonHeader,
  IonIcon,
  IonTab,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import { cash, create, cube, receipt } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { OrdersComponent } from './pages/orders/orders.component';
import { ProductsComponent } from './pages/products/products.component';
import { DebtorsComponent } from './pages/debtors/debtors.component';
import { CashierComponent } from './pages/cashier/cashier.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    IonIcon,
    IonTabBar,
    IonTabButton,
    IonTabs,
    IonTab,
    IonContent,
    IonToolbar,
    IonTitle,
    IonHeader,
    OrdersComponent,
    ProductsComponent,
    DebtorsComponent,
    CashierComponent
  ],

  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'manApp';
  constructor(public environmentInjector: EnvironmentInjector) {
    // You can add any initialization logic here if needed
    addIcons({ receipt, cube, create, cash });
  }
}
