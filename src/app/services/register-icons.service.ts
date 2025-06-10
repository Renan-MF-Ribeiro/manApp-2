import { addIcons } from 'ionicons';
import { Injectable } from '@angular/core';
import {
  addCircle,
  cash,
  create,
  cube,
  pencil,
  person,
  receipt,
  remove,
  trash
} from 'ionicons/icons';

@Injectable({
  providedIn: 'root'
})
export class RegisterIconsService {
  constructor() {
    this.registerIcons();
  }
  registerIcons() {
    addIcons({
      addCircle,
      remove,
      receipt,
      cube,
      create,
      cash,
      person,
      pencil,
      trash
    });
  }
}
