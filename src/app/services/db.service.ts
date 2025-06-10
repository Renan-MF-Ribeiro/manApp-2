import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  // Adiciona um novo item
  delay = 0;

  add(collection: string, item: any): Observable<void> {
    const items = this.listAllSync(collection);
    item.id = this.generateId(items);
    items.push(item);
    this.save(collection, items);
    return of(undefined).pipe(delay(this.delay));
  }

  // Retorna todos os itens
  listAll(collection: string): Observable<any[]> {
    const data = this.listAllSync(collection);
    return of(data).pipe(delay(this.delay));
  }

  // Método síncrono para uso interno
  private listAllSync(collection: string): any[] {
    const data = localStorage.getItem(collection);
    return data ? JSON.parse(data) : [];
  }

  // Retorna um item pelo id
  getById(collection: string, id: number): Observable<any> {
    const items = this.listAllSync(collection);
    return of(items.find((item) => item.id === id)).pipe(delay(200));
  }

  // Atualiza um item existente
  update(collection: string, id: string, updatedItem: any): Observable<void> {
    const items = this.listAllSync(collection);
    const index = items.findIndex((item) => item.id === id);
    if (index !== -1) {
      items[index] = { ...items[index], ...updatedItem, id };
      this.save(collection, items);
    }
    return of(undefined).pipe(delay(this.delay));
  }

  // Remove um item pelo id
  delete(collection: string, id: string): Observable<void> {
    const items = this.listAllSync(collection).filter((item) => item.id !== id);
    this.save(collection, items);
    return of(undefined).pipe(delay(this.delay));
  }

  // Salva os itens no localStorage
  private save(collection: string, items: any[]): void {
    localStorage.setItem(collection, JSON.stringify(items));
  }

  // Gera um novo id incremental
  private generateId(items: any[]): string {
    return crypto.randomUUID();
  }
}
