import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
    children: [
      {
        path: 'orders',
        loadComponent: () =>
          import('./pages/orders/orders.component').then(
            (m) => m.OrdersComponent
          )
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./pages/products/products.component').then(
            (m) => m.ProductsComponent
          )
      },
      {
        path: 'debtors',
        loadComponent: () =>
          import('./pages/debtors/debtors.component').then(
            (m) => m.DebtorsComponent
          )
      },
      {
        path: 'cashier',
        loadComponent: () =>
          import('./pages/cashier/cashier.component').then(
            (m) => m.CashierComponent
          )
      }
    ]
  },
  {
    path: '',
    redirectTo: '/orders',
    pathMatch: 'full'
  }
];
