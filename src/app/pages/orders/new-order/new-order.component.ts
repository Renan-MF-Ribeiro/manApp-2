import { Component } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule
} from '@angular/forms';
import { IonTitle } from '@ionic/angular/standalone';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-new-order',
  standalone: true,
  imports: [IonTitle, InputTextModule, ReactiveFormsModule],
  templateUrl: './new-order.component.html',
  styleUrl: './new-order.component.scss'
})
export class NewOrderComponent {
  orderForm = new FormGroup({
    itens: new FormArray<FormGroup>([
      new FormGroup({
        item: new FormControl(''),
        quantity: new FormControl(''),
        price: new FormControl('')
      })
    ]),
    total: new FormControl(''),
    client: new FormControl('')
  });
}
