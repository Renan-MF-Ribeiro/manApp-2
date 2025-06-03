import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'orders',
    loadComponent: () =>
      import('./pages/orders/orders.component').then((m) => m.OrdersComponent)
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
    path: 'casher',
    loadComponent: () =>
      import('./pages/casher/casher.component').then((m) => m.CasherComponent)
  },
  {
    path: '',
    redirectTo: '/products',
    pathMatch: 'full'
  }
];
