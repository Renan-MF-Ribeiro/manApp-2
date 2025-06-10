import { inject, Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular/standalone';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private readonly _toastController = inject(ToastController);

  async showToast(
    message: string,
    duration = 1500,
    position: 'top' | 'bottom' | 'middle' = 'bottom'
  ) {
    const toast = await this._toastController.create({
      message,
      duration,
      position
    });

    await toast.present();
  }
}
