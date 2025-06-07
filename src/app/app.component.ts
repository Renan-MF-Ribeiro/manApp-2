import { Component, inject } from '@angular/core';
import {
  IonIcon,
  IonTab,
  IonTabBar,
  IonTabButton,
  IonTabs
} from '@ionic/angular/standalone';
import { OrdersComponent } from './pages/orders/orders.component';
import { ProductsComponent } from './pages/products/products.component';
import { DebtorsComponent } from './pages/debtors/debtors.component';
import { CashierComponent } from './pages/cashier/cashier.component';
import { RegisterIconsService } from './services/register-icons.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    IonIcon,
    IonTabBar,
    IonTabButton,
    IonTabs,
    IonTab,
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

  private readonly _registerIconsService =
    inject(RegisterIconsService).registerIcons();
}
