import { addIcons } from 'ionicons';
import { Component, EnvironmentInjector } from '@angular/core';
import {
  IonIcon,
  IonTabBar,
  IonTabButton,
  IonTabs
} from '@ionic/angular/standalone';
import { cash, create, cube, receipt } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [IonIcon, IonTabBar, IonTabButton, IonTabs],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(public environmentInjector: EnvironmentInjector) {
    // You can add any initialization logic here if needed
    addIcons({ receipt, cube, create, cash });
  }
}
