import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private _loadingCount = 0;

  show() {
    this._loadingCount++;
  }

  hide() {
    if (this._loadingCount > 0) {
      this._loadingCount--;
    }
  }

  getStatus(): boolean {
    return this._loadingCount > 0;
  }
}
